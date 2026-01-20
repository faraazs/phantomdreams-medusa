import { Spinner, Trash } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { useDeleteLineItem } from "@lib/hooks/use-cart-mutations"

const DeleteButton = ({
  id,
  children,
  className,
}: {
  id: string
  children?: React.ReactNode
  className?: string
}) => {
  const deleteLineItemMutation = useDeleteLineItem()

  const handleDelete = async (id: string) => {
    await deleteLineItemMutation.mutateAsync({ lineId: id })
  }

  return (
    <div
      className={clx(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        className="flex gap-x-1 text-ui-fg-subtle hover:text-ui-fg-base cursor-pointer"
        onClick={() => handleDelete(id)}
      >
        {deleteLineItemMutation.isPending ? (
          <Spinner className="animate-spin" />
        ) : (
          <Trash />
        )}
        <span>{children}</span>
      </button>
    </div>
  )
}

export default DeleteButton
