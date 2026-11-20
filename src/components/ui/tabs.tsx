"use client";

import { focusRingClass } from "@/components/ui/control-classes";
import { cn } from "@/lib/cn";
import { useId, useState, type ReactNode } from "react";

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

export type TabsProps = {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  className?: string;
};

export function Tabs({ items, value, defaultValue, onValueChange, className }: TabsProps) {
  const baseId = useId();
  const first = items[0]?.id ?? "";
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? first);
  const current = value ?? uncontrolled;

  function select(id: string) {
    if (value === undefined) setUncontrolled(id);
    onValueChange?.(id);
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        aria-label="Секции"
        className="border-border flex flex-wrap gap-1 border-b"
      >
        {items.map((item) => {
          const selected = item.id === current;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              className={cn(
                "relative -mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors",
                selected
                  ? "border-accent text-foreground"
                  : "text-muted hover:text-foreground border-transparent",
                focusRingClass,
              )}
              onClick={() => select(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) =>
        item.id === current ? (
          <div
            key={item.id}
            role="tabpanel"
            id={`${baseId}-panel-${item.id}`}
            aria-labelledby={`${baseId}-tab-${item.id}`}
            className="pt-4"
          >
            {item.content}
          </div>
        ) : null,
      )}
    </div>
  );
}
