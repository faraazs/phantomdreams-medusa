"use client"

import React from "react"

import { Input } from "@modules/common/components"

import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
import { useUpdateCustomer } from "@lib/hooks/use-customer-mutations"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileEmail: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const updateCustomerMutation = useUpdateCustomer()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccessState(false)

    const formData = new FormData(event.currentTarget)
    const update = {
      phone: formData.get("phone") as string,
    }

    try {
      await updateCustomerMutation.mutateAsync(update)
      setSuccessState(true)
    } catch (err: any) {
      setError(err?.message ?? err?.toString() ?? "Unable to update phone.")
    }
  }

  const clearState = () => {
    setSuccessState(false)
    setError(null)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <AccountInfo
        label="Phone"
        currentInfo={`${customer.phone}`}
        isSuccess={successState}
        isError={Boolean(error)}
        errorMessage={error ?? undefined}
        isSaving={updateCustomerMutation.isPending}
        clearState={clearState}
        data-testid="account-phone-editor"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <Input
            label="Phone"
            name="phone"
            type="phone"
            autoComplete="phone"
            required
            defaultValue={customer.phone ?? ""}
            data-testid="phone-input"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileEmail
