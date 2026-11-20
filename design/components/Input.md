# Input

## Anatomy

Native `<input>` with optional `errorMessage` text bound via `aria-describedby`.

## States

default · hover · focus-visible (кольцо + акцент рамки) · disabled · readonly · invalid

## Tokens

`color.border`, `color.accent`, `color.danger`, `radius.md`, `size.controlMd`

## A11y

- `aria-invalid` when `invalid`
- Error text is associated with the field
- Visible focus ring
