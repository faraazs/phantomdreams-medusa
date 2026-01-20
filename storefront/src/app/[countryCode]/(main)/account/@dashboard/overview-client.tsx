"use client"

import Overview from "@modules/account/components/overview"
import SkeletonAccountPage from "@modules/skeletons/templates/skeleton-account-page"
import { getCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@lib/utils/query-keys"

const OverviewClient = () => {
  const customerQuery = useQuery({
    queryKey: queryKeys.customer(),
    queryFn: getCustomer,
    staleTime: 0,
  })

  const ordersQuery = useQuery({
    queryKey: queryKeys.orders(),
    queryFn: () => listOrders(),
    staleTime: 0,
  })

  if (customerQuery.isLoading || ordersQuery.isLoading) {
    return <SkeletonAccountPage />
  }

  if (!customerQuery.data) {
    return null
  }

  return <Overview customer={customerQuery.data} orders={ordersQuery.data ?? null} />
}

export default OverviewClient
