export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-6 px-6 py-16">
      <p className="text-sm tracking-[0.18em] text-zinc-500 uppercase">Foundation</p>
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">DESIGN ATLAS</h1>
      <p className="max-w-2xl text-lg leading-8 text-zinc-600">
        Инженерный фундамент проекта готов к развитию. Публичный каталог стилей, playground и
        экспорт появятся после Design System Core и эталонного стиля.
      </p>
      <ul className="space-y-2 text-sm text-zinc-700">
        <li>PHASE 0 — repository bootstrap</li>
        <li>PHASE 1 — agent harness & documentation</li>
        <li>Далее — Design System → Content Engine → Reference Style</li>
      </ul>
    </main>
  );
}
