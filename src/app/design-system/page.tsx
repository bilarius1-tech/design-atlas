import { Container, Section, Stack } from "@/components/layout";
import {
  Alert,
  Badge,
  Button,
  Card,
  Divider,
  EmptyState,
  Input,
  Label,
  Link,
  Select,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Textarea,
} from "@/components/ui";
import {
  ChoiceDemo,
  DialogDemo,
  OverlayDemo,
  SwitchDemo,
  TabsDemo,
} from "@/features/design-system/gallery-demos";
import type { Metadata } from "next";
import { ArrowRight, Check, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Дизайн-система",
  description: "Редакционная дизайн-система оболочки DESIGN ATLAS.",
};

export default function DesignSystemPage() {
  return (
    <main id="main-content">
      <section className="border-border bg-surface border-b">
        <Container className="space-y-4 py-14">
          <p className="text-muted text-xs font-semibold tracking-[0.14em] uppercase">App Shell</p>
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Дизайн-система</h1>
          <p className="text-muted max-w-2xl text-lg">
            Нейтральная светлая оболочка продукта. Это не каталожный стиль и не цвета Вайбика — тема{" "}
            <code className="font-mono text-sm">vaybik</code> живёт отдельно, для агентов студии.
          </p>
        </Container>
      </section>

      <Section
        eyebrow="Typography"
        title="Типографическая шкала"
        description="Source Serif 4 для заголовков, Source Sans 3 для интерфейса."
      >
        <Stack gap="lg">
          <p className="text-display font-serif tracking-tight">Display</p>
          <p className="font-serif text-4xl tracking-tight">Заголовок H1</p>
          <p className="font-serif text-3xl tracking-tight">Заголовок H2</p>
          <p className="font-serif text-2xl tracking-tight">Заголовок H3</p>
          <p className="text-foreground text-lg">Lead — поясняющий абзац для секций и вводных.</p>
          <p className="text-foreground text-base">
            Body — основной текст. Информационная плотность без декоративного шума.
          </p>
          <p className="text-muted text-sm">Caption / muted — вторичная информация.</p>
          <p className="font-mono text-sm">code.token = &quot;design-atlas-shell&quot;</p>
        </Stack>
      </Section>

      <Section
        eyebrow="Color"
        title="Цветовая система"
        description="Холодная бумажная база, ink accent, без фиолетовых AI-градиентов. Только светлая тема."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Background", "bg-background", "text-foreground"],
            ["Surface", "bg-surface", "text-foreground"],
            ["Accent", "bg-accent", "text-inverse"],
            ["Muted", "bg-surface-muted", "text-foreground"],
            ["Danger", "bg-danger", "text-inverse"],
            ["Success", "bg-success", "text-inverse"],
            ["Warning", "bg-warning-bg", "text-warning"],
            ["Border", "bg-border", "text-foreground"],
          ].map(([name, bg, fg]) => (
            <div key={name} className={`border-border border p-4 ${bg} ${fg}`}>
              <p className="text-sm font-medium">{name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Controls"
        title="Кнопки"
        description="Варианты, размеры и состояния: default, hover, focus-visible, active, disabled, loading."
      >
        <Stack gap="lg">
          <Stack direction="horizontal" gap="md">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </Stack>
          <Stack direction="horizontal" gap="md">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="sm" aria-label="Далее">
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </Stack>
          <Stack direction="horizontal" gap="md">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>
              Disabled secondary
            </Button>
          </Stack>
        </Stack>
      </Section>

      <Section eyebrow="Forms" title="Поля, подписи, выбор">
        <div className="grid gap-6 md:grid-cols-2">
          <Stack gap="sm">
            <Label htmlFor="email" required>
              Email
            </Label>
            <Input id="email" type="email" placeholder="hello@designatlas.dev" />
          </Stack>
          <Stack gap="sm">
            <Label htmlFor="search">Поиск</Label>
            <div className="relative">
              <Search
                className="text-muted pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                aria-hidden
              />
              <Input id="search" className="pl-10" placeholder="Стиль, компонент, термин" />
            </div>
          </Stack>
          <Stack gap="sm" className="md:col-span-2">
            <Label htmlFor="notes">Заметка</Label>
            <Textarea id="notes" placeholder="Короткое редакционное описание" />
          </Stack>
          <Stack gap="sm">
            <Label htmlFor="broken">Ошибка валидации</Label>
            <Input
              id="broken"
              invalid
              defaultValue="некорректное значение"
              errorMessage="Проверьте формат поля"
            />
          </Stack>
          <Stack gap="sm">
            <Label htmlFor="readonly-field">Только чтение</Label>
            <Input id="readonly-field" readOnly defaultValue="нельзя изменить" />
          </Stack>
          <Stack gap="sm">
            <Label htmlFor="disabled-field" disabled>
              Недоступно
            </Label>
            <Input id="disabled-field" disabled placeholder="disabled" />
          </Stack>
          <Stack gap="sm">
            <Label htmlFor="style-select">Стиль (select)</Label>
            <Select id="style-select" defaultValue="swiss">
              <option value="swiss">Swiss International</option>
              <option value="scandi">Scandi Calm</option>
            </Select>
          </Stack>
          <div className="md:col-span-2">
            <ChoiceDemo />
          </div>
          <div className="md:col-span-2">
            <SwitchDemo />
          </div>
        </div>
      </Section>

      <Section eyebrow="Navigation" title="Ссылки, вкладки, подсказки, диалог">
        <Stack gap="xl">
          <Stack direction="horizontal" gap="md">
            <Link href="/studio">Студия (underline)</Link>
            <Link href="/cards" variant="subtle">
              Карточки (subtle)
            </Link>
          </Stack>
          <TabsDemo />
          <OverlayDemo />
          <DialogDemo />
        </Stack>
      </Section>

      <Section eyebrow="Feedback" title="Состояния и бейджи">
        <Stack gap="lg">
          <Stack direction="horizontal" gap="sm">
            <Badge>neutral</Badge>
            <Badge tone="accent">accent</Badge>
            <Badge tone="success">success</Badge>
            <Badge tone="warning">warning</Badge>
            <Badge tone="danger">danger</Badge>
          </Stack>
          <div className="grid gap-4 lg:grid-cols-2">
            <Alert title="Информация">Оболочка показывает примитивы и состояния.</Alert>
            <Alert tone="success" title="Успех">
              Токены подключены через CSS variables.
            </Alert>
            <Alert tone="warning" title="Внимание">
              Не смешивать токены оболочки с токенами каталожных стилей и темы vaybik.
            </Alert>
            <Alert tone="danger" title="Ошибка">
              Контент без валидации схем публиковать нельзя.
            </Alert>
          </div>
        </Stack>
      </Section>

      <Section eyebrow="Surfaces" title="Карточки, таблица, empty state, разделитель">
        <Stack gap="xl">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="space-y-3">
              <Badge tone="accent">feature</Badge>
              <h3 className="font-serif text-2xl tracking-tight">Редакционная плотность</h3>
              <p className="text-muted text-sm">
                Карточки только там, где нужна отдельная единица.
              </p>
            </Card>
            <Card className="space-y-3">
              <Badge>system</Badge>
              <h3 className="font-serif text-2xl tracking-tight">Токены как SSOT</h3>
              <p className="text-muted text-sm">
                `design/system/tokens.json` — источник истины для оболочки.
              </p>
            </Card>
            <Card interactive className="space-y-3">
              <Badge tone="success">a11y</Badge>
              <h3 className="font-serif text-2xl tracking-tight">Focus first</h3>
              <p className="text-muted text-sm">
                Видимый focus ring, skip link, не меньше 28px у Hint.
              </p>
            </Card>
          </div>

          <Table>
            <THead>
              <TR>
                <TH>Токен</TH>
                <TH>Категория</TH>
                <TH>Назначение</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD className="font-mono text-xs">color.accent</TD>
                <TD>color</TD>
                <TD>Основной акцент оболочки</TD>
              </TR>
              <TR>
                <TD className="font-mono text-xs">font.family.serif</TD>
                <TD>typography</TD>
                <TD>Заголовки editorial shell</TD>
              </TR>
              <TR>
                <TD className="font-mono text-xs">icon.md</TD>
                <TD>icon</TD>
                <TD>Базовый размер иконки (20px)</TD>
              </TR>
            </TBody>
          </Table>

          <EmptyState
            title="Пустой список — пример состояния"
            description="Витрина оболочки. Живой каталог из 24 стилей открывается в Студии, а не на этой странице."
            action={
              <Button variant="secondary">
                <Check className="size-4" aria-hidden />
                Пример действия
              </Button>
            }
          />
          <Divider />
        </Stack>
      </Section>

      <Section>
        <p className="text-muted text-sm">
          Спеки компонентов: <code className="font-mono">design/components/</code>. Каталог для
          агентов: <code className="font-mono">design/components/catalog.json</code>.
        </p>
      </Section>
    </main>
  );
}
