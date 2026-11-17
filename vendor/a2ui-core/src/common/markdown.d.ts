/**
 * Markdown rendering types and interfaces for A2UI components.
 *
 * Defines the contract and configuration options for custom markdown compilation
 * and tag-based CSS class mapping.
 */
/**
 * Mapping of HTML tag names to class lists applied during markdown rendering.
 */
export type MarkdownRendererTagClassMap = Record<string, string[]>;
/**
 * Configuration options for markdown rendering and styling.
 */
export interface MarkdownRendererOptions {
    /** Map of tag names to CSS class lists applied to rendered elements. */
    tagClassMap?: MarkdownRendererTagClassMap;
    /** Display mode for rendered markdown elements. */
    renderMode?: 'inline' | 'block';
    /** Custom renderer function overriding standard markdown compilation. */
    renderer?: MarkdownRenderer;
}
/**
 * Renders markdown content to HTML asynchronously.
 *
 * Implementations must sanitize the resulting HTML to prevent security vulnerabilities.
 *
 * @param markdown Markdown string to render.
 * @param options Options configuring the markdown rendering process.
 * @returns A promise resolving to the rendered HTML string.
 */
export type MarkdownRenderer = (markdown: string, options?: MarkdownRendererOptions) => Promise<string>;
