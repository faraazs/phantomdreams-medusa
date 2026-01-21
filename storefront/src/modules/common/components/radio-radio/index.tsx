import React from "react"
import { cn } from "@lib/utils"

/**
 * Props for the Radio-radio component
 */
type RadioRadioProps = {
  /** Whether the radio button is checked */
  checked: boolean
  /** Test ID for testing */
  "data-testid"?: string
  /** Additional CSS classes to apply */
  className?: string
  /** Callback when radio is clicked */
  onChange?: () => void
  /** Name attribute for the radio input */
  name?: string
  /** Value attribute for the radio input */
  value?: string
  /** Whether the radio is disabled */
  disabled?: boolean
}

/**
 * Radio-radio: Custom styled radio button component
 * 
 * @primitive radio
 * @component
 * @example
 * ```tsx
 * <RadioRadio 
 *   checked={selectedValue === "option1"}
 *   onChange={() => setSelectedValue("option1")}
 *   name="options"
 *   value="option1"
 * />
 * ```
 */
const RadioRadio = React.memo<RadioRadioProps>(
  ({
    checked,
    "data-testid": dataTestId,
    className,
    onChange,
    name,
    value,
    disabled = false,
  }) => {
    return (
      <button
        type="button"
        role="radio"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        className={cn(
          "group relative flex h-5 w-5 items-center justify-center outline-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        onClick={!disabled ? onChange : undefined}
        disabled={disabled}
        data-testid={dataTestId || "radio-button"}
        aria-label={name ? `${name} ${value}` : undefined}
      >
        <div
          className={cn(
            "shadow-borders-base group-hover:shadow-borders-strong-with-shadow bg-ui-bg-base group-data-[state=checked]:bg-ui-bg-interactive group-data-[state=checked]:shadow-borders-interactive group-focus:!shadow-borders-interactive-with-focus group-disabled:!bg-ui-bg-disabled group-disabled:!shadow-borders-base flex h-[14px] w-[14px] items-center justify-center rounded-full transition-all",
            disabled && "!bg-ui-bg-disabled !shadow-borders-base"
          )}
        >
          {checked && (
            <span
              data-state={checked ? "checked" : "unchecked"}
              className="group flex items-center justify-center"
            >
              <div
                className={cn(
                  "bg-ui-bg-base shadow-details-contrast-on-bg-interactive rounded-full h-1.5 w-1.5",
                  disabled && "bg-ui-fg-disabled shadow-none"
                )}
              />
            </span>
          )}
        </div>
      </button>
    )
  }
)

RadioRadio.displayName = "RadioRadio"

export default RadioRadio
