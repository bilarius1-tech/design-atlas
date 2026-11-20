import Script from "next/script";

/** Public widget id from https://vaybik.ru (same snippet). Not a secret. */
export const VAYBIK_CHAT_WIDGET_SRC = "https://chat.vaybik.ru/widget.js";
export const VAYBIK_CHAT_WIDGET_ID = "xA6FHnneH5CW";

export function VaybikChatWidget() {
  return (
    <Script
      src={VAYBIK_CHAT_WIDGET_SRC}
      strategy="afterInteractive"
      data-id={VAYBIK_CHAT_WIDGET_ID}
    />
  );
}
