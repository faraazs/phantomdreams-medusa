import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import React from "react"
import { cn } from "@lib/utils"

/**
 * Props for the Checkbox-checkbox component
 */
type CheckboxCheckboxProps = {
  /** Whether the checkbox is checked */
  checked?: boolean
  /** Callback function when checkbox state changes */
  onChange?: () => void
  /** Label text for the checkbox */
  label: string
  /** Name attribute for the checkbox */
  name?: string
  /** Test ID for testing */
  "data-testid"?: string
  /** Additional CSS classes to apply */
  className?: string
  /** Whether the checkbox is disabled */
  disabled?: boolean
}

/**
 * Checkbox-checkbox: Checkbox component with label
 * 
 * @primitive checkbox
 * @component
 * @example
 * ```tsx
 * <CheckboxCheckbox 
 *   label="Accept terms and conditions" 
 *   checked={isAccepted}
 *   onChange={() => setIsAccepted(!isAccepted)}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * <CheckboxCheckbox 
 *   label="Subscribe to newsletter" 
 *   name="newsletter"
 *   checked={false}
 *   onChange={handleSubscribe}
 * />
 * ```
 */
const CheckboxCheckbox = React.memo<CheckboxCheckboxProps>(
  ({
    checked = true,
    onChange,
    label,
    name,
    "data-testid": dataTestId,
    className,
    disabled = false,
  }) => {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <Checkbox
          id={name || `checkbox-${label.replace(/\s+/g, "-").toLowerCase()}`}
          checked={checked}
          onCheckedChange={onChange}
          name={name}
          data-testid={dataTestId}
          disabled={disabled}
          aria-label={label}
        />
        <Label
          htmlFor={name || `checkbox-${label.replace(/\s+/g, "-").toLowerCase()}`}
          className={cn(
            "text-sm font-medium leading-none cursor-pointer",
            disabled && "cursor-not-allowed opacity-70"
          )}
        >
          {label}
        </Label>
      </div>
    )
  }
)

CheckboxCheckbox.displayName = "CheckboxCheckbox"

export default CheckboxCheckbox
