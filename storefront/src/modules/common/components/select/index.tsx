"use client"

import { ChevronDown } from "lucide-react"
import { cn } from "@lib/utils"
import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

/**
 * Props for the Select-select component
 */
export type SelectSelectProps = {
  /** Placeholder text when no option is selected */
  placeholder?: string
  /** Validation errors object */
  errors?: Record<string, unknown>
  /** Touched fields object for form validation */
  touched?: Record<string, unknown>
  /** Test ID for testing */
  "data-testid"?: string
} & SelectHTMLAttributes<HTMLSelectElement>

/**
 * Select-select: Native select dropdown component with custom styling
 * 
 * @primitive select
 * @component
 * @example
 * ```tsx
 * <SelectSelect 
 *   placeholder="Choose a country"
 *   defaultValue="us"
 * >
 *   <option value="us">United States</option>
 *   <option value="ca">Canada</option>
 *   <option value="mx">Mexico</option>
 * </SelectSelect>
 * ```
 */
const SelectSelect = forwardRef<HTMLSelectElement, SelectSelectProps>(
  (
    {
      placeholder = "Select...",
      defaultValue,
      className,
      children,
      "data-testid": dataTestId,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null)
    const [isPlaceholder, setIsPlaceholder] = useState(false)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true)
      } else {
        setIsPlaceholder(false)
      }
    }, [innerRef.current?.value])

    return (
      <div>
        <div
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={cn(
            "relative flex items-center text-base-regular border border-ui-border-base bg-ui-bg-subtle rounded-md hover:bg-ui-bg-field-hover transition-colors",
            className,
            {
              "text-ui-fg-muted": isPlaceholder,
            }
          )}
        >
          <select
            ref={innerRef}
            defaultValue={defaultValue}
            {...props}
            className="appearance-none flex-1 bg-transparent border-none px-4 py-2.5 transition-colors duration-150 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md cursor-pointer"
            aria-label={props["aria-label"] || placeholder}
            data-testid={dataTestId}
          >
            <option disabled value="">
              {placeholder}
            </option>
            {children}
          </select>
          <span className="absolute right-4 inset-y-0 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 opacity-50" aria-hidden="true" />
          </span>
        </div>
      </div>
    )
  }
)

SelectSelect.displayName = "SelectSelect"

export default SelectSelect
