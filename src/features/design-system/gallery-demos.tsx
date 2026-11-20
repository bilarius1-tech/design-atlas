"use client";

import { Button, Checkbox, Dialog, Hint, Radio, Switch, Tabs, Tooltip } from "@/components/ui";
import { useState } from "react";

export function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Открыть диалог
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Пример диалога"
        description="Escape и клик по фону закрывают окно. У крестика есть видимый фокус."
      >
        <p className="text-muted text-sm">Содержимое модального окна оболочки Atlas.</p>
        <div className="mt-4">
          <Button onClick={() => setOpen(false)}>Закрыть</Button>
        </div>
      </Dialog>
    </div>
  );
}

export function SwitchDemo() {
  const [on, setOn] = useState(true);
  const [offDisabled] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-6">
      <Switch checked={on} onCheckedChange={setOn} label="Уведомления" />
      <Switch checked={false} disabled label="Выключено и недоступно" />
      <span className="text-muted text-sm">{offDisabled ? "" : on ? "Вкл" : "Выкл"}</span>
    </div>
  );
}

export function TabsDemo() {
  return (
    <Tabs
      defaultValue="one"
      items={[
        { id: "one", label: "Первая", content: <p className="text-sm">Панель один.</p> },
        { id: "two", label: "Вторая", content: <p className="text-sm">Панель два.</p> },
      ]}
    />
  );
}

export function ChoiceDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox label="Чекбокс по умолчанию" defaultChecked />
      <Checkbox label="Недоступный" disabled />
      <Checkbox label="Ошибка" invalid />
      <div className="flex flex-wrap gap-4">
        <Radio name="gallery-pack" label="Free" defaultChecked />
        <Radio name="gallery-pack" label="Full (не в этом заходе)" disabled />
      </div>
    </div>
  );
}

export function OverlayDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Hint label="Подсказка открывается кликом или с клавиатуры. Escape закрывает." />
      <Tooltip content="Появляется при наведении и фокусе">
        <Button variant="secondary" size="sm">
          Наведите или сфокусируйте
        </Button>
      </Tooltip>
    </div>
  );
}
