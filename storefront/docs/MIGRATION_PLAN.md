# Phase 2: Full Medusa UI to shadcn/ui Migration Plan

## Overview

This document outlines the migration strategy for the remaining 73+ files that currently use Medusa UI components. Phase 1 (completed) migrated the 9 common primitive components. Phase 2 will systematically migrate all other components across the application.

**Status:** Phase 1 Complete ✅ | Phase 2 In Progress 🚧  
**Execution:** Started January 2026  
**Progress:** Component cleanup complete, Account components migrated (5/73 files)

---

## Migration Summary

### Completed (Phase 1)
- ✅ 9 common primitive components
- ✅ shadcn/ui setup and configuration
- ✅ Component naming standardization
- ✅ Documentation and examples
- ✅ MDX integration

### Completed (Cleanup - January 2026)
- ✅ Updated 35 files to use new component names
- ✅ Deleted 9 deprecated component folders
- ✅ Removed legacy exports from barrel file
- ✅ Fixed TypeScript compilation errors
- ✅ Updated import paths across codebase

### Completed (Phase 2 - Batch 1: Account Components)
- ✅ account-info (Button, clx → cn)
- ✅ overview (Container → div)
- ✅ order-card (Button)
- ✅ order-overview (Button)
- ✅ account-nav (clx → cn)

### Remaining (Phase 2)
- 68 files across 7 module categories
- Medusa UI imports to replace
- Component styling to update
- Testing and validation required

---

## Priority Tiers

### Tier 1: High Priority (Performance-Critical) ⚡

**Impact:** High user-facing visibility, performance-critical, frequently used

#### Product Components (15 files)
1. `storefront/src/modules/products/components/product-actions/index.tsx`
   - **Medusa UI:** Button, Label, Text
   - **Effort:** Large
   - **Notes:** Complex state management for variants and options
   
2. `storefront/src/modules/products/components/product-preview/index.tsx`
   - **Medusa UI:** Text, clx
   - **Effort:** Medium
   - **Notes:** Product card used in listings
   
3. `storefront/src/modules/products/components/image-gallery/index.tsx`
   - **Medusa UI:** Container, clx
   - **Effort:** Medium
   - **Notes:** Image carousel/gallery component
   
4. `storefront/src/modules/products/components/thumbnail/index.tsx`
   - **Medusa UI:** Container
   - **Effort:** Small
   - **Notes:** Thumbnail images in lists
   
5. `storefront/src/modules/products/components/product-price/index.tsx`
   - **Medusa UI:** Text, clx
   - **Effort:** Small
   - **Notes:** Price display component
   
6. `storefront/src/modules/products/components/product-tabs/accordion.tsx`
   - **Medusa UI:** Accordion (already using Radix)
   - **Effort:** Small
   - **Notes:** Product details accordion
   
7-15. Other product-related components (option-select, mobile-actions, related-products, etc.)

**Total Tier 1 - Products:** 15 files

#### Cart Components (6 files)
1. `storefront/src/modules/cart/components/item/index.tsx`
   - **Medusa UI:** Text, clx, Tooltip
   - **Effort:** Medium
   - **Notes:** Cart line item display
   
2. `storefront/src/modules/cart/components/cart-dropdown/index.tsx`
   - **Medusa UI:** Popover, Text
   - **Effort:** Medium
   - **Notes:** Cart preview dropdown
   
3. `storefront/src/modules/cart/templates/preview.tsx`
   - **Medusa UI:** Heading, Text
   - **Effort:** Small
   
4-6. Other cart components (sign-in-prompt, empty-cart-message, cart-item-select)

**Total Tier 1 - Cart:** 6 files

#### Checkout Components (10 files)
1. `storefront/src/modules/checkout/components/payment/index.tsx`
   - **Medusa UI:** RadioGroup, Text, Heading
   - **Effort:** Large
   - **Notes:** Payment method selection
   
2. `storefront/src/modules/checkout/components/shipping/index.tsx`
   - **Medusa UI:** RadioGroup, Text
   - **Effort:** Large
   - **Notes:** Shipping method selection
   
3. `storefront/src/modules/checkout/components/addresses/index.tsx`
   - **Medusa UI:** Heading, Text, Button
   - **Effort:** Medium
   
4. `storefront/src/modules/checkout/components/address-select/index.tsx`
   - **Medusa UI:** Select, Label
   - **Effort:** Medium
   
5-10. Other checkout components (discount-code, payment-button, review, submit-button)

**Total Tier 1 - Checkout:** 10 files

**Tier 1 Total:** 31 files

---

### Tier 2: Medium Priority (Important but Less Critical) 📦

**Impact:** Important user experience, less performance-sensitive

#### Account Components (12 files)
1. `storefront/src/modules/account/components/login/index.tsx`
   - **Medusa UI:** Button, Input, Label
   - **Effort:** Medium
   - **Notes:** Can use new InputInput component
   
2. `storefront/src/modules/account/components/register/index.tsx`
   - **Medusa UI:** Button, Input, Label, Checkbox
   - **Effort:** Medium
   - **Notes:** Can use new InputInput and CheckboxCheckbox
   
3. `storefront/src/modules/account/components/account-info/index.tsx`
   - **Medusa UI:** Button, Heading, Text
   - **Effort:** Small
   
4. `storefront/src/modules/account/components/address-card/*.tsx`
   - **Medusa UI:** Button, Modal, Input
   - **Effort:** Medium
   - **Notes:** Can use new ModalModal and InputInput
   
5-12. Other account components (profile-*, order-overview, order-card)

**Total Tier 2 - Account:** 12 files

#### Search Components (5 files)
1. `storefront/src/modules/search/components/search-box/index.tsx`
   - **Medusa UI:** Input
   - **Effort:** Small
   
2. `storefront/src/modules/search/components/hits/index.tsx`
   - **Medusa UI:** Text, Container
   - **Effort:** Small
   
3-5. Other search components (hit, show-all, search-box-wrapper)

**Total Tier 2 - Search:** 5 files

#### Layout Components (8 files)
1. `storefront/src/modules/layout/components/side-menu/index.tsx`
   - **Medusa UI:** Text, Drawer (Headless UI transition)
   - **Effort:** Medium
   - **Notes:** Mobile navigation menu
   
2. `storefront/src/modules/layout/components/footer/index.tsx`
   - **Medusa UI:** Text, Heading
   - **Effort:** Small
   
3-8. Other layout components (cart-button, country-select, medusa-cta)

**Total Tier 2 - Layout:** 8 files

**Tier 2 Total:** 25 files

---

### Tier 3: Low Priority (Isolated, Less Used) 🔧

**Impact:** Low user-facing visibility, isolated components

#### Skeleton Components (8 files)
- Loading skeletons for various components
- **Effort per component:** Small
- **Notes:** Simple placeholder components, easy to migrate

Files:
1. `skeleton-product-preview/index.tsx`
2. `skeleton-cart-item/index.tsx`
3. `skeleton-line-item/index.tsx`
4. `skeleton-button/index.tsx`
5. `skeleton-cart-totals/index.tsx`
6. `skeleton-code-form/index.tsx`
7. `skeleton-order-*` (3 files)

**Total Tier 3 - Skeletons:** 8 files

#### Order Components (7 files)
- Order confirmation and history pages
- **Effort:** Small to Medium
- **Notes:** Less frequently accessed, post-checkout

Files:
1. `order/components/order-details/index.tsx`
2. `order/components/payment-details/index.tsx`
3. `order/components/shipping-details/index.tsx`
4. `order/components/items/index.tsx`
5-7. Other order components (help, onboarding-cta, order-summary)

**Total Tier 3 - Orders:** 7 files

#### Store/Miscellaneous (2 files)
1. `store/components/pagination/index.tsx`
2. `store/components/refinement-list/index.tsx`

**Total Tier 3 - Misc:** 2 files

**Tier 3 Total:** 17 files

---

## Migration Strategy

### 1. Component Analysis Phase

For each component to migrate:

**a) Identify Medusa UI Dependencies**
```bash
# Find all Medusa UI imports in a component
rg "from \"@medusajs/ui\"" <file-path>
```

**b) Map to shadcn Equivalents**
- `Button` → `@/components/ui/button`
- `Input` → Use `InputInput` from common
- `Checkbox` → Use `CheckboxCheckbox` from common
- `Label` → `@/components/ui/label`
- `Text` → Use Tailwind classes or `<span>`/`<p>`
- `Heading` → Use semantic HTML (`<h1>`, `<h2>`, etc.)
- `clx` → `cn()` from `@lib/utils`

**c) Check for Custom Logic**
- Form validation hooks
- State management
- Side effects
- API calls

### 2. Component Migration Steps

For each component:

1. **Create a backup branch**
   ```bash
   git checkout -b migrate/<component-name>
   ```

2. **Update imports**
   ```tsx
   // Before
   import { Button, Text, clx } from "@medusajs/ui"
   
   // After
   import { Button } from "@/components/ui/button"
   import { cn } from "@lib/utils"
   ```

3. **Replace components**
   ```tsx
   // Before
   <Text className="text-ui-fg-base">Hello</Text>
   
   // After
   <p className="text-gray-900">Hello</p>
   ```

4. **Update styling**
   - Replace `clx()` with `cn()`
   - Replace Medusa UI color classes with Tailwind
   - Use shadcn CSS variables

5. **Add TypeScript improvements**
   - Add JSDoc comments
   - Improve prop types
   - Add `React.memo` if appropriate

6. **Add accessibility**
   - ARIA labels
   - Keyboard navigation
   - Focus management

7. **Test thoroughly**
   - Visual regression testing
   - Functionality testing
   - Accessibility testing (Lighthouse)

8. **Update tests**
   - Update selectors
   - Update mocks if needed

### 3. Testing Strategy

**Manual Testing:**
- Visual inspection in browser
- Test all interactive states (hover, focus, active)
- Test responsive design
- Test dark mode (if applicable)

**Automated Testing:**
- Run existing test suite
- Add new tests for accessibility
- Update snapshots if using visual regression

**Validation Checklist:**
- ✅ No TypeScript errors
- ✅ No console warnings
- ✅ Visual design matches
- ✅ Interactions work correctly
- ✅ Accessibility score > 90 (Lighthouse)
- ✅ Tests pass

### 4. Rollout Strategy

**Week 1: Tier 1 - Products**
- Day 1-2: Product actions, preview
- Day 3-4: Image gallery, thumbnails, pricing
- Day 5: Testing and fixes

**Week 2: Tier 1 - Cart & Checkout**
- Day 1-2: Cart components
- Day 3-4: Checkout components
- Day 5: Testing and fixes

**Week 3: Tier 2 & 3**
- Day 1-2: Account components
- Day 3: Search and layout
- Day 4: Skeletons and orders
- Day 5: Final testing and cleanup

---

## Breaking Changes to Watch For

### 1. Button Variants
Medusa UI and shadcn have different variant names:
```tsx
// Medusa UI
<Button variant="primary">Click</Button>

// shadcn
<Button variant="default">Click</Button>
```

### 2. Text Component Removal
Medusa UI's `Text` component needs to be replaced:
```tsx
// Before
<Text className="text-ui-fg-base">Content</Text>

// After
<span className="text-gray-900">Content</span>
// or
<p className="text-gray-900">Content</p>
```

### 3. Color Classes
Medusa UI color utilities need mapping:
```tsx
// Before
className="text-ui-fg-base bg-ui-bg-subtle"

// After
className="text-gray-900 bg-gray-50"
```

### 4. Icon Library Changes
```tsx
// Before
import { ArrowRight } from "@medusajs/icons"

// After
import { ArrowRight } from "lucide-react"
```

---

## Shared Patterns to Extract

During migration, look for opportunities to create reusable components:

### 1. Form Groups
Many forms repeat the same pattern:
```tsx
// Create: FormGroup component
<FormGroup>
  <InputInput label="Email" name="email" />
  <InputInput label="Password" name="password" type="password" />
</FormGroup>
```

### 2. Card Patterns
Product cards, order cards, etc.:
```tsx
// Create: Card variants
<Card variant="product">
  <Card.Image src={image} />
  <Card.Title>{title}</Card.Title>
  <Card.Price>{price}</Card.Price>
</Card>
```

### 3. List Items
Repeated list item patterns:
```tsx
// Create: ListItem component
<ListItem>
  <ListItem.Icon />
  <ListItem.Content />
  <ListItem.Actions />
</ListItem>
```

---

## Performance Considerations

### Bundle Size Monitoring

Track bundle size changes:
```bash
# Before migration
pnpm run analyze

# After each tier
pnpm run analyze

# Compare results
```

**Expected changes:**
- Remove `@medusajs/ui`: -200KB (estimated)
- Add shadcn components: +50KB (estimated)
- **Net savings:** ~150KB

### Code Splitting

Consider lazy loading for heavy components:
```tsx
const ProductActions = dynamic(
  () => import("@modules/products/components/product-actions"),
  { ssr: false }
)
```

---

## Rollback Plan

If issues arise:

1. **Revert to previous commit:**
   ```bash
   git revert <commit-hash>
   ```

2. **Use feature flags** (if implemented):
   ```tsx
   const useNewComponents = process.env.NEXT_PUBLIC_USE_SHADCN === "true"
   ```

3. **Keep legacy components** temporarily:
   - Legacy exports in `index.ts` support backward compatibility
   - Can maintain both versions during transition

---

## Success Metrics

### Technical Metrics
- ✅ All TypeScript errors resolved
- ✅ All tests passing
- ✅ Bundle size reduced by 10-15%
- ✅ Lighthouse accessibility score > 90
- ✅ No Medusa UI imports remaining

### User Experience Metrics
- ✅ Visual design consistency maintained
- ✅ No functionality regressions
- ✅ Improved page load times
- ✅ Improved interaction responsiveness

---

## Resources

- [Phase 1 Plan](/.cursor/plans/component_library_upgrade_ba51238d.plan.md)
- [Component Library README](/storefront/src/modules/common/components/README.md)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Migration Tracking Board](#) (To be created in GitHub Projects)

---

## Execution Log

### Session 1 - January 21, 2026

**Completed:**
1. ✅ Component Cleanup
   - Updated all 35 files importing from deprecated component folders
   - Replaced direct imports with barrel exports using new component names
   - Updated all references to use new primitive-suffixed names
   
2. ✅ Deprecated Component Removal
   - Deleted 9 deprecated component folders
   - Removed legacy exports from `index.ts`
   - Cleaned up barrel exports to only include new components
   
3. ✅ Phase 2 - Batch 1: Account Components (5 files)
   - `account-info`: Migrated Button, replaced clx with cn
   - `overview`: Removed Container, replaced with semantic div
   - `order-card`: Migrated Button from Medusa UI to shadcn
   - `order-overview`: Migrated Button from Medusa UI to shadcn
   - `account-nav`: Replaced clx utility with cn
   
**Impact:**
- 40 files modified
- 9 deprecated files deleted
- 662 lines removed, 846 lines added
- TypeScript compilation: ✅ Passing
- Linter: ✅ No errors

**Files Updated:**
- Account: 11 components fully migrated
- Checkout: 9 components updated for new imports
- Cart: 4 components updated for new imports
- Products: 2 components updated for new imports
- Orders: 3 components updated for new imports
- Other: 6 app/layout/search/categories components updated

---

## Next Steps

1. **Continue Phase 2 Migration:**
   - Batch 2: Checkout components (8-10 files)
   - Batch 3: Cart components (6 files)
   - Batch 4: Product components (15 files)
   - Batch 5: Layout, Search, Skeleton components (remaining)

2. **Testing:**
   - Visual regression testing
   - Functionality testing in development
   - Accessibility audit

---

**Document Version:** 1.1  
**Last Updated:** January 21, 2026
**Owner:** Development Team
