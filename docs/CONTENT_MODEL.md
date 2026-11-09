# CONTENT MODEL

Canonical product direction: [PRODUCT.md](PRODUCT.md), [ADR-0009](decisions/ADR-0009-template-style-preview-prompt.md).

## Principles

- Stable `id` (kebab-case, ASCII, language-independent).
- Display names live in fields / Markdown — never in the id.
- Style data contains no React/JSX.
- Style tokens live at `content/styles/<id>/tokens.json`.
- **Templates and styles are separate.** Do not bind page structure exclusively inside a style forever (`demo.json` is interim).

## Language

- Template / demo sample copy: **Russian**
- Prompts: agent **`prompt.ru.md` / `prompt.en.md`** and constructor **`prompt.constructor.ru.md` / `prompt.constructor.en.md`** (all required for published styles; [ADR-0011](decisions/ADR-0011-dual-prompt-surfaces.md))
- Technical documentation: **English**

## Tree (target)

```
content/
├── index.json
├── styles/
│   └── <id>/
│       ├── style.json
│       ├── tokens.json
│       ├── typography.json
│       ├── components.json
│       ├── demo.json              # INTERIM — migrate to templates (R1/R3)
│       ├── rules.md
│       ├── prompt.ru.md           # required (agent)
│       ├── prompt.en.md           # required (agent)
│       ├── prompt.constructor.ru.md  # required (constructor)
│       ├── prompt.constructor.en.md  # required (constructor)
│       ├── DESIGN.md
│       ├── TOKENS.md
│       ├── AGENT-INSTRUCTIONS.md
│       ├── CHANGELOG.md
│       └── assets/
├── templates/                     # NEW (R1+)
│   └── <id>/                      # e.g. saas-landing, product-catalog, corporate-blog
│       ├── template.json          # structure + meta
│       └── content.ru.json        # neutral demo copy (RU)
├── glossary/
└── categories/ | collections/     # later
```

## Lifecycle (styles)

1. `draft` — at least `style.json` + `tokens.json`
2. `review` — full JSON + markdown set
3. `published` — `pnpm content:validate` clean; public library
4. `archived` — kept in Git, hidden from public index

## Relations

```
content/index.json ──► content/styles/<id>/
style.json.id === folder name === tokens.meta.styleId

Preview (target) = render(templateId, styleId)
```

## Agent rules

- Do not create parallel ids for one entity.
- Do not translate id/slug.
- New style: folder + `content/index.json` entry + `pnpm content:validate`.
- `swiss-international` is the published editorial reference; R2 also ships `midnight-console` and `poster-brutal` for Same Content / Different Looks.
- Until templates land: `demo.json.compositionId` selects layout; section order comes from `sections`.
- Do not copy third-party closed content; open repos (e.g. design-prompts) are inspiration only — cite, do not paste wholesale.

Field details: [DATA_CONTRACTS.md](DATA_CONTRACTS.md).
