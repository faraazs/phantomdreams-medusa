"use client"

import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import React, { useEffect, useImperativeHandle, useState } from "react"
import { cn } from "@lib/utils"

/**
 * Props for the Input-input component
 */
type InputInputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  /** The label text for the input field */
  label: string
  /** Validation errors object */
  errors?: Record<string, unknown>
  /** Touched fields object for form validation */
  touched?: Record<string, unknown>
  /** The name attribute for the input */
  name: string
  /** Optional top label displayed above the input */
  topLabel?: string
  /** Test ID for testing */
  "data-testid"?: string
}

/**
 * Input-input: Text input component with floating label and optional password toggle
 * 
 * @primitive input
 * @component
 * @example
 * ```tsx
 * <InputInput 
 *   label="Email" 
 *   name="email" 
 *   type="email" 
 *   required 
 * />
 * ```
 * 
 * @example
 * ```tsx
 * <InputInput 
 *   label="Password" 
 *   name="password" 
 *   type="password" 
 *   topLabel="Account Security"
 *   required 
 * />
 * ```
 */
const InputInput = React.memo(
  React.forwardRef<HTMLInputElement, InputInputProps>(
    (
      {
        type,
        name,
        label,
        touched,
        required,
        topLabel,
        className,
        "data-testid": dataTestId,
        ...props
      },
      ref
    ) => {
      const inputRef = React.useRef<HTMLInputElement>(null)
      const [showPassword, setShowPassword] = useState(false)
      const [inputType, setInputType] = useState(type)

      useEffect(() => {
        if (type === "password" && showPassword) {
          setInputType("text")
        }

        if (type === "password" && !showPassword) {
          setInputType("password")
        }
      }, [type, showPassword])

      useImperativeHandle(ref, () => inputRef.current!)

      return (
        <div className="flex flex-col w-full">
          {topLabel && (
            <Label className="mb-2 txt-compact-medium-plus">{topLabel}</Label>
          )}
          <div className="flex relative z-0 w-full txt-compact-medium">
            <input
              type={inputType}
              name={name}
              placeholder=" "
              required={required}
              className={cn(
                "pt-4 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover transition-colors",
                className
              )}
              aria-label={label}
              aria-required={required}
              data-testid={dataTestId}
              {...props}
              ref={inputRef}
            />
            <label
              htmlFor={name}
              onClick={() => inputRef.current?.focus()}
              className="flex items-center justify-center mx-3 px-1 transition-all absolute duration-300 top-3 -z-1 origin-0 text-ui-fg-subtle cursor-text"
            >
              {label}
              {required && <span className="text-rose-500 ml-1">*</span>}
            </label>
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-ui-fg-subtle px-4 focus:outline-none transition-all duration-150 outline-none focus:text-ui-fg-base absolute right-0 top-3"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </div>
      )
    }
  )
)

InputInput.displayName = "InputInput"

export default InputInput
