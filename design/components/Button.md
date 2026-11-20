# Button

## Anatomy

Native `<button>` with label and optional leading/trailing icon.

## Variants

`primary` · `secondary` · `tertiary` · `ghost` · `danger`

## Sizes

`sm` · `md` · `lg`

## States

default · hover · focus-visible · active · disabled · loading (`aria-busy`, spinner, label «Загрузка»)

## Tokens

`color.accent`, `color.fgInverse`, `color.border`, `radius.md`, `motion.normal`

## A11y

- Always a real button (or link with `buttonClassName` for navigation)
- Visible focus ring
- Loading exposes `aria-busy` and screen-reader text

Loading keeps the button width (children stay in layout, visually hidden) and shows a spinner.
