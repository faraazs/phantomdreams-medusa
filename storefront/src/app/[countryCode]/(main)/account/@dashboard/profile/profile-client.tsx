"use client"

import ProfilePhone from "@modules/account//components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import ProfilePassword from "@modules/account/components/profile-password"
import SkeletonAccountPage from "@modules/skeletons/templates/skeleton-account-page"
import { listRegions } from "@lib/data/regions"
import { getCustomer } from "@lib/data/customer"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@lib/utils/query-keys"

const ProfileClient = () => {
  const customerQuery = useQuery({
    queryKey: queryKeys.customer(),
    queryFn: getCustomer,
    staleTime: 0,
  })

  const regionsQuery = useQuery({
    queryKey: queryKeys.regions(),
    queryFn: listRegions,
  })

  if (customerQuery.isLoading || regionsQuery.isLoading) {
    return <SkeletonAccountPage />
  }

  if (!customerQuery.data || !regionsQuery.data) {
    return null
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Profile</h1>
        <p className="text-base-regular">
          View and update your profile information, including your name, email,
          and phone number. You can also update your billing address, or change
          your password.
        </p>
      </div>
      <div className="flex flex-col gap-y-8 w-full">
        <ProfileName customer={customerQuery.data} />
        <Divider />
        <ProfileEmail customer={customerQuery.data} />
        <Divider />
        <ProfilePhone customer={customerQuery.data} />
        <Divider />
        <ProfilePassword customer={customerQuery.data} />
        <Divider />
        <ProfileBillingAddress
          customer={customerQuery.data}
          regions={regionsQuery.data}
        />
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />
}

export default ProfileClient
