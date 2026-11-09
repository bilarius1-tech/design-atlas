import type { CardKind } from "@/core/schemas";
import { cn } from "@/lib/cn";
import type { CSSProperties } from "react";

type DemoArtProps = {
  kind: CardKind;
  background: string;
  ink: string;
  accent: string;
  font: string;
  className?: string;
  indexLabel?: string;
};

export function DemoArt({
  kind,
  background,
  ink,
  accent,
  font,
  className,
  indexLabel = "01",
}: DemoArtProps) {
  return (
    <div
      className={cn("demo-art", kind, className)}
      style={
        {
          "--art-bg": background,
          "--art-ink": ink,
          "--accent": accent,
          "--chosen-font": `'${font}', sans-serif`,
        } as CSSProperties
      }
    >
      <div className="demo-grain" aria-hidden />
      <span className="demo-index">OBJECT / 01</span>
      <div className="demo-product" aria-hidden>
        <div className="product-shadow" />
        <div className="product-vase">
          <div className="vase-neck" />
          <div className="vase-body" />
          <div className="vase-shine" />
        </div>
      </div>
      <div className="demo-copy">
        <span>КЕРАМИКА · ДЛЯ ДОМА</span>
        <strong>
          Форма
          <br />
          тишины
        </strong>
        <i aria-hidden />
      </div>
      <span className="demo-side">FORM STUDY — 2026</span>
      <span className="demo-number">{indexLabel}</span>
    </div>
  );
}
