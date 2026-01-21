/**
 * Barrel export file for common components
 * Updated for shadcn/ui migration with primitive suffixes
 * 
 * Usage:
 * import { InputInput, CheckboxCheckbox, ModalModal } from "@modules/common/components"
 * 
 * Legacy exports are maintained for backward compatibility but will be deprecated
 */

// New primitive-based components (shadcn)
export { default as CheckboxCheckbox } from "./checkbox-checkbox"
export { default as DeleteButtonButton } from "./delete-button-button"
export { default as DividerSeparator } from "./divider-separator"
export { default as FilterRadioGroupRadio } from "./filter-radio-group-radio"
export { default as InputInput } from "./input-input"
export { default as InteractiveLinkLink } from "./interactive-link-link"
export { default as ModalModal } from "./modal-modal"
export { default as RadioRadio } from "./radio-radio"
export { default as SelectSelect } from "./select-select"

// Domain-specific components (unchanged)
export { default as CartTotals } from "./cart-totals"
export { default as LineItemOptions } from "./line-item-options"
export { default as LineItemPrice } from "./line-item-price"
export { default as LineItemUnitPrice } from "./line-item-unit-price"
export { default as LocalizedClientLink } from "./localized-client-link"

// Legacy exports for backward compatibility (deprecated)
export { default as Checkbox } from "./checkbox"
export { default as DeleteButton } from "./delete-button"
export { default as Divider } from "./divider"
export { default as FilterRadioGroup } from "./filter-radio-group"
export { default as Input } from "./input"
export { default as InteractiveLink } from "./interactive-link"
export { default as Modal } from "./modal"
export { default as NativeSelect } from "./native-select"
export { default as Radio } from "./radio"
