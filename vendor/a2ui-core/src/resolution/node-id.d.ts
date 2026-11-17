/**
 * Returns the next node id, `a2ui-n<counter>`.
 *
 * The counter is shared through `globalThis`, so several bundled copies of
 * web_core on one page (one per renderer, for example) still produce ids that
 * are unique across the whole document.
 */
export declare function nextNodeId(): string;
