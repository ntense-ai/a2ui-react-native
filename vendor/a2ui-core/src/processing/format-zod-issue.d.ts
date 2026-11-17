import { z } from 'zod';
/**
 * Formats a single Zod issue into a human-readable diagnostic message.
 *
 * Direct attribute extraction is used so that issue details (such as unrecognized
 * property keys or invalid enum options) are preserved even when running in
 * optimized/minified production builds where Zod's internal error map messages
 * may be obfuscated or stripped.
 *
 * @param err Zod validation issue to format.
 * @return Human-readable formatted error message.
 */
export declare function formatZodIssue(err: z.ZodIssue): string;
