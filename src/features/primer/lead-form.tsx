"use client";

import { useState } from "react";
import type { PrimerNiche } from "./niches";

export function PrimerLeadForm({ niche }: { niche: PrimerNiche }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="primer-form-ok" role="status">
        Это демо: заявка никуда не ушла. На вашем сайте здесь появится настоящее письмо
        или уведомление в мессенджер.
      </p>
    );
  }

  return (
    <form
      className="primer-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <label>
        Имя
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        Телефон
        <input name="phone" type="tel" autoComplete="tel" required placeholder="+7" />
      </label>
      <label>
        Комментарий
        <textarea name="comment" rows={4} placeholder="Кратко о задаче (необязательно)" />
      </label>
      <button type="submit" className="sp-btn sp-btn-primary">
        {niche.formCta}
      </button>
    </form>
  );
}
