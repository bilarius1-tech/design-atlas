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
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Textarea,
} from "@/components/ui";
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
          <p className="text-muted text-xs font-semibold tracking-[0.14em] uppercase">
            App Shell · PHASE 2
          </p>
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Дизайн-система</h1>
          <p className="text-muted max-w-2xl text-lg">
            Нейтральная редакционная оболочка продукта. Это не один из каталожных стилей — каталог
            будет жить внутри этой оболочки.
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
        description="Холодная бумажная база, ink accent, без фиолетовых AI-градиентов."
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

      <Section eyebrow="Controls" title="Кнопки и формы">
        <Stack gap="xl">
          <Stack direction="horizontal" gap="md">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button size="sm" aria-label="Далее">
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </Stack>

          <div className="grid gap-6 md:grid-cols-2">
            <Stack gap="sm">
              <Label htmlFor="email">Email</Label>
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
              <Input id="broken" invalid defaultValue="некорректное значение" />
            </Stack>
          </div>
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
            <Alert title="Информация">Оболочка готова принимать каталог стилей.</Alert>
            <Alert tone="success" title="Успех">
              Токены подключены через CSS variables.
            </Alert>
            <Alert tone="warning" title="Внимание">
              Не смешивать токены оболочки с токенами каталожных стилей.
            </Alert>
            <Alert tone="danger" title="Ошибка">
              Контент без валидации схем публиковать нельзя.
            </Alert>
          </div>
        </Stack>
      </Section>

      <Section eyebrow="Surfaces" title="Карточки, таблица, empty state">
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
            <Card className="space-y-3">
              <Badge tone="success">a11y</Badge>
              <h3 className="font-serif text-2xl tracking-tight">Focus first</h3>
              <p className="text-muted text-sm">Видимый focus ring и skip link в layout.</p>
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
                <TD className="font-mono text-xs">size.container</TD>
                <TD>layout</TD>
                <TD>Ширина основного контейнера</TD>
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
        </Stack>
      </Section>

      <Section>
        <Divider className="mb-8" />
        <p className="text-muted text-sm">
          Оболочка продукта и витрина примитивов. Каталог стилей, Студия и карточки уже в
          продакшене. Цвета Вайбика сюда не подмешиваются — это отдельная тема для агентов.
        </p>
      </Section>
    </main>
  );
}
