/** @vitest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs } from "@/components/ui/tabs";

describe("Button", () => {
  it("exposes loading state to assistive tech and keeps a spinner", () => {
    render(<Button loading>Сохранить</Button>);
    const button = screen.getByRole("button");
    expect(button.getAttribute("aria-busy")).toBe("true");
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getByText("Загрузка")).toBeTruthy();
    expect(screen.getByText("Сохранить")).toBeTruthy();
  });
});

describe("Input", () => {
  it("marks invalid fields and associates the error message", () => {
    render(<Input id="email" invalid errorMessage="Нужна почта" defaultValue="bad" />);
    const field = screen.getByDisplayValue("bad");
    expect(field.getAttribute("aria-invalid")).toBe("true");
    expect(field.getAttribute("aria-describedby")).toBe("email-error");
    expect(screen.getByText("Нужна почта")).toBeTruthy();
  });
});

describe("Alert", () => {
  it("uses status for info and alert for danger", () => {
    const { rerender } = render(<Alert title="Инфо">Текст</Alert>);
    expect(screen.getByRole("status")).toBeTruthy();
    rerender(
      <Alert tone="danger" title="Ошибка">
        Сбой
      </Alert>,
    );
    expect(screen.getByRole("alert")).toBeTruthy();
  });
});

describe("Checkbox", () => {
  it("forwards invalid and disabled", () => {
    render(<Checkbox label="Согласен" invalid disabled />);
    const box = screen.getByRole("checkbox", { name: "Согласен" });
    expect((box as HTMLInputElement).disabled).toBe(true);
    expect(box.getAttribute("aria-invalid")).toBe("true");
  });
});

describe("Switch", () => {
  it("toggles aria-checked", () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onCheckedChange={onChange} label="Флаг" />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe("Tabs", () => {
  it("activates a panel when a tab is pressed", () => {
    render(
      <Tabs
        defaultValue="one"
        items={[
          { id: "one", label: "Раз", content: "панель-один" },
          { id: "two", label: "Два", content: "панель-два" },
        ]}
      />,
    );
    expect(screen.getByText("панель-один")).toBeTruthy();
    fireEvent.click(screen.getByRole("tab", { name: "Два" }));
    expect(screen.getByText("панель-два")).toBeTruthy();
    expect(screen.queryByText("панель-один")).toBeNull();
  });
});
