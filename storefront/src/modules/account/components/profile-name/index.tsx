"use client"

import React from "react"

import { Input } from "@modules/common/components"

import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
import { useUpdateCustomer } from "@lib/hooks/use-customer-mutations"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const updateCustomerMutation = useUpdateCustomer()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccessState(false)

    const formData = new FormData(event.currentTarget)
    const update = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
    }

    try {
      await updateCustomerMutation.mutateAsync(update)
      setSuccessState(true)
    } catch (err: any) {
      setError(err?.message ?? err?.toString() ?? "Unable to update name.")
    }
  }

  const clearState = () => {
    setSuccessState(false)
    setError(null)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full overflow-visible">
      <AccountInfo
        label="Name"
        currentInfo={`${customer.first_name} ${customer.last_name}`}
        isSuccess={successState}
        isError={Boolean(error)}
        errorMessage={error ?? undefined}
        isSaving={updateCustomerMutation.isPending}
        clearState={clearState}
        data-testid="account-name-editor"
      >
        <div className="grid grid-cols-2 gap-x-4">
          <Input
            label="First name"
            name="first_name"
            required
            defaultValue={customer.first_name ?? ""}
            data-testid="first-name-input"
          />
          <Input
            label="Last name"
            name="last_name"
            required
            defaultValue={customer.last_name ?? ""}
            data-testid="last-name-input"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
