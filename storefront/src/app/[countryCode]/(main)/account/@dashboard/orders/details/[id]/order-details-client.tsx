"use client"

import OrderDetailsTemplate from "@modules/order/templates/order-details-template"
import SkeletonAccountPage from "@modules/skeletons/templates/skeleton-account-page"
import { retrieveOrder } from "@lib/data/orders"
import { enrichLineItems } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@lib/utils/query-keys"

const OrderDetailsClient = ({ id }: { id: string }) => {
  const orderQuery = useQuery({
    queryKey: queryKeys.order(id),
    queryFn: async () => {
      const fetchedOrder = await retrieveOrder(id).catch(() => null)
      if (!fetchedOrder) {
        return null
      }

      const enrichedItems = await enrichLineItems(
        fetchedOrder.items,
        fetchedOrder.region_id!
      )

      return {
        ...fetchedOrder,
        items: enrichedItems,
      } as HttpTypes.StoreOrder
    },
    staleTime: 0,
  })

  if (orderQuery.isLoading) {
    return <SkeletonAccountPage />
  }

  if (!orderQuery.data) {
    return (
      <div className="w-full">
        <p className="text-ui-fg-subtle">Order not found.</p>
      </div>
    )
  }

  return <OrderDetailsTemplate order={orderQuery.data} />
}

export default OrderDetailsClient
