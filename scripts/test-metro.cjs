/** Bundle the public v1.0 entry point using RN's real transformer and resolver. */
const {getDefaultConfig, mergeConfig} = require('metro-config');
const Metro = require('metro');
const path = require('node:path');
const os = require('node:os');

async function main() {
  const root = path.resolve(__dirname, '..');
  const config = mergeConfig(await getDefaultConfig(root), {
    projectRoot: root,
    watchFolders: [],
    maxWorkers: 1,
    resolver: {
      sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx'],
      resolverMainFields: ['react-native', 'browser', 'main'],
      unstable_enablePackageExports: true,
      unstable_conditionNames: ['require', 'react-native'],
    },
    transformer: {babelTransformerPath: require.resolve('@react-native/metro-babel-transformer')},
  });
  const platform = process.argv[2] ?? 'ios';
  await Metro.runBuild(config, {
    entry: 'src/v1/index.ts', platform, dev: false, minify: false,
    out: path.join(os.tmpdir(), `a2ui-native-${platform}.js`),
  });
  console.log(`Metro ${platform} bundle built successfully.`);
}
main().catch(error => {console.error(error); process.exitCode = 1;});
