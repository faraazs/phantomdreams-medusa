import { Loader2, Trash } from "lucide-react"
import { cn } from "@lib/utils"
import { useDeleteLineItem } from "@lib/hooks/use-cart-mutations"
import React from "react"

/**
 * Props for the DeleteButton-button component
 */
type DeleteButtonButtonProps = {
  /** Unique identifier for the line item to delete */
  id: string
  /** Optional children to render inside the button */
  children?: React.ReactNode
  /** Additional CSS classes to apply */
  className?: string
  /** Test ID for testing */
  "data-testid"?: string
}

/**
 * DeleteButton-button: Button component for deleting line items from cart
 * 
 * @primitive button
 * @component
 * @example
 * ```tsx
 * <DeleteButtonButton id="item_123">
 *   Remove
 * </DeleteButtonButton>
 * ```
 */
const DeleteButtonButton = React.memo<DeleteButtonButtonProps>(
  ({ id, children, className, "data-testid": dataTestId }) => {
    const deleteLineItemMutation = useDeleteLineItem()

    const handleDelete = async (id: string) => {
      await deleteLineItemMutation.mutateAsync({ lineId: id })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        handleDelete(id)
      }
    }

    return (
      <div
        className={cn(
          "flex items-center justify-between text-small-regular",
          className
        )}
      >
        <button
          className="flex gap-x-1 text-ui-fg-subtle hover:text-ui-fg-base cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
          onClick={() => handleDelete(id)}
          onKeyDown={handleKeyDown}
          aria-label={children ? `${children}` : `Delete item ${id}`}
          aria-busy={deleteLineItemMutation.isPending}
          disabled={deleteLineItemMutation.isPending}
          data-testid={dataTestId}
        >
          {deleteLineItemMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Trash className="h-4 w-4" aria-hidden="true" />
          )}
          <span>{children}</span>
        </button>
      </div>
    )
  }
)

DeleteButtonButton.displayName = "DeleteButtonButton"

export default DeleteButtonButton
