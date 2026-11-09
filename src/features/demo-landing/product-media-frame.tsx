/** Decorative product UI mock — values come from scoped `--sp-*` tokens only. */
export function ProductMediaFrame({ caption }: { caption?: string }) {
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
