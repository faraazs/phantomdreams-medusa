"use client"

import { getCustomer } from "@lib/data/customer"
import AccountLayout from "@modules/account/templates/account-layout"
import SkeletonAccountPage from "@modules/skeletons/templates/skeleton-account-page"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@lib/utils/query-keys"

const AccountLayoutClient = ({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
}) => {
  const customerQuery = useQuery({
    queryKey: queryKeys.customer(),
    queryFn: getCustomer,
    staleTime: 0,
  })

  return (
    <AccountLayout customer={customerQuery.data ?? null}>
      {customerQuery.isLoading ? (
        <SkeletonAccountPage />
      ) : customerQuery.data ? (
        dashboard
      ) : (
        login
      )}
    </AccountLayout>
  )
}

export default AccountLayoutClient
