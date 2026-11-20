# Dialog

Native `<dialog>` modal. Props: `open`, `onClose`, `title`, optional `description`.

## States

open · closed. Close control: default · hover · focus-visible.

## A11y

- `aria-labelledby` / `aria-describedby`
- Escape and backdrop click call `onClose`
- Close button has an accessible name
