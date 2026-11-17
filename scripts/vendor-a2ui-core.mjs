/** Build and extract only the headless graph from an exact official A2UI commit. */
import {readFileSync, writeFileSync, mkdirSync, existsSync, cpSync, symlinkSync, mkdtempSync, rmSync} from 'node:fs';
import {dirname, resolve, relative, join} from 'node:path';
import {tmpdir} from 'node:os';
import {execFileSync} from 'node:child_process';

const revision = '1cbef31b115c854bb98048cdda2fbce6b7db9d0f';
if (!process.argv[2]) throw new Error('Usage: node scripts/vendor-a2ui-core.mjs /path/to/a2ui-checkout');
const upstream = resolve(process.argv[2]);
if (execFileSync('git', ['rev-parse', 'HEAD'], {cwd: upstream, encoding: 'utf8'}).trim() !== revision) {
  throw new Error(`Check out the pinned upstream revision ${revision} first.`);
}
const source = join(upstream, 'typescript/core/web_core');
const temp = mkdtempSync(join(tmpdir(), 'a2ui-native-core-'));
const target = resolve('vendor/a2ui-core');
const entries = [
  'index', 'v1_0/schema/index', 'catalogs/basic/v1/components/basic_components',
  'catalogs/basic/v1/functions/basic_functions', 'catalogs/basic/v1/functions/basic_functions_api',
];
try {
  cpSync(join(source, 'src'), join(temp, 'src'), {recursive: true});
  symlinkSync(resolve('node_modules'), join(temp, 'node_modules'), 'dir');
  writeFileSync(join(temp, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      target: 'ES2020', module: 'ESNext', moduleResolution: 'bundler', lib: ['ES2022', 'DOM'],
      declaration: true, outDir: './build/src', rootDir: './src', strict: true,
      skipLibCheck: true, resolveJsonModule: true, esModuleInterop: true, noEmitOnError: true,
    },
    files: entries.map(entry => `./src/${entry}.ts`),
  }, null, 2));
  execFileSync(process.execPath, ['node_modules/typescript/bin/tsc', '--project', join(temp, 'tsconfig.json')], {stdio: 'inherit'});
  const build = join(temp, 'build');
  const visited = new Set();
  function copy(file) {
    if (visited.has(file)) return;
    visited.add(file);
    const src = resolve(build, file);
    if (!existsSync(src)) throw new Error(`Missing upstream dependency: ${file}`);
    // Hermes in older supported RN versions lacks Object.hasOwn. Keep its semantics
    // without modifying globals or changing the upstream protocol implementation.
    const text = readFileSync(src, 'utf8').replace(/Object\.hasOwn\(/g, 'Object.prototype.hasOwnProperty.call(').replace(/[ \t]+$/gm, '');
    for (const match of text.matchAll(/(?:from\s*|import\s*)['"]([^'"]+)['"]/g)) {
      const specifier = match[1];
      if (!specifier.startsWith('.')) continue;
      const dependency = relative(build, resolve(dirname(src), specifier));
      if (/universal\/|\/components\/index\.js|styles\//.test(dependency)) {
        throw new Error(`Browser dependency in headless graph: ${dependency}`);
      }
      if (existsSync(resolve(build, dependency))) copy(dependency);
      const declaration = dependency.replace(/\.js$/, '.d.ts');
      if (existsSync(resolve(build, declaration))) copy(declaration);
    }
    mkdirSync(dirname(resolve(target, file)), {recursive: true});
    writeFileSync(resolve(target, file), text);
  }
  // Only this generated directory is replaced; provenance and documentation remain.
  rmSync(join(target, 'src'), {recursive: true, force: true});
  for (const entry of entries) {copy(`src/${entry}.js`); copy(`src/${entry}.d.ts`);}
  const exports = entries.map(entry => `export * from './src/${entry}.js';`).join('\n') + '\n';
  writeFileSync(resolve(target, 'index.js'), exports);
  writeFileSync(resolve(target, 'index.d.ts'), exports);
  writeFileSync(resolve(target, 'package.json'), JSON.stringify({name: 'a2ui-native-headless-core', version: '1.0.0', type: 'module', private: true}, null, 2) + '\n');
  cpSync(join(upstream, 'LICENSE'), join(target, 'LICENSE'));
  writeFileSync(join(target, 'UPSTREAM.json'), JSON.stringify({repository: 'https://github.com/a2ui-project/a2ui', revision, source: 'typescript/core/web_core', adaptation: 'Browser-free entry points; Object.hasOwn rewritten for older Hermes.'}, null, 2) + '\n');
  console.log(`Vendored ${visited.size} upstream files at ${revision}.`);
} finally {
  rmSync(temp, {recursive: true, force: true});
}
