"use client";

import type { CardStyleDefinition } from "@/core/schemas";
import { Container } from "@/components/layout";
import { useMemo, useRef, useState } from "react";
import { assembleCardPrompt } from "./prompt";
import { DemoArt } from "./demo-art";
import "./cards.css";

type CardsLibraryProps = {
  styles: CardStyleDefinition[];
};

export function CardsLibrary({ styles }: CardsLibraryProps) {
  const categories = useMemo(
    () => ["Все стили", ...Array.from(new Set(styles.map((s) => s.category.ru)))],
    [styles],
  );
  const [category, setCategory] = useState("Все стили");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [font, setFont] = useState("");
  const [accent, setAccent] = useState("");
  const [lang, setLang] = useState<"ru" | "en">("ru");
  const [includeRatio, setIncludeRatio] = useState(false);
  const [ratio, setRatio] = useState("3:4");
  const [useIcons, setUseIcons] = useState(true);
  const [useAccentPanels, setUseAccentPanels] = useState(true);
  const [usePhotoBackground, setUsePhotoBackground] = useState(true);
  const [toast, setToast] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shown = styles.filter(
    (s) => category === "Все стили" || s.category.ru === category,
  );
  const selected = styles.find((s) => s.id === selectedId) ?? null;

  const sampleItems = styles.flatMap((s) =>
    (s.samples || []).map((src, index) => ({
      src,
      name: s.title.ru,
      id: s.id,
      index,
    })),
  );
  const laneLeft = sampleItems.filter((_, i) => i % 2 === 0);
  const laneRight = sampleItems.filter((_, i) => i % 2 === 1);

  function openStyle(id: string) {
    const next = styles.find((s) => s.id === id);
    if (!next) return;
    setSelectedId(id);
    setFont(next.fonts[0] ?? "");
    setAccent(next.colors[0] ?? "#ed6747");
    setLang("ru");
    setIncludeRatio(false);
    setRatio("3:4");
    setUseIcons(true);
    setUseAccentPanels(true);
    setUsePhotoBackground(true);
    queueMicrotask(() => dialogRef.current?.showModal());
  }

  function closeDialog() {
    dialogRef.current?.close();
    setSelectedId(null);
  }

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2200);
  }

  async function copyPrompt() {
    if (!selected) return;
    const text = assembleCardPrompt(selected, {
      lang,
      font,
      accent,
      includeRatio,
      ratio,
      useIcons,
      useAccentPanels,
      usePhotoBackground,
    });
    try {
      await navigator.clipboard.writeText(text);
      showToast("Промпт скопирован");
    } catch {
      showToast("Не удалось скопировать");
    }
  }

  const promptText = selected
    ? assembleCardPrompt(selected, {
        lang,
        font,
        accent,
        includeRatio,
        ratio,
        useIcons,
        useAccentPanels,
        usePhotoBackground,
      })
    : "";

  return (
    <div className="cards-surface">
      <section className="cards-hero">
        <Container>
          <p className="eyebrow">Карточки маркетплейса</p>
          <h1>Стиль карточки. Готовый промпт.</h1>
          <p>
            Выберите визуальный язык для инфографики товара, настройте шрифт и акцент — и
            скопируйте промпт во внешний генератор. Генерация снаружи; Atlas не рисует
            картинку.
          </p>
        </Container>
      </section>

      <section className="library-section" id="library">
        <Container>
          <div className="section-heading">
            <div>
              <div className="eyebrow">Библиотека стилей</div>
              <h2>Найдите свой визуальный язык</h2>
              <p>Один демо-товар во всех стилях — сравнение честное.</p>
            </div>
            <div className="result-count">
              <strong>{String(shown.length).padStart(2, "0")}</strong>
              <span>стилей</span>
            </div>
          </div>

          <div className="filters" aria-label="Фильтр по категориям">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-chip${category === cat ? " selected" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="style-grid">
            {shown.map((style, index) => (
              <button
                key={style.id}
                type="button"
                className="style-card"
                onClick={() => openStyle(style.id)}
              >
                <div className="card-visual">
                  <DemoArt
                    kind={style.kind}
                    background={style.background}
                    ink={style.ink}
                    accent={style.colors[0]}
                    font={style.fonts[0]}
                    indexLabel={String(index + 1).padStart(2, "0")}
                  />
                  <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="card-meta">
                  <div>
                    <span className="card-tag">{style.tag.ru}</span>
                    <h3>{style.title.ru}</h3>
                    <p>{style.description.ru}</p>
                  </div>
                  <span className="card-open" aria-hidden>
                    ↗
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {sampleItems.length > 0 ? (
        <section className="showcase-section" aria-labelledby="showcase-title">
          <div className="showcase-heading">
            <div>
              <div className="eyebrow">Реальные примеры</div>
              <h2 id="showcase-title">Стиль в деле</h2>
              <p>Сгенерированные карточки из библиотеки. Нажмите, чтобы открыть стиль.</p>
            </div>
          </div>
          {[laneLeft, laneRight].map((lane, laneIndex) => (
            <div
              key={laneIndex}
              className={`showcase-lane ${laneIndex === 1 ? "lane-right" : "lane-left"}`}
            >
              <div className="showcase-track">
                {[...lane, ...lane].map((item, i) => (
                  <button
                    key={`${item.id}-${item.index}-${i}`}
                    type="button"
                    className="showcase-card"
                    tabIndex={i >= lane.length ? -1 : undefined}
                    aria-hidden={i >= lane.length ? true : undefined}
                    disabled={i >= lane.length}
                    onClick={() => openStyle(item.id)}
                    aria-label={`Открыть стиль ${item.name}, пример ${item.index + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt="" loading="lazy" />
                    <span>{item.name}</span>
                    <b>↗</b>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      <section className="how-section" id="how">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.55fr]">
            <div>
              <div className="eyebrow">Всё просто</div>
              <h2>
                От выбора до генерации
                <br />
                за пару минут
              </h2>
            </div>
            <div className="steps">
              <article>
                <span className="step-no">01</span>
                <h3>Выберите стиль</h3>
                <p>Сравните карточки на одном товаре и найдите настроение.</p>
              </article>
              <article>
                <span className="step-no">02</span>
                <h3>Настройте детали</h3>
                <p>Подберите шрифт и акцентный цвет под бренд или задачу.</p>
              </article>
              <article>
                <span className="step-no">03</span>
                <h3>Скопируйте промпт</h3>
                <p>Вставьте во внешний генератор вместе с фото и описанием товара.</p>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <dialog
        ref={dialogRef}
        className="style-dialog"
        onClose={() => setSelectedId(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDialog();
        }}
      >
        <button type="button" className="dialog-close" aria-label="Закрыть" onClick={closeDialog}>
          ×
        </button>
        {selected ? (
          <div className="detail-layout">
            <div className="detail-preview">
              <DemoArt
                kind={selected.kind}
                background={selected.background}
                ink={selected.ink}
                accent={accent}
                font={font}
              />
              <p className="preview-caption">Один и тот же демо-товар во всех стилях</p>
              {selected.samples.length > 0 ? (
                <div className="sample-results">
                  <div className="sample-results-head">
                    <strong>Результаты генерации</strong>
                    <span>{String(selected.samples.length).padStart(2, "0")} ПРИМЕРА</span>
                  </div>
                  <div className="sample-results-grid">
                    {selected.samples.map((src, i) => (
                      <a
                        key={src}
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Открыть результат ${i + 1}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" loading="lazy" />
                      </a>
                    ))}
                  </div>
                  <small>Примеры получены во внешнем генераторе</small>
                </div>
              ) : null}
            </div>
            <div className="detail-content">
              <div className="eyebrow">
                {selected.tag.ru} · {selected.category.ru}
              </div>
              <h2>{selected.title.ru}</h2>
              <p className="detail-desc">{selected.description.ru}</p>

              <div className="setting">
                <div className="setting-label">
                  <strong>Шрифт</strong>
                  <span>Подходит к стилю</span>
                </div>
                <div className="font-options">
                  {selected.fonts.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`font-option${font === item ? " chosen" : ""}`}
                      style={{ fontFamily: `'${item}', sans-serif` }}
                      onClick={() => setFont(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="setting">
                <div className="setting-label">
                  <strong>Акцентный цвет</strong>
                  <span>Свотч или HEX</span>
                </div>
                <div className="color-options">
                  {selected.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`color-option${accent.toLowerCase() === color.toLowerCase() ? " chosen" : ""}`}
                      style={{ ["--swatch" as string]: color }}
                      aria-label={`Цвет ${color}`}
                      onClick={() => setAccent(color)}
                    />
                  ))}
                  <input
                    className="hex-text"
                    value={accent}
                    maxLength={7}
                    aria-label="HEX цвет"
                    onChange={(event) => {
                      const value = event.target.value;
                      if (/^#[0-9A-Fa-f]{6}$/.test(value)) setAccent(value);
                      else setAccent(value);
                    }}
                  />
                </div>
              </div>

              <div className="ratio-setting">
                <label className="ratio-toggle">
                  <input
                    type="checkbox"
                    checked={includeRatio}
                    onChange={(e) => setIncludeRatio(e.target.checked)}
                  />
                  <span>
                    <strong>Добавить формат в промпт</strong>
                    <small>Если генератор не задаёт его отдельно</small>
                  </span>
                </label>
                <label>
                  Соотношение
                  <select
                    value={ratio}
                    disabled={!includeRatio}
                    onChange={(e) => setRatio(e.target.value)}
                  >
                    {["1:1", "3:4", "4:3", "2:3", "3:2", "9:16", "16:9"].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="prompt-options">
                <div className="prompt-options-title">Настройки промпта</div>
                <label className="option-check">
                  <input
                    type="checkbox"
                    checked={useIcons}
                    onChange={(e) => setUseIcons(e.target.checked)}
                  />
                  <span>
                    <strong>Иконки характеристик</strong>
                    <small>Только для фактов из текста</small>
                  </span>
                </label>
                <label className="option-check">
                  <input
                    type="checkbox"
                    checked={useAccentPanels}
                    onChange={(e) => setUseAccentPanels(e.target.checked)}
                  />
                  <span>
                    <strong>Плашки акцентного цвета</strong>
                    <small>Подложки для важных пунктов</small>
                  </span>
                </label>
                <label className="option-check">
                  <input
                    type="checkbox"
                    checked={usePhotoBackground}
                    onChange={(e) => setUsePhotoBackground(e.target.checked)}
                  />
                  <span>
                    <strong>Тематический фотофон</strong>
                    <small>Фотосцена по применению товара</small>
                  </span>
                </label>
              </div>

              <div className="prompt-box">
                <div className="prompt-head">
                  <strong>Готовый промпт</strong>
                  <div className="prompt-tabs">
                    <button
                      type="button"
                      className={lang === "ru" ? "on" : ""}
                      onClick={() => setLang("ru")}
                    >
                      RU
                    </button>
                    <button
                      type="button"
                      className={lang === "en" ? "on" : ""}
                      onClick={() => setLang("en")}
                    >
                      EN
                    </button>
                  </div>
                </div>
                <pre>{promptText}</pre>
                <button type="button" className="copy-button" onClick={copyPrompt}>
                  <span>Скопировать промпт</span>
                  <b>↗</b>
                </button>
              </div>
              <p className="detail-note">
                Добавьте фото и описание своего товара в генератор. Проверьте результат перед
                публикацией.
              </p>
            </div>
          </div>
        ) : null}
      </dialog>

      <div className={`toast${toast ? " visible" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}
