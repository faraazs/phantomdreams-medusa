"use client"

import AddressBook from "@modules/account/components/address-book"
import SkeletonAccountPage from "@modules/skeletons/templates/skeleton-account-page"
import { getRegion } from "@lib/data/regions"
import { getCustomer } from "@lib/data/customer"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@lib/utils/query-keys"

const AddressesClient = ({ countryCode }: { countryCode: string }) => {
  const customerQuery = useQuery({
    queryKey: queryKeys.customer(),
    queryFn: getCustomer,
    staleTime: 0,
  })

  const regionQuery = useQuery({
    queryKey: queryKeys.region(countryCode),
    queryFn: () => getRegion(countryCode),
    enabled: Boolean(countryCode),
    staleTime: 0,
  })

  if (customerQuery.isLoading || regionQuery.isLoading) {
    return <SkeletonAccountPage />
  }

  if (!customerQuery.data || !regionQuery.data) {
    return null
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Shipping Addresses</h1>
        <p className="text-base-regular">
          View and update your shipping addresses, you can add as many as you
          like. Saving your addresses will make them available during checkout.
        </p>
      </div>
      <AddressBook customer={customerQuery.data} region={regionQuery.data} />
    </div>
  )
}

export default AddressesClient
