import { sdk } from "@lib/config"
import { cache } from "react"

// Shipping actions
export const listCartPaymentMethods = cache(async function (regionId: string) {
  return sdk.store.payment
    .listPaymentProviders(
      { region_id: regionId },
      { next: { tags: ["payment_providers"], revalidate: 3600 } as any }
    )
    .then(({ payment_providers }) => payment_providers)
    .catch(() => {
      return null
    })
})
