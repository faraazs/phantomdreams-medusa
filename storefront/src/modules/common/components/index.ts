/**
 * Barrel export file for common components
 * Updated for shadcn/ui migration
 * 
 * Usage:
 * import { Input, Checkbox, Modal } from "@modules/common/components"
 */

// Primitive-based components (shadcn/ui)
export { default as Checkbox } from "./checkbox"
export { default as DeleteButton } from "./delete-button"
export { default as Divider } from "./divider"
export { default as FilterRadioGroup } from "./filter-radio-group"
export { default as Input } from "./input"
export { default as InteractiveLink } from "./interactive-link"
export { default as Modal } from "./modal"
export { default as Radio } from "./radio"
export { default as Select } from "./select"

// Domain-specific components (unchanged)
export { default as CartTotals } from "./cart-totals"
export { default as LineItemOptions } from "./line-item-options"
export { default as LineItemPrice } from "./line-item-price"
export { default as LineItemUnitPrice } from "./line-item-unit-price"
export { default as LocalizedClientLink } from "./localized-client-link"
