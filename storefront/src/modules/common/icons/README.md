# Icon Management

This storefront standardizes on `@medusajs/icons` for UI icons.

## Standard approach

- Use `@medusajs/icons` in UI components.
- Icons inherit `currentColor`, so control color with text classes.
- Prefer `className` for size (e.g. `w-5 h-5`) to match Tailwind patterns.
- Add accessible labels for icon-only controls:
  - `aria-label` on the clickable element, or
  - a `.sr-only` text label inside the element.

Example:

```tsx
import { ShoppingBag } from "@medusajs/icons"

<button aria-label="Cart">
  <ShoppingBag className="w-5 h-5" />
  <span className="sr-only">Cart</span>
</button>
```

## When to add a custom icon

Only create a custom icon in `src/modules/common/icons` if:

- The icon does not exist in `@medusajs/icons`, and
- The icon is used in more than one place.

Custom icons should follow the existing pattern:

- Accept `IconProps` from `src/types/icon`.
- Default to `size=16` and `color="currentColor"`.

## Changing the icon library later

If you want to switch away from `@medusajs/icons`:

1. Update `package.json` dependencies.
2. Replace imports across the codebase (search for `@medusajs/icons`).
3. Ensure the new library supports `currentColor` and sizing via `className`
   or add a wrapper component in `src/modules/common/icons`.
4. Re-check icon-only buttons for accessibility labels.
