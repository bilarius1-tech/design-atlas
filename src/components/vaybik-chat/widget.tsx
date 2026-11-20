/**
 * Exact public snippet from https://vaybik.ru:
 *   <script src="https://chat.vaybik.ru/widget.js" data-id="xA6FHnneH5CW" async></script>
 *
 * Rendered as a native script (not next/script). The loader reads
 * `document.currentScript` for data-id, which breaks if the tag is injected later.
 */
export const VAYBIK_CHAT_WIDGET_SRC = "https://chat.vaybik.ru/widget.js";
export const VAYBIK_CHAT_WIDGET_ID = "xA6FHnneH5CW";

export function VaybikChatWidget() {
  return (
    // eslint-disable-next-line @next/next/no-sync-scripts -- async native tag; needed for currentScript
    <script src={VAYBIK_CHAT_WIDGET_SRC} data-id={VAYBIK_CHAT_WIDGET_ID} async />
  );
}
