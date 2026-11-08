"use client";

import type { ComponentsDefinition, StyleTokens } from "@/core/schemas";
import { AlertCircle, Check, Home, Search, Settings } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { StylePreviewFrame } from "./style-preview-frame";

export type StylePlaygroundProps = {
  styleId: string;
  title: string;
  tokens: StyleTokens;
  groups?: ComponentsDefinition["groups"];
};

function PlaygroundSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 border-t border-[var(--sp-color-border)] pt-8 first:border-t-0 first:pt-0">
      <div className="space-y-1">
        <h2 className="sp-heading sp-h2">{title}</h2>
        {description ? <p className="sp-muted text-[length:var(--sp-text-sm)]">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function StylePlayground({ styleId, title, tokens, groups }: StylePlaygroundProps) {
  const baseId = useId();
  const [loading, setLoading] = useState(false);
  const [newsletter, setNewsletter] = useState("");
  const [plan, setPlan] = useState("studio");
  const [accepted, setAccepted] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [tab, setTab] = useState<"overview" | "tokens" | "states">("overview");
  const [range, setRange] = useState(40);

  return (
    <StylePreviewFrame styleId={styleId} tokens={tokens} className="space-y-10 p-6 sm:p-8">
      <header className="sp-nav">
        <div>
          <p className="sp-label sp-muted tracking-[0.14em] uppercase">Style Playground</p>
          <p className="sp-heading sp-h1 mt-1">{title}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="sp-btn sp-btn-primary">
            Primary
          </button>
          <button type="button" className="sp-btn sp-btn-secondary">
            Secondary
          </button>
        </div>
      </header>

      <PlaygroundSection title="Typography" description="Display → code scale from style tokens.">
        <div className="space-y-3">
          <p className="sp-heading sp-display">Display</p>
          <p className="sp-heading sp-h1">Heading one</p>
          <p className="sp-heading sp-h2">Heading two</p>
          <p className="sp-heading sp-h3">Heading three</p>
          <p className="sp-body-lg">Lead paragraph for editorial introductions.</p>
          <p>Body text uses the style body family and base scale.</p>
          <p className="sp-caption sp-muted">Caption / helper text</p>
          <p className="sp-label tracking-[0.14em] uppercase">Label</p>
          <blockquote className="sp-heading sp-h2 border-l-2 border-[var(--sp-color-accent)] pl-4">
            Quote — hierarchy before decoration.
          </blockquote>
          <p className="sp-code">tokens.meta.styleId = &quot;{styleId}&quot;</p>
          <a className="underline" href="#forms">
            Inline link
          </a>
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="Color system">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              ["background", tokens.colors.background],
              ["surface", tokens.colors.surface],
              ["text", tokens.colors.text],
              ["muted", tokens.colors.muted],
              ["primary", tokens.colors.primary],
              ["accent", tokens.colors.accent],
              ["border", tokens.colors.border],
            ] as const
          ).map(([name, value]) => (
            <div key={name} className="sp-card space-y-3">
              <div
                className="h-16 border border-[var(--sp-color-border)]"
                style={{ background: value, borderRadius: "var(--sp-radius)" }}
              />
              <p className="sp-label uppercase tracking-[0.08em]">{name}</p>
              <p className="sp-code sp-muted">{value}</p>
            </div>
          ))}
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="Buttons" description="Real controls — loading and disabled included.">
        <div className="flex flex-wrap gap-3">
          <button type="button" className="sp-btn sp-btn-primary">
            Primary
          </button>
          <button type="button" className="sp-btn sp-btn-secondary">
            Secondary
          </button>
          <button type="button" className="sp-btn sp-btn-tertiary">
            Tertiary
          </button>
          <button type="button" className="sp-btn sp-btn-ghost">
            Ghost
          </button>
          <button type="button" className="sp-btn sp-btn-accent" aria-label="Search">
            <Search className="size-4" aria-hidden />
          </button>
          <button type="button" className="sp-btn sp-btn-primary" disabled>
            Disabled
          </button>
          <button
            type="button"
            className="sp-btn sp-btn-primary"
            aria-busy={loading || undefined}
            onClick={() => {
              setLoading(true);
              window.setTimeout(() => setLoading(false), 1200);
            }}
          >
            {loading ? "Loading…" : "Trigger loading"}
          </button>
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="Forms" description="Keyboard-accessible inputs with live state.">
        <div id="forms" className="grid gap-6 lg:grid-cols-2">
          <div>
            <label className="sp-field-label" htmlFor={`${baseId}-email`}>
              Email
            </label>
            <input
              id={`${baseId}-email`}
              className="sp-input"
              type="email"
              placeholder="hello@example.com"
              value={newsletter}
              onChange={(event) => setNewsletter(event.target.value)}
            />
          </div>
          <div>
            <label className="sp-field-label" htmlFor={`${baseId}-search`}>
              Search
            </label>
            <input id={`${baseId}-search`} className="sp-input" type="search" placeholder="Find a pattern" />
          </div>
          <div className="lg:col-span-2">
            <label className="sp-field-label" htmlFor={`${baseId}-notes`}>
              Notes
            </label>
            <textarea
              id={`${baseId}-notes`}
              className="sp-textarea"
              placeholder="Write a short editorial note"
              defaultValue=""
            />
          </div>
          <div>
            <label className="sp-field-label" htmlFor={`${baseId}-select`}>
              Select
            </label>
            <select id={`${baseId}-select`} className="sp-select" defaultValue="grid">
              <option value="grid">Modular grid</option>
              <option value="type">Typography first</option>
              <option value="photo">Documentary photo</option>
            </select>
          </div>
          <div>
            <label className="sp-field-label" htmlFor={`${baseId}-range`}>
              Range · {range}
            </label>
            <input
              id={`${baseId}-range`}
              type="range"
              min={0}
              max={100}
              value={range}
              onChange={(event) => setRange(Number(event.target.value))}
              className="w-full"
            />
          </div>
          <fieldset className="space-y-3">
            <legend className="sp-field-label">Plan</legend>
            {(
              [
                ["studio", "Studio"],
                ["team", "Team"],
                ["org", "Organization"],
              ] as const
            ).map(([value, label]) => (
              <label key={value} className="flex items-center gap-2 text-[length:var(--sp-text-sm)]">
                <input
                  type="radio"
                  name={`${baseId}-plan`}
                  value={value}
                  checked={plan === value}
                  onChange={() => setPlan(value)}
                />
                {label}
              </label>
            ))}
          </fieldset>
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-[length:var(--sp-text-sm)]">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(event) => setAccepted(event.target.checked)}
              />
              Accept guidelines
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="sp-switch"
                role="switch"
                aria-checked={notifications}
                aria-label="Enable notifications"
                onClick={() => setNotifications((value) => !value)}
              >
                <span className="sp-switch-thumb" />
              </button>
              <span className="text-[length:var(--sp-text-sm)]">
                Notifications {notifications ? "on" : "off"}
              </span>
            </div>
            <div>
              <label className="sp-field-label" htmlFor={`${baseId}-invalid`}>
                Validation error
              </label>
              <input
                id={`${baseId}-invalid`}
                className="sp-input"
                aria-invalid="true"
                defaultValue="missing @"
              />
              <p className="sp-caption mt-2" style={{ color: "var(--sp-color-accent)" }}>
                Enter a valid email address.
              </p>
            </div>
            <p className="sp-caption sp-muted flex items-center gap-2">
              <Check className="size-4" aria-hidden />
              Success state: preferences saved locally in this session.
            </p>
          </div>
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="Shapes & geometry">
        <div className="flex flex-wrap items-end gap-6">
          <div className="sp-shape sp-shape-circle" aria-label="Circle" />
          <div className="sp-shape sp-shape-square" aria-label="Square" />
          <div className="sp-shape sp-shape-rect" aria-label="Rectangle" />
          <div className="sp-shape sp-shape-rect" style={{ borderRadius: "12px" }} aria-label="Rounded rectangle" />
        </div>
        <hr className="sp-divider my-6" />
        <div className="sp-grid-demo" aria-label="Grid sample">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <span className="size-2 rounded-full bg-[var(--sp-color-primary)]" />
          <span className="size-2 rounded-full bg-[var(--sp-color-accent)]" />
          <span className="size-2 rounded-full bg-[var(--sp-color-muted)]" />
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="Cards">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["Feature", "Modular composition with clear hierarchy."],
            ["Article", "Editorial excerpt with restrained chrome."],
            ["Profile", "Identity block without decorative fluff."],
            ["Pricing", "One plan, one promise, no fake stats."],
            ["Testimonial", "A short quote about grid discipline."],
            ["Statistics", "Prefer qualitative proof over vanity metrics."],
          ].map(([name, body]) => (
            <article key={name} className="sp-card space-y-3">
              <span className="sp-badge">{name}</span>
              <h3 className="sp-heading sp-h3">{name}</h3>
              <p className="sp-muted text-[length:var(--sp-text-sm)]">{body}</p>
            </article>
          ))}
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="Navigation">
        <div className="space-y-6">
          <div className="sp-tabs" role="tablist" aria-label="Playground tabs">
            {(
              [
                ["overview", "Overview"],
                ["tokens", "Tokens"],
                ["states", "States"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                className="sp-tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <div role="tabpanel" className="sp-surface p-4">
            {tab === "overview" && <p>Playground overview for {styleId}.</p>}
            {tab === "tokens" && (
              <p className="sp-code">
                radius={tokens.geometry.radius}; border={tokens.geometry.borderWidth}
              </p>
            )}
            {tab === "states" && <p>Focus, hover, and selected states use accent/primary tokens.</p>}
          </div>
          <nav aria-label="Breadcrumb example" className="sp-muted text-[length:var(--sp-text-sm)]">
            Styles / {styleId} / playground
          </nav>
          <div className="flex gap-2">
            <button type="button" className="sp-btn sp-btn-secondary">
              Prev
            </button>
            <button type="button" className="sp-btn sp-btn-secondary">
              1
            </button>
            <button type="button" className="sp-btn sp-btn-primary">
              2
            </button>
            <button type="button" className="sp-btn sp-btn-secondary">
              Next
            </button>
          </div>
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="Feedback">
        <div className="flex flex-wrap gap-2">
          <span className="sp-badge">Tag</span>
          <span className="sp-badge sp-badge-accent">Badge</span>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="sp-alert flex gap-3">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            <div>
              <p className="font-semibold">Alert</p>
              <p className="sp-muted text-[length:var(--sp-text-sm)]">
                Functional feedback only — no decorative noise.
              </p>
            </div>
          </div>
          <div className="sp-card border-dashed">
            <p className="sp-heading sp-h3">Empty state</p>
            <p className="sp-muted mt-2 text-[length:var(--sp-text-sm)]">
              No exported package yet. Complete PHASE 7 for ZIP download.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <div
            className="h-2 overflow-hidden border border-[var(--sp-color-border)]"
            style={{ borderRadius: "var(--sp-radius)" }}
          >
            <div
              className="h-full bg-[var(--sp-color-primary)]"
              style={{ width: `${range}%` }}
              role="progressbar"
              aria-valuenow={range}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="sp-muted mt-3 animate-pulse text-[length:var(--sp-text-sm)]">
            Skeleton placeholder · content loading metaphor
          </div>
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="Icons" description="Functional Lucide icons sized for the style.">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Home className="size-5" aria-hidden />
            <span className="text-[length:var(--sp-text-sm)]">Navigation</span>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="size-5" aria-hidden />
            <span className="text-[length:var(--sp-text-sm)]">Action</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="size-5" aria-hidden />
            <span className="text-[length:var(--sp-text-sm)]">Status</span>
          </div>
          <div className="flex items-center gap-2">
            <Search className="size-5" aria-hidden />
            <span className="text-[length:var(--sp-text-sm)]">Functional</span>
          </div>
        </div>
      </PlaygroundSection>

      {groups && groups.length > 0 ? (
        <PlaygroundSection
          title="Component matrix (from content)"
          description="Declared groups from components.json — rendered checklist for coverage."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {groups.map((group) => (
              <div key={group.id} className="sp-card space-y-2">
                <p className="sp-heading sp-h3">{group.label}</p>
                <ul className="sp-muted list-disc space-y-1 pl-5 text-[length:var(--sp-text-sm)]">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </PlaygroundSection>
      ) : null}
    </StylePreviewFrame>
  );
}
