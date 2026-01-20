"use client"

import { Button } from "@medusajs/ui"
import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  variant = "primary",
  className,
  isLoading,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  isLoading?: boolean
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()
  const resolvedLoading = isLoading ?? pending

  return (
    <Button
      size="large"
      className={className}
      type="submit"
      isLoading={resolvedLoading}
      variant={variant || "primary"}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  )
}
