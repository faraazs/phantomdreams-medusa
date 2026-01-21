import { Separator } from "@/components/ui/separator"
import { cn } from "@lib/utils"
import React from "react"

/**
 * Props for the Divider-separator component
 */
type DividerSeparatorProps = {
  /** Additional CSS classes to apply */
  className?: string
  /** Orientation of the divider */
  orientation?: "horizontal" | "vertical"
  /** Whether the divider is decorative */
  decorative?: boolean
}

/**
 * Divider-separator: Visual divider/separator component
 * 
 * @primitive separator
 * @component
 * @example
 * ```tsx
 * <DividerSeparator />
 * ```
 * 
 * @example
 * ```tsx
 * <DividerSeparator orientation="vertical" className="h-8" />
 * ```
 */
const DividerSeparator = React.memo<DividerSeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true }) => (
    <Separator
      orientation={orientation}
      decorative={decorative}
      className={cn(
        orientation === "horizontal" && "h-px w-full border-b border-gray-200 mt-1",
        className
      )}
    />
  )
)

DividerSeparator.displayName = "DividerSeparator"

export default DividerSeparator
