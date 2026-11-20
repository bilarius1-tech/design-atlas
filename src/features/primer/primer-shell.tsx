"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { PrimerNicheId } from "./aliases";
import { primerHref } from "./aliases";
import type { PrimerStyleOption } from "./catalog";
import { NICHE_OPTIONS, PRIMER_NICHES } from "./niches";
import { PrimerLanding } from "./primer-landing";
import "./primer.css";

export function PrimerShell({
  catalog,
  initialStyleId,
  initialNiche,
}: {
  catalog: PrimerStyleOption[];
  initialStyleId: string;
  initialNiche: PrimerNicheId;
}) {
  const router = useRouter();
  const [styleId, setStyleId] = useState(initialStyleId);
  const [nicheId, setNicheId] = useState<PrimerNicheId>(initialNiche);

  const style = useMemo(
    () => catalog.find((item) => item.id === styleId) ?? catalog[0]!,
    [catalog, styleId],
  );
  const niche = PRIMER_NICHES[nicheId];

  function update(nextStyle: string, nextNiche: PrimerNicheId) {
    setStyleId(nextStyle);
    setNicheId(nextNiche);
    router.replace(primerHref(nextStyle, nextNiche), { scroll: false });
  }

  return (
    <div>
      <div className="primer-chrome">
        <div className="primer-chrome-inner">
          <Link className="primer-chrome-brand" href="/">
            Дизайн Атлас
          </Link>
          <p className="primer-chrome-note">
            Это пример, вместо названия и текстов будет ваша компания. Стиль «{style.title}»,
            сфера — {niche.label}.
          </p>
          <div className="primer-chrome-controls">
            <div className="primer-chrome-field">
              <label htmlFor="primer-style">Стиль</label>
              <select
                id="primer-style"
                value={style.id}
                onChange={(event) => update(event.target.value, nicheId)}
              >
                {catalog.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="primer-chrome-field">
              <label htmlFor="primer-niche">Сфера</label>
              <select
                id="primer-niche"
                value={nicheId}
                onChange={(event) => update(style.id, event.target.value as PrimerNicheId)}
              >
                {NICHE_OPTIONS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="primer-chrome-links">
            <Link href={`/studio?template=saas-landing&style=${style.id}`}>В студию</Link>
            <a href="https://vaybik.ru">Сервис студии Вайбик</a>
          </div>
        </div>
      </div>
      <PrimerLanding styleId={style.id} tokens={style.tokens} niche={niche} />
    </div>
  );
}
