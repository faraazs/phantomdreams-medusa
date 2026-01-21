# Common Components Library

This directory contains the common, reusable components for the Phantom Dreams storefront, migrated from Medusa UI to **shadcn/ui** with standardized naming conventions.

## Table of Contents

- [Overview](#overview)
- [Naming Convention](#naming-convention)
- [Component Catalog](#component-catalog)
- [Usage Examples](#usage-examples)
- [Migration Guide](#migration-guide)
- [Accessibility Guidelines](#accessibility-guidelines)
- [Performance Best Practices](#performance-best-practices)
- [TypeScript Patterns](#typescript-patterns)

---

## Overview

All primitive-based components follow a standardized naming convention with the primitive suffix (e.g., `-button`, `-input`, `-modal`). This makes it immediately clear what HTML primitive or UI pattern the component is based on.

**Migration Status:** Phase 1 Complete
- ✅ 9 primitive components migrated to shadcn/ui
- ✅ 5 domain-specific components retained
- ⏳ Phase 2: Migrate remaining 73+ files across account, cart, checkout, and product modules

---

## Naming Convention

### Format

```
ComponentName-primitive
```

### Examples

- `Input` - Text input component (primitive: `<input>`)
- `Checkbox` - Checkbox component (primitive: `<input type="checkbox">`)
- `Modal` - Modal dialog (primitive: dialog)
- `DeleteButton` - Button for deleting items (primitive: `<button>`)
- `Divider` - Visual separator (primitive: separator/hr)

### Why This Convention?

1. **Clarity**: Immediately understand the base primitive
2. **Consistency**: All components follow the same pattern
3. **Discoverability**: Easy to find related components
4. **Documentation**: Self-documenting component names

---

## Component Catalog

### Primitive Components (shadcn-based)

#### Input (`input-input`)

**Primitive:** `<input>`

**Features:**
- Floating label animation
- Password toggle with eye icon
- Validation support
- Auto-focus capability
- Keyboard accessible

**Props:**
- `label` (string, required): Label text
- `name` (string, required): Input name
- `type` (string): Input type (text, email, password, etc.)
- `required` (boolean): Whether the field is required
- `topLabel` (string, optional): Additional label above input
- `data-testid` (string, optional): Test identifier

**Accessibility:**
- ARIA labels for screen readers
- Focus management
- Required field indicator

---

#### Checkbox (`checkbox-checkbox`)

**Primitive:** `<input type="checkbox">` + Radix UI

**Features:**
- Custom styled checkbox
- Label integration
- Disabled state
- Controlled/uncontrolled modes

**Props:**
- `label` (string, required): Checkbox label
- `checked` (boolean): Controlled checked state
- `onChange` (function): Change handler
- `name` (string, optional): Input name
- `disabled` (boolean): Disabled state
- `data-testid` (string, optional): Test identifier

**Accessibility:**
- Proper ARIA attributes
- Keyboard navigation (Space to toggle)
- Focus indicators

---

#### Modal (`modal-modal`)

**Primitive:** `dialog` (Radix UI Dialog)

**Features:**
- Three sizes (small, medium, large)
- Search mode (transparent background)
- Compound components (Title, Description, Body, Footer)
- Auto focus management
- Escape key to close

**Props:**
- `isOpen` (boolean, required): Open state
- `close` (function, required): Close handler
- `size` ("small" | "medium" | "large"): Modal size
- `search` (boolean): Search mode
- `data-testid` (string, optional): Test identifier

**Sub-components:**
- `Modal.Title`: Modal title
- `Modal.Description`: Modal description
- `Modal.Body`: Modal body content
- `Modal.Footer`: Modal footer actions

**Accessibility:**
- Focus trap when open
- Escape key closes
- Click outside closes
- ARIA dialog role

---

#### DeleteButton (`delete-button-button`)

**Primitive:** `<button>`

**Features:**
- Loading state with spinner
- Trash icon
- Cart mutation hook integration
- Keyboard accessible

**Props:**
- `id` (string, required): Line item ID to delete
- `children` (ReactNode, optional): Button text
- `className` (string, optional): Additional classes
- `data-testid` (string, optional): Test identifier

**Accessibility:**
- ARIA labels
- ARIA busy state during loading
- Disabled state during mutation
- Keyboard navigation

---

#### Radio (`radio-radio`)

**Primitive:** `<input type="radio">`

**Features:**
- Custom styled radio button
- Checked state animation
- Disabled state
- Focus indicators

**Props:**
- `checked` (boolean, required): Checked state
- `onChange` (function, optional): Change handler
- `name` (string, optional): Input name
- `value` (string, optional): Input value
- `disabled` (boolean): Disabled state
- `data-testid` (string, optional): Test identifier

**Accessibility:**
- ARIA role="radio"
- ARIA checked state
- Keyboard navigation

---

#### Select (`select-select`)

**Primitive:** `<select>`

**Features:**
- Native select with custom styling
- Placeholder support
- Chevron icon indicator
- Hover states

**Props:**
- `placeholder` (string): Placeholder text
- `defaultValue` (string): Default selected value
- `children` (ReactNode): `<option>` elements
- `data-testid` (string, optional): Test identifier
- All standard HTML select attributes

**Accessibility:**
- ARIA labels
- Focus indicators
- Keyboard navigation

---

#### FilterRadioGroup (`filter-radio-group-radio`)

**Primitive:** Radio group

**Features:**
- Multiple radio options
- Visual selection indicator (circle icon)
- Title/heading support
- Smooth animations

**Props:**
- `title` (string, required): Group title
- `items` (array, required): Array of `{ value, label }` objects
- `value` (string, required): Selected value
- `handleChange` (function, required): Change handler
- `data-testid` (string, optional): Test identifier

**Accessibility:**
- ARIA radiogroup role
- Proper labeling
- Keyboard navigation (arrow keys)

---

#### Divider (`divider-separator`)

**Primitive:** `<hr>` / Radix UI Separator

**Features:**
- Horizontal and vertical orientations
- Decorative or semantic
- Custom styling

**Props:**
- `orientation` ("horizontal" | "vertical"): Orientation
- `decorative` (boolean): Whether decorative
- `className` (string, optional): Additional classes

**Accessibility:**
- Proper ARIA attributes
- Semantic HTML when not decorative

---

#### InteractiveLink (`interactive-link-link`)

**Primitive:** `<a>`

**Features:**
- Animated arrow icon on hover
- Integrated with Next.js Link
- Localization support

**Props:**
- `href` (string, required): Link destination
- `children` (ReactNode): Link text
- `onClick` (function, optional): Click handler
- `className` (string, optional): Additional classes
- `data-testid` (string, optional): Test identifier

**Accessibility:**
- Semantic link element
- Focus indicators
- ARIA labels

---

### Domain-Specific Components

These components are **not** primitive-based and retain their original names:

- **CartTotals**: Cart totals display
- **LineItemOptions**: Line item options display
- **LineItemPrice**: Line item pricing
- **LineItemUnitPrice**: Unit pricing
- **LocalizedClientLink**: Localized Next.js Link wrapper

---

## Usage Examples

### Basic Input

```tsx
import { Input } from "@modules/common/components"

function LoginForm() {
  return (
    <form>
      <Input 
        label="Email" 
        name="email" 
        type="email" 
        required 
      />
      <Input 
        label="Password" 
        name="password" 
        type="password" 
        required 
      />
    </form>
  )
}
```

### Checkbox with Label

```tsx
import { Checkbox } from "@modules/common/components"

function TermsAcceptance() {
  const [accepted, setAccepted] = useState(false)
  
  return (
    <Checkbox
      label="I accept the terms and conditions"
      checked={accepted}
      onChange={() => setAccepted(!accepted)}
    />
  )
}
```

### Modal Dialog

```tsx
import { Modal } from "@modules/common/components"
import { Button } from "@/components/ui/button"

function ConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Delete Account
      </Button>
      
      <Modal 
        isOpen={isOpen} 
        close={() => setIsOpen(false)}
        size="small"
      >
        <Modal.Title>Confirm Deletion</Modal.Title>
        <Modal.Description>
          Are you sure you want to delete your account? This action cannot be undone.
        </Modal.Description>
        <Modal.Footer>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
```

### Radio Group for Filtering

```tsx
import { FilterRadioGroup } from "@modules/common/components"

function SizeFilter() {
  const [selectedSize, setSelectedSize] = useState("md")
  
  return (
    <FilterRadioGroup
      title="Size"
      items={[
        { value: "sm", label: "Small" },
        { value: "md", label: "Medium" },
        { value: "lg", label: "Large" }
      ]}
      value={selectedSize}
      handleChange={setSelectedSize}
    />
  )
}
```

### Using in MDX

Components are automatically available in MDX files:

```mdx
# My Blog Post

Here's an email subscription form:

<Input label="Your email" name="email" type="email" />

<Checkbox label="Subscribe to newsletter" />

<Divider />

<InteractiveLink href="/products">
  View all products
</InteractiveLink>
```

---

## Migration Guide

### From Medusa UI to shadcn/ui

#### Component Name Mapping

| Old (Medusa UI) | New (shadcn) | Notes |
|----------------|--------------|-------|
| `Input` | `Input` | Added password toggle |
| `Checkbox` | `Checkbox` | Now uses Radix UI |
| `Modal` | `Modal` | Now uses Dialog primitive |
| `DeleteButton` | `DeleteButton` | lucide-react icons |
| `Radio` | `Radio` | Custom styled |
| `NativeSelect` | `Select` | Enhanced styling |
| `FilterRadioGroup` | `FilterRadioGroup` | Circle indicator |
| `Divider` | `Divider` | Radix UI Separator |
| `InteractiveLink` | `InteractiveLink` | lucide-react arrow |

#### Utility Function Changes

```tsx
// Before (Medusa UI)
import { clx } from "@medusajs/ui"

// After (shadcn)
import { cn } from "@lib/utils"
```

#### Icon Changes

```tsx
// Before (Medusa UI)
import { Trash, Spinner } from "@medusajs/icons"

// After (lucide-react)
import { Trash, Loader2 } from "lucide-react"
// Use Loader2 with animate-spin class
<Loader2 className="animate-spin" />
```

#### Import Changes

```tsx
// Before
import { Input, Checkbox, Modal } from "@modules/common/components"

// After
import { Input, Checkbox, Modal } from "@modules/common/components"

// Or use legacy exports (deprecated)
import { Input, Checkbox, Modal } from "@modules/common/components"
```

### Migration Steps for Other Modules

1. **Update imports**: Change to new component names
2. **Update JSX**: Use new component names in JSX
3. **Update utility**: Replace `clx()` with `cn()`
4. **Update icons**: Replace Medusa icons with lucide-react
5. **Test**: Verify functionality and styling
6. **Update tests**: Update test selectors if needed

---

## Accessibility Guidelines

All components in this library follow WCAG 2.1 Level AA standards:

### Keyboard Navigation

- **Tab**: Move focus between interactive elements
- **Enter/Space**: Activate buttons and checkboxes
- **Escape**: Close modals and dialogs
- **Arrow keys**: Navigate radio groups and selects

### Screen Reader Support

- Proper ARIA labels on all interactive elements
- ARIA live regions for dynamic content
- Semantic HTML elements
- Hidden text for icon-only buttons

### Focus Management

- Visible focus indicators
- Focus trap in modals
- Auto-focus on important elements
- Restore focus after closing modals

### Color Contrast

- All text meets 4.5:1 contrast ratio
- Interactive elements have sufficient contrast
- Focus indicators are clearly visible

---

## Performance Best Practices

### Memoization

All components use `React.memo` to prevent unnecessary re-renders:

```tsx
const Input = React.memo(
  React.forwardRef<HTMLInputElement, InputProps>(
    ({ /* props */ }, ref) => {
      // Component logic
    }
  )
)
```

### Lazy Loading

Heavy components like modals can be lazy-loaded:

```tsx
import dynamic from "next/dynamic"

const Modal = dynamic(() => import("@modules/common/components/modal-modal"), {
  ssr: false,
  loading: () => <div>Loading...</div>
})
```

### Icon Optimization

Use tree-shakeable imports from lucide-react:

```tsx
// Good ✅
import { Eye, EyeOff } from "lucide-react"

// Bad ❌
import * as Icons from "lucide-react"
```

### Bundle Size

- shadcn components are tree-shakeable
- Only import what you need
- Use production builds for deployment

---

## TypeScript Patterns

### Prop Types with JSDoc

```tsx
/**
 * Props for the Input component
 */
type InputProps = {
  /** The label text for the input field */
  label: string
  /** The name attribute for the input */
  name: string
  /** Input type (text, email, password, etc.) */
  type?: string
  /** Whether the field is required */
  required?: boolean
  /** Test ID for testing */
  "data-testid"?: string
}
```

### Discriminated Unions

```tsx
type ButtonVariant = "primary" | "secondary" | "destructive" | "ghost"

type ButtonProps = {
  variant: ButtonVariant
  // ... other props
}
```

### Generic Components

```tsx
interface SelectProps<T> {
  options: T[]
  value: T
  onChange: (value: T) => void
}
```

### Strict Null Checks

```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault()
  onClick?.(e) // Use optional chaining
}
```

---

## Contributing

When adding new components:

1. Follow the naming convention (`ComponentName-primitive`)
2. Add comprehensive JSDoc comments
3. Include TypeScript prop types
4. Add accessibility features
5. Use `React.memo` for performance
6. Update this README with usage examples
7. Add to barrel export in `index.ts`

---

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [lucide-react Icons](https://lucide.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Phase 2 Migration

See [`/storefront/docs/MIGRATION_PLAN.md`](../../docs/MIGRATION_PLAN.md) for the plan to migrate the remaining 73+ files across:

- Account components (12 files)
- Cart components (6 files)
- Checkout components (10 files)
- Product components (15 files)
- Search components (5 files)
- Layout components (8 files)
- Skeleton components (8 files)
- Other modules (9 files)

---

**Last Updated:** January 2026  
**Migration Status:** Phase 1 Complete ✅
