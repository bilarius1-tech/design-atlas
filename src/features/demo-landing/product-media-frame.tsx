/** Decorative media mock — values come from scoped `--sp-*` tokens only. */
export type MediaFrameVariant = "app" | "store" | "editorial";

export function ProductMediaFrame({
  caption,
  variant = "app",
}: {
  caption?: string;
  variant?: MediaFrameVariant;
}) {
  if (variant === "store") {
    return (
      <div className="dl-media-frame dl-media-frame-store" aria-hidden>
        <div className="dl-media-store-stage">
          <div className="dl-media-store-object" />
          <div className="dl-media-store-object dl-media-store-object-secondary" />
        </div>
        <div className="dl-media-store-meta">
          <span className="dl-media-store-swatch" />
          <span className="dl-media-store-swatch dl-media-store-swatch-accent" />
          <span className="dl-media-store-swatch" />
          <span className="dl-media-chrome-label">{caption ?? "product / surface"}</span>
        </div>
      </div>
    );
  }

  if (variant === "editorial") {
    return (
      <div className="dl-media-frame dl-media-frame-editorial" aria-hidden>
        <div className="dl-media-editorial-slab">
          <span className="dl-media-editorial-rule" />
          <span className="dl-media-editorial-rule dl-media-editorial-rule-short" />
          <span className="dl-media-editorial-block" />
        </div>
        <div className="dl-media-editorial-aside">
          <span className="dl-media-editorial-date" />
          <span className="dl-media-chrome-label">{caption ?? "story / type"}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dl-media-frame" aria-hidden>
      <div className="dl-media-chrome">
        <span className="dl-media-dot" />
        <span className="dl-media-dot" />
        <span className="dl-media-dot" />
        <span className="dl-media-chrome-label">{caption ?? "app / panel"}</span>
      </div>
      <div className="dl-media-body">
        <div className="dl-media-sidebar">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="dl-media-main">
          <div className="dl-media-toolbar">
            <span className="dl-media-pill" />
            <span className="dl-media-pill dl-media-pill-accent" />
          </div>
          <div className="dl-media-cards">
            <div className="dl-media-card" />
            <div className="dl-media-card" />
            <div className="dl-media-card dl-media-card-accent" />
          </div>
          <div className="dl-media-chart">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
