export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[var(--da-z-overlay)] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-inverse focus:no-underline"
    >
      Перейти к содержимому
    </a>
  );
}
