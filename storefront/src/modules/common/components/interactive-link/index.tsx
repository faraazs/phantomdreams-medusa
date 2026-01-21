"use client"

import { ArrowUpRight } from "lucide-react"
import { cn } from "@lib/utils"
import LocalizedClientLink from "../localized-client-link"
import React from "react"

/**
 * Props for the InteractiveLink-link component
 */
type InteractiveLinkLinkProps = {
  /** URL to navigate to */
  href: string
  /** Content to display in the link */
  children?: React.ReactNode
  /** Click handler */
  onClick?: () => void
  /** Additional CSS classes */
  className?: string
  /** Test ID for testing */
  "data-testid"?: string
}

/**
 * InteractiveLink-link: Interactive link with animated arrow icon
 * 
 * @primitive link
 * @component
 * @example
 * ```tsx
 * <InteractiveLinkLink href="/products">
 *   View all products
 * </InteractiveLinkLink>
 * ```
 */
const InteractiveLinkLink = React.memo<InteractiveLinkLinkProps>(
  ({ href, children, onClick, className, "data-testid": dataTestId, ...props }) => {
    return (
      <LocalizedClientLink
        className={cn("flex gap-x-1 items-center group", className)}
        href={href}
        onClick={onClick}
        data-testid={dataTestId}
        {...props}
      >
        <span className="text-ui-fg-interactive transition-colors group-hover:text-ui-fg-interactive-hover">
          {children}
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-ui-fg-interactive group-hover:rotate-45 ease-in-out duration-150 transition-transform"
          aria-hidden="true"
        />
      </LocalizedClientLink>
    )
  }
)

InteractiveLinkLink.displayName = "InteractiveLinkLink"

export default InteractiveLinkLink
