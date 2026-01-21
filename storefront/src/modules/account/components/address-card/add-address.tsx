"use client"

import { Plus } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import React, { useEffect, useState } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import { InputInput, ModalModal } from "@modules/common/components"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { HttpTypes } from "@medusajs/types"
import { useAddCustomerAddress } from "@lib/hooks/use-customer-mutations"

const AddAddress = ({ region }: { region: HttpTypes.StoreRegion }) => {
  const [successState, setSuccessState] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { state, open, close: closeModal } = useToggleState(false)
  const addCustomerAddressMutation = useAddCustomerAddress()

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)
    setSuccessState(false)

    const formData = new FormData(event.currentTarget)
    try {
      await addCustomerAddressMutation.mutateAsync(formData)
      setSuccessState(true)
    } catch (err: any) {
      setErrorMessage(err?.message ?? err?.toString() ?? "Unable to add address.")
    }
  }

  return (
    <>
      <button
        className="border border-ui-border-base rounded-rounded p-5 min-h-[220px] h-full w-full flex flex-col justify-between"
        onClick={open}
        data-testid="add-address-button"
      >
        <span className="text-base-semi">New address</span>
        <Plus />
      </button>

      <ModalModal isOpen={state} close={close} data-testid="add-address-modal">
        <ModalModal.Title>
          <Heading className="mb-2">Add address</Heading>
        </ModalModal.Title>
        <form onSubmit={handleSubmit}>
          <ModalModal.Body>
            <div className="flex flex-col gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <InputInput
                  label="First name"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  data-testid="first-name-input"
                />
                <InputInput
                  label="Last name"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  data-testid="last-name-input"
                />
              </div>
              <InputInput
                label="Company"
                name="company"
                autoComplete="organization"
                data-testid="company-input"
              />
              <InputInput
                label="Address"
                name="address_1"
                required
                autoComplete="address-line1"
                data-testid="address-1-input"
              />
              <InputInput
                label="Apartment, suite, etc."
                name="address_2"
                autoComplete="address-line2"
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <InputInput
                  label="Postal code"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                />
                <InputInput
                  label="City"
                  name="city"
                  required
                  autoComplete="locality"
                  data-testid="city-input"
                />
              </div>
              <InputInput
                label="Province / State"
                name="province"
                autoComplete="address-level1"
                data-testid="state-input"
              />
              <CountrySelect
                region={region}
                name="country_code"
                required
                autoComplete="country"
                data-testid="country-select"
              />
              <InputInput
                label="Phone"
                name="phone"
                autoComplete="phone"
                data-testid="phone-input"
              />
            </div>
            {errorMessage && (
              <div
                className="text-rose-500 text-small-regular py-2"
                data-testid="address-error"
              >
                {errorMessage}
              </div>
            )}
          </ModalModal.Body>
          <ModalModal.Footer>
            <div className="flex gap-3 mt-6">
              <Button
                type="reset"
                variant="secondary"
                onClick={close}
                className="h-10"
                data-testid="cancel-button"
              >
                Cancel
              </Button>
              <SubmitButton
                data-testid="save-button"
                isLoading={addCustomerAddressMutation.isPending}
              >
                Save
              </SubmitButton>
            </div>
          </ModalModal.Footer>
        </form>
      </ModalModal>
    </>
  )
}

export default AddAddress
