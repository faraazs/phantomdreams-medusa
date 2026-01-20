# Storefront Styling Guide

This storefront uses Tailwind CSS (v3) with the Medusa UI preset. Most styling
should be done with Tailwind utility classes in JSX. Global styles are kept
small and live in `src/styles/globals.css`, which is imported once in
`src/app/layout.tsx`.

## Current setup

- Tailwind config: `tailwind.config.js`
  - Uses `@medusajs/ui-preset` and a `theme.extend` section for local tokens.
- Global styles: `src/styles/globals.css`
  - Uses `@layer utilities` and `@layer components`.
  - Defines helpers like `.no-scrollbar` and shared classes like
    `.content-container` and `text-*-*` typography utilities.
- Class composition: use `clx` from `@medusajs/ui` for conditional classes.

## Principles

- Prefer utility classes in components for most styling.
- Keep global CSS focused on shared, reusable patterns.
- Extend the Tailwind theme for tokens instead of hard-coded values.
- Use `@layer` to keep the cascade predictable:
  - `base`: element defaults (lowest priority)
  - `components`: reusable class-based patterns
  - `utilities`: single-purpose helpers (highest priority)

## What goes where

### 1) Tailwind theme (tokens)

Use `tailwind.config.js` for design tokens that should be reused across the
codebase (colors, spacing, fonts, radii, sizes, keyframes).

Good examples (already present):
- `colors.grey.*`
- `fontFamily.sans`
- `borderRadius.*`

Guidelines:
- Prefer semantic naming for new tokens (e.g. `brand`, `surface`, `text-subtle`)
  instead of raw hex values in components.
- Use arbitrary values (e.g. `top-[13px]`) only for one-off exceptions.

### 2) Global CSS (`src/styles/globals.css`)

Use global CSS only for:
- Base element defaults and global resets (`@layer base`)
- Reusable component classes used in many places (`@layer components`)
- Small, single-purpose helpers (`@layer utilities`)

If you need a global font baseline, add it to `@layer base`:

```css
@layer base {
  body {
    @apply font-sans text-ui-fg-base bg-ui-bg-base;
  }
}
```

Keep these rules minimal to avoid global side effects.

### 3) Component styling (preferred)

Use Tailwind utility classes directly in JSX:

- For conditional styling: `clx(...)`
- For repeated patterns: extract a React component or create a class in
  `@layer components`

Avoid CSS Modules unless a specific layout or complex selector cannot be
expressed with utilities.

## Typography conventions (two systems in use)

This codebase currently uses two typography systems:

1) **Medusa UI preset classes**: `txt-*` + color tokens like `text-ui-fg-*`
   - Example: `className="txt-small-plus text-ui-fg-base"`
   - Best for consistent UI text aligned with the Medusa preset scale.

2) **Custom storefront classes** in `globals.css`: `text-*-*`
   - Example: `className="text-small-regular"`
   - Best for storefront-specific typography not covered by the preset.

Guidance:
- Use one system per component to avoid inconsistent typography.
- Prefer `txt-*` when it fits the design; use `text-*-*` when you need the
  custom scale already defined in `globals.css`.
- If you add new `text-*-*` utilities, define them in `@layer components`
  alongside the existing ones.

## Extending or customizing styling

1) **Add or update tokens** in `tailwind.config.js`.
2) **Use utilities** in components.
3) **Promote repeated patterns** to:
   - A shared React component, or
   - A class in `@layer components` with `@apply`.

## Keep the codebase clean

- Do not add new global selectors unless the style is truly global.
- Avoid duplicated class strings by extracting components.
- Prefer tokens over raw values and limit arbitrary values.
- Keep `globals.css` short and intentional; it should not grow into a dumping
  ground for component styles.
