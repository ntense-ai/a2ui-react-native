/**
 * Validates that a media URL uses an allowed `http:`, `https:`, or `data:` scheme
 * (including relative URLs resolved against an `http(s)` base location).
 * Returns the trimmed URL string if valid, or `undefined` if disallowed or invalid.
 */
export declare function sanitizeMediaUrl(urlInput: unknown): string | undefined;
