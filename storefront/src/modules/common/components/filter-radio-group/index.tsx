import { Circle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { cn } from "@lib/utils"
import React from "react"

/**
 * Props for the FilterRadioGroup-radio component
 */
type FilterRadioGroupRadioProps = {
  /** Title/heading for the radio group */
  title: string
  /** Array of radio button options */
  items: {
    value: string
    label: string
  }[]
  /** Currently selected value */
  value: string
  /** Callback function when selection changes */
  handleChange: (value: string) => void
  /** Test ID for testing */
  "data-testid"?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * FilterRadioGroup-radio: Radio group component for filtering options
 * 
 * @primitive radio group
 * @component
 * @example
 * ```tsx
 * <FilterRadioGroupRadio
 *   title="Size"
 *   items={[
 *     { value: "sm", label: "Small" },
 *     { value: "md", label: "Medium" },
 *     { value: "lg", label: "Large" }
 *   ]}
 *   value={selectedSize}
 *   handleChange={setSelectedSize}
 * />
 * ```
 */
const FilterRadioGroupRadio = React.memo<FilterRadioGroupRadioProps>(
  ({
    title,
    items,
    value,
    handleChange,
    "data-testid": dataTestId,
    className,
  }) => {
    return (
      <div
        className={cn("flex gap-x-3 flex-col gap-y-3", className)}
        role="radiogroup"
        aria-label={title}
        data-testid={dataTestId}
      >
        <p className="txt-compact-small-plus text-ui-fg-muted">{title}</p>
        <div className="flex flex-col gap-y-2">
          {items?.map((item) => (
            <div
              key={item.value}
              className={cn("flex gap-x-2 items-center transition-all", {
                "ml-[-23px]": item.value === value,
              })}
            >
              {item.value === value && (
                <Circle
                  className="h-4 w-4 fill-current text-ui-fg-base"
                  aria-hidden="true"
                />
              )}
              <input
                type="radio"
                checked={item.value === value}
                onChange={() => handleChange(item.value)}
                className="hidden peer"
                id={`${title}-${item.value}`}
                value={item.value}
                name={title}
                aria-checked={item.value === value}
              />
              <Label
                htmlFor={`${title}-${item.value}`}
                className={cn(
                  "!txt-compact-small !transform-none text-ui-fg-subtle hover:cursor-pointer transition-colors",
                  {
                    "text-ui-fg-base font-medium": item.value === value,
                  }
                )}
                data-testid="radio-label"
                data-active={item.value === value}
              >
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    )
  }
)

FilterRadioGroupRadio.displayName = "FilterRadioGroupRadio"

export default FilterRadioGroupRadio
