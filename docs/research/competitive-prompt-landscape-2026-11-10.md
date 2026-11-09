# Competitive landscape · prompt / design-system handoff

**Status:** FROZEN · 2026-11-10  
**Date:** 2026-11-10  
**Scope:** GitHub + product refs in Atlas niche; **structural** learnings only.  
**Ban:** do not copy DesignPrompts (or others) code, copy, style names, graphics, or prompts verbatim — product reference only ([ESSENCE](../ESSENCE.md)).

### Freeze verdict

Atlas остаётся **curated style library + dual handoff (build elsewhere)**.  
Следующий код-тикет (только после freeze): **Studio prompt composer v1** — §8.  
Новые конкурентные URL в этот документ не добавляем без новой даты/`-addendum`.

## Atlas position (baseline)

| Axis | Design Atlas today |
|------|--------------------|
| Job | Visual style library + **dual** handoff (Agent + Constructor, RU+EN) → build **elsewhere** |
| Loop | Template × Style → live preview → prompt / Design Pack |
| Not | Page constructor, block builder, encyclopedia course |
| Prompt | Static authored `prompt.{ru,en}.md` + `prompt.constructor.*`; modal shows text + copy + ZIP |

---

## Map of players

| Player | What it is | Closest Atlas overlap | Differentiator vs Atlas |
|--------|------------|----------------------|-------------------------|
| [designprompts.dev](https://designprompts.dev/) | Template × Look → Builder → **assembled** agent prompt; Pro = React kits / Systems | Same core loop (preview → prompt) | Free path is a **page planner**; ~5k-token modular prompt; no constructor surface; Pro ships code |
| [vibeprompts.dev](https://vibeprompts.dev/) | **286 section** layout prompts + live preview + Tailwind source | Copy-prompt UX; section taxonomy | **Layout atoms**, not visual systems; Tailwind-first; no style tokens / dual handoff |
| [ui.shadcn.com](https://ui.shadcn.com/) | Ownable component foundation + registry + **MCP/Skills** | Agent-consumable install path | Not a style gallery; theming via CSS vars; install files into *your* repo |
| [shipper.now](https://shipper.now/) | Prompt-to-**full app** builder (host, publish, iterate in-chat) | End destination for some vibe builders | **Builds inside** the product — opposite of Atlas “build elsewhere” |
| [uidrop.site](https://uidrop.site/) | Chrome ext: extract live DS → brief / skill.md → AI chat | Token packet + one-click send to agents | Scrapes **existing sites**; Atlas authors **original** curated systems |
| [rampstack.co/skills](https://rampstack.co/skills) | 103 Claude Skills catalog (brand → design → ship) | Skill packaging / workflows for agents | Meta-workflows, not a visual style Studio |
| [StyleKit](https://github.com/AnxForever/stylekit) | 149 styles + tokens + prompts + MCP/skills + `llms.txt` | Style catalog + agent packaging | Volume / theme install; risk of “many skins” without curated fidelity |
| [Nadiyq/DLS-Lead](https://github.com/Nadiyq/DLS-Lead) | DTCG tokens + specs + copy-paste agent prompts (npm) | Pack contents for agents | One SaaS DS, not multi-style compare |
| [google-labs-code/design.md](https://github.com/google-labs-code/design.md) | `DESIGN.md` format + lint/export (Tailwind/DTCG/css-vars) | Our DESIGN.md / export story | Spec/tooling, not a library UX |
| [petergoldstein/ux-ui-agent-skills](https://github.com/petergoldstein/ux-ui-agent-skills) | Skills kit + archetypes + anti-slop | Quality gates for agents | Meta-toolkit, not product Studio |
| [GGPrompts](https://github.com/GGPrompts/ggprompts) | 200+ self-contained CSS style HTML files | “Point agent at a file” | No Template×Style product; gallery of CSS demos |
| [slevomat/minis-design-system](https://github.com/slevomat/minis-design-system) | Lit DS + `docs/ai-prompts/` | AI-ready docs beside tokens | Single system |
| CSS Zen Garden | Same HTML, many CSS | Philosophical ancestor of “same content, different look” | No AI prompts |

---

## 1. DesignPrompts — how the prompt is formed

Observed on Start → **Get prompt** (SaaS launch × Default look), public docs, and UI:

### Pipeline

```
Page template + Look (Preset)
        ↓
Preview (Desktop/Mobile)
        ↓
Get prompt  →  assemble modular text
        ↓
Optional: Edit in Builder (blocks / layouts / style knobs)
        ↓
User fills Product + Page brief
        ↓
Copy prompt  (+ Open in ChatGPT / Claude)
```

### Prompt is a **composer**, not a static file

Outline chips jump to sections (~20–23k chars / ~5–5.7k tokens for default SaaS):

| Module | Role |
|--------|------|
| Role | Goal framing (new page / add to site / redesign) |
| Reference sketch | URL to Builder preview encoding page state |
| Authority | Conflict resolution / what is instruction vs evidence |
| Product info | From Product + Page brief fields |
| Design method | Harness vs external skills (TasteSkill, Anthropic Frontend Design) |
| Creativity | Bold vs Balanced |
| Build approach | Image-first / build directly / HTML prototype |
| Approval checkpoints | First screen / none / each step |
| Extra skills | Optional skill toggles |
| The page | Section plan + look instructions |

### User knobs before copy

- Build goal: New page | Add to a site | Redesign  
- Checkbox: persist rules into `DESIGN.md`  
- Product name + Page brief (facts, tone, required content)  
- Design method / creativity / build approach / checkpoints / extra skills  

### Product layers (not one surface)

1. **Free:** Start + Builder → prompt only (agent builds in *your* project).  
2. **Pro LandingKit:** install styled React blocks (shadcn-registry style).  
3. **Pro Systems:** full page + `DESIGN.md` + prompts + skills + `PROOF.md`.

### Take for Atlas (structure only)

- Prompt = **assembled packet**: style rules + page/template plan + **user brief** + agent process knobs.  
- Show **size / token estimate** in the modal.  
- Outline / jump links for long prompts.  
- Explicit “write DESIGN.md” handoff instruction (we already export DESIGN.md — reinforce in Agent prompt).  
- Deep-link helpers (ChatGPT/Claude) are optional polish.  

### Do **not** take

- Full block Builder as primary product (violates ESSENCE).  
- Copying harness prose, style names, or sketch URL format.  
- Collapsing Constructor surface — DP is agent-centric; Atlas dual handoff is our wedge.

---

## 2. VibePrompt (vibeprompts.dev)

### Model

- **286** prompts in **15** section categories (Auth, Pricing, Hero, Dashboard, …).  
- Browse → **live preview** (Full/Tablet/Mobile) → **View code & prompt**.  
- Modal tabs: **Prompt | Tailwind** + Copy.  
- Prompt shape: short, dense **layout brief** (structure, widths, breakpoints, states) aimed at Tailwind markup — not a visual identity system.  
- Example anatomy (auth split-screen): full-height split; left login card ~360px; fields/CTA/OAuth; right brand panel with testimonial; hide panel below `lg`; `rounded-xl`, focus rings.

### Useful for Atlas

| Idea | Why | Fit |
|------|-----|-----|
| Section taxonomy as **template vocabulary** | Heroes / pricing / FAQ… as named building blocks in *template* content | R3 templates — describe sections crisply in template JSON + constructor prompts |
| Prompt + **finished artifact** side-by-side | Prompt tab + code/snippet tab | Agent vs Constructor already; optional “tokens / DESIGN.md excerpt” tab later |
| Extremely concrete layout language | Widths, breakpoints, states in prompt | Raise Constructor prompt specificity without becoming a block editor |
| Search + category counts | Library discoverability | When style/template count grows |

### Not useful / avoid

- Becoming a **section prompt dump** without style systems (commodity vibe-coding library).  
- Tailwind-only lock-in for Agent path (Atlas stays stack-agnostic in Agent prompts; Constructor can stay more concrete).  
- Monochrome “AI default” look as product brand.

---

## 3. shadcn/ui (ui.shadcn.com)

### Model

- **Ownable** components: CLI copies source into the project (not a black-box npm UI kit).  
- **Registry namespaces** (`@shadcn/...`, third-party registries).  
- **MCP**: agents search/browse/install from registries.  
- **Skills**: project-aware context via `components.json` + `shadcn info`.  
- Theming: CSS variables / OKLCH; themes as registry items.

### Useful for Atlas

| Idea | Why | Fit |
|------|-----|-----|
| Pack as **installable artifacts** agents can pull | Free/Full Design Pack already ZIP; registry/MCP is a future delivery channel | Post-R1 commerce / distribution ADR — not today |
| Agent instructions: “read config, then install/reuse” | DP and shadcn both push “use files, don’t reinvent” | Strengthen Agent prompt: prefer tokens + DESIGN.md over inventing a palette |
| Clear separation: foundation vs look | shadcn = primitives; Atlas = **look systems** that can *sit on* any foundation | Messaging: Atlas styles guide agents whether or not the project uses shadcn |

### Not useful / avoid

- Replacing Atlas with a shadcn clone.  
- Shipping a competing component registry before ESSENCE loop is sharp.  
- MCP server before we have stable public pack contracts.

---

## 4. Shipper.now

### Model

- **Prompt → live product** inside Shipper: chat describes app/site → agentic builder → visual edit → one-click publish/host.  
- Templates + remix; “Advanced Design” (image URL → match aesthetic — layout/palette/type).  
- Advisor as co-founder (conversion/UX/market suggestions).  
- Credits subscription; export code optional, but primary loop is **build & host here**.

### Useful for Atlas

| Idea | Why | Fit |
|------|-----|-----|
| Clarity of **destination** | Shipper owns “build here”; Atlas owns “choose system → hand off” | Strengthen Studio copy: Atlas stops at prompt/pack |
| Image / reference as style seed | Advanced Design from image | Future: optional “reference screenshot” in brief (user-supplied), not scrape |
| Template remix language | Start from known structure | Already Template × Style — keep |

### Not useful / avoid

- Becoming an in-product app builder / hosting.  
- “Clone companies” / clone competitor apps positioning (IP/ethics + ESSENCE).  
- Competing on Advisor/business co-pilot.

---

## 5. UIDrop (uidrop.site)

### Model

- Chrome extension: **snap** live DOM → design schema (colors, type, spacing, radius, shadows, components, vibe, dark/light).  
- Outputs: **Brief** (NL prompt) and/or **Skill Markdown** (tables, `:root` CSS, component specs) + screenshot.  
- One-click send to Claude / ChatGPT / Gemini / Cursor / Lovable / Manus (or clipboard).  
- Snap Library; **Design Merge** (hero from A + nav from B + buttons from C → combined prompt); export Figma / CSS vars / Tailwind / shadcn theme.  
- Free snap; Pro ~$3 one-time for library/merge/exports.

### Useful for Atlas

| Idea | Why | Fit |
|------|-----|-----|
| Dual packet: **Brief + Skill.md** | Same split as Agent (narrative) vs machine-readable tokens | Align Agent prompt vs `tokens.json` / DESIGN.md / future skill in pack |
| One-click **open in Cursor / Claude** with context | Reduces paste friction | Optional deep-links after copy (like DP) |
| Explicit “original interface, don’t clone brand” in merge prompts | Legal/ethics framing | Keep in our Agent checklist |
| Export matrix (CSS / Tailwind / shadcn) | Multi-format handoff | Already Free/Full pack story — make surfaces clearer in modal |
| Contrast / light-dark detection messaging | Quality signal | `PROOF`-style notes later |

### Not useful / avoid

- Building a **scraper** of third-party sites as core Atlas value (rights, fidelity, “reference ≠ copy”).  
- Merge of stolen brand fragments as a feature.  
- Positioning as “make me Stripe” — Atlas sells **authored** systems.

### Positioning note

UIDrop feeds agents from **the wild web**. Atlas feeds agents from a **curated library + dual constructor path**. Complementary in the ecosystem; do not merge product jobs.

---

## 6. RampStack Skills (rampstack.co/skills)

### Model

- Catalog of **~103 Claude Skills** across brand, content, design, SEO, growth, ops…  
- Each skill: when to use / inputs / steps / failure patterns / artifact.  
- Design cluster (high relevance): `creative-direction`, `brand-identity`, `design-system` (5 layers: foundations → governance), `design-standards` (6 standards: tokens, contrast, hierarchy, spacing, mobile, consistency + pre-ship checklist), `art-direction`, etc.  
- Install via Claude plugin marketplace (`rampstackco/claude-skills`); stack-agnostic.  
- Skill Selector / Scaffolder as meta tools.

### Useful for Atlas

| Idea | Why | Fit |
|------|-----|-----|
| Skill = **workflow contract** | Triggers, bans, failure patterns, output format | Per-style export skill: adopt / build page / review against tokens |
| Separate **build system** vs **apply standards** | `design-system` ≠ `design-standards` | Atlas: style authoring docs vs agent “apply this style” prompt |
| Pre-ship checklist as agent gate | Contrast, mobile, hierarchy | Fold short checklist into Agent prompt + Full pack |
| Failure patterns list | Anti-slop / anti-drift | Strengthen bans already in prompts |

### Not useful / avoid

- Absorbing a 100-skill catalog into Atlas (encyclopedia creep).  
- Replacing Studio with a skills marketplace.  
- Copying RampStack skill prose.

---

## 7. Prioritized takeaways for Atlas

### Take soon (high leverage, ESSENCE-safe)

1. **Prompt composer (lite)** — Template outline + Style rules + optional Product brief + handoff checklist (not a block builder / not Shipper).  
2. **Modal outline + char/token estimate**.  
3. **Process knobs (minimal)** — approval / fidelity-to-preview (2–3 options).  
4. **Handoff checklist** — read DESIGN.md + tokens; no invented hex; replace demo facts; **do not clone third-party brands**.  
5. **Constructor specificity** — VibePrompt-style layout anatomy in constructor prompts.  
6. **Dual packet clarity in UI** — “Agent prompt” vs “files for agent” (ZIP / tokens) like UIDrop Brief vs Skill.md.

### Take later

7. Deep-link “Open in Cursor / Claude” after copy.  
8. Per-style **Skill.md** in Design Pack (RampStack-shaped contract: triggers, steps, failure patterns).  
9. `llms.txt` index; optional MCP/registry delivery (shadcn-shaped).  
10. `PROOF` / pre-ship notes in Full pack.  
11. Optional user-uploaded **reference screenshot** in brief (Shipper Advanced Design idea — user-owned assets only).

### Explicitly defer / reject

- In-app app builder / hosting (Shipper territory).  
- Site design-system scraper as core feature (UIDrop territory; rights risk).  
- Page block Builder as primary product (DP Builder).  
- Mass style/skill catalogs before quality bar.  
- Copying DP / UIDrop / RampStack text or brand extraction of named products.

---

## 8. Locked next ticket · R2.7 Prompt composer v1

Tracked in [ROADMAP R2.7](../ROADMAP.md).

| | |
|--|--|
| **Title** | Studio prompt composer v1 — brief + template outline + outline chips |
| **In** | Product name + short page brief (client-only); assemble Agent: `[Role] + [Style prompt] + [Template section outline] + [User brief] + [Handoff checklist]`; modal jump chips + char estimate; “build elsewhere” line |
| **Out** | Block Builder, MCP, scrape (UIDrop), new styles, live tweaks, Shipper publish |
| **AC** | (1) Brief fields change assembled Agent text live (2) Constructor path unchanged or lightly wrapped with checklist only (3) Outline chips scroll/highlight sections (4) Char count visible (5) lint/tsc/test green |

Implementation starts only after this freeze is acknowledged — no further competitor URLs in this file.

---

## Ecosystem map (one glance)

```
Curated style library + dual handoff     →  Design Atlas (us)
Page plan → assembled agent prompt       →  DesignPrompts
Section layout prompts + Tailwind        →  VibePrompt
Extract wild-site DS → AI                →  UIDrop
Ownable components + MCP                 →  shadcn/ui
Chat → build & host full app             →  Shipper
Agent workflow skills catalog            →  RampStack
Token/spec packages                      →  DLS-Lead, DESIGN.md tooling
```

---

## Sources (fetched / browsed)

- https://designprompts.dev/ (+ Get prompt UI)  
- https://designprompts.dev/blog/designprompts-3-visual-page-builder  
- https://designprompts.dev/blog/how-to-give-claude-code-codex-or-cursor-a-landing-page-design  
- https://designprompts.dev/blog/what-is-in-a-designprompts-system  
- https://vibeprompts.dev/ (+ `/auth/auth-split-screen-with-visual/` prompt modal)  
- https://ui.shadcn.com/docs/mcp , `/docs/skills`  
- https://shipper.now/ , https://shipper.now/start/  
- https://uidrop.site/ (+ Chrome store / DeepWiki schema notes)  
- https://rampstack.co/skills (+ `design-standards` / `design-system` SKILL.md on GitHub)  
- GitHub READMEs: StyleKit, DLS-Lead, design.md, ux-ui-agent-skills, GGPrompts, rampstackco/claude-skills  

