/**
 * Structured representation of a semantic version according to Semantic Versioning 2.0.0 (https://semver.org/).
 */
export interface SemVer {
    /** Major version number indicating breaking API changes. */
    readonly major: number;
    /** Minor version number indicating backwards-compatible features. */
    readonly minor: number;
    /** Patch version number indicating backwards-compatible bug fixes. */
    readonly patch: number;
    /** Dot-separated pre-release identifiers. */
    readonly prerelease: readonly string[];
    /** Dot-separated build metadata identifiers. */
    readonly build: readonly string[];
}
/**
 * Normalizes a version string by stripping any leading 'v'/'V' and replacing underscores with dots in the core release segment.
 *
 * Preserves pre-release ('-') and build metadata ('+') suffixes intact.
 *
 * Examples:
 *   'v1_0' -> '1.0'
 *   'V1_0' -> '1.0'
 *   'v0_9_1' -> '0.9.1'
 *   '1_0_0-dev_release' -> '1.0.0-dev_release'
 *
 * @param version The raw version string to normalize.
 * @return The normalized version string, or empty string if input is falsy.
 */
export declare function normalizeVersionString(version: string | undefined | null): string;
/**
 * Parses a semantic version string according to SemVer 2.0.0.
 *
 * @param versionStr The version string to parse.
 * @return A SemVer object if valid, or null if the string cannot be parsed.
 */
export declare function parseSemVer(versionStr: string | undefined | null): SemVer | null;
/**
 * Converts a string or partial SemVer object into a normalized SemVer representation.
 *
 * @param v The version string or object to convert.
 * @return A SemVer object if valid, or null otherwise.
 */
export declare function toSemVer(v: string | SemVer | undefined | null): SemVer | null;
/**
 * Formats a semantic version into a canonical string representation.
 *
 * For standard versions with zero patch and no pre-release or build metadata,
 * returns `${major}.${minor}` (e.g. '0.8', '0.9', '1.0').
 * For versions with non-zero patch, pre-release identifiers, or build metadata,
 * returns the full SemVer string (e.g. '0.9.1', '1.0.0-beta.1').
 *
 * @param version The version string or SemVer object to canonicalize.
 * @return The canonical version string, or null if the input cannot be parsed.
 */
export declare function toCanonicalVersion(version: string | SemVer | undefined | null): string | null;
/**
 * Compares two semantic version strings or SemVer objects according to SemVer 2.0.0 precedence rules (Section 11).
 *
 * 1. Precedence is determined by comparing major, minor, and patch numerically.
 * 2. When major, minor, and patch are equal, a pre-release version has lower precedence than a normal version (e.g. 1.0.0-alpha < 1.0.0).
 * 3. Precedence for two pre-release versions is determined by comparing dot-separated identifiers from left to right.
 * 4. Build metadata does NOT figure into precedence.
 *
 * @param a First version string or SemVer object.
 * @param b Second version string or SemVer object.
 * @return Negative number if a < b, 0 if a == b, positive number if a > b.
 */
export declare function compareSemVer(a: string | SemVer | undefined | null, b: string | SemVer | undefined | null): number;
/**
 * Checks if a given version string is at least the target minimum version.
 *
 * @param version The version string to check (e.g. 'v1.0', 'v1.1', 'v2.0').
 * @param minVersion The minimum version requirement (e.g. 'v1.0', '1.0.0').
 * @return Whether version is at least minVersion.
 */
export declare function isAtLeastVersion(version: string | SemVer | undefined | null, minVersion: string | SemVer): boolean;
