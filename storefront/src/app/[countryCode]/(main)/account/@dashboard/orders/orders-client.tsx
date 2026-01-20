"use client"

import OrderOverview from "@modules/account/components/order-overview"
import SkeletonAccountPage from "@modules/skeletons/templates/skeleton-account-page"
import { listOrders } from "@lib/data/orders"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@lib/utils/query-keys"

const OrdersClient = () => {
  const ordersQuery = useQuery({
    queryKey: queryKeys.orders(),
    queryFn: () => listOrders(),
    staleTime: 0,
  })

  if (ordersQuery.isLoading) {
    return <SkeletonAccountPage />
  }

  if (!ordersQuery.data) {
    return (
      <div className="w-full" data-testid="orders-page-wrapper">
        <p className="text-ui-fg-subtle">No orders found.</p>
      </div>
    )
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Orders</h1>
        <p className="text-base-regular">
          View your previous orders and their status. You can also create
          returns or exchanges for your orders if needed.
        </p>
      </div>
      <div>
        <OrderOverview orders={ordersQuery.data} />
      </div>
    </div>
  )
}

export default OrdersClient
