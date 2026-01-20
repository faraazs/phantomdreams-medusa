"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

import { HttpTypes } from "@medusajs/types"
import { enrichLineItems, retrieveCart } from "@lib/data/cart"
import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { getCustomer } from "@lib/data/customer"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import Wrapper from "@modules/checkout/components/payment-wrapper"
import SkeletonCheckoutPage from "@modules/skeletons/templates/skeleton-checkout-page"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@lib/utils/query-keys"

const CheckoutClient = () => {
  const router = useRouter()
  const { countryCode } = useParams() as { countryCode: string }

  const cartQuery = useQuery({
    queryKey: queryKeys.cart(),
    queryFn: async () => {
      const fetchedCart = await retrieveCart()
      if (!fetchedCart) {
        return null
      }

      if (!fetchedCart.items?.length) {
        return fetchedCart
      }

      const enrichedItems = await enrichLineItems(
        fetchedCart.items,
        fetchedCart.region_id!
      )

      return {
        ...fetchedCart,
        items: enrichedItems as HttpTypes.StoreCartLineItem[],
      }
    },
    staleTime: 0,
  })

  const customerQuery = useQuery({
    queryKey: queryKeys.customer(),
    queryFn: getCustomer,
    staleTime: 0,
  })

  const cart = cartQuery.data ?? null
  const regionId = cart?.region?.id ?? cart?.region_id ?? ""

  const shippingMethodsQuery = useQuery({
    queryKey: queryKeys.shippingOptions(cart?.id ?? ""),
    queryFn: () => listCartShippingMethods(cart!.id),
    enabled: Boolean(cart?.id),
    staleTime: 0,
  })

  const paymentMethodsQuery = useQuery({
    queryKey: queryKeys.paymentProviders(regionId),
    queryFn: () => listCartPaymentMethods(regionId),
    enabled: Boolean(regionId),
    staleTime: 0,
  })

  useEffect(() => {
    if (!cartQuery.isLoading && !cartQuery.data && countryCode) {
      router.replace(`/${countryCode}/cart`)
    }
  }, [cartQuery.isLoading, cartQuery.data, countryCode, router])

  const isLoading =
    cartQuery.isLoading ||
    customerQuery.isLoading ||
    shippingMethodsQuery.isLoading ||
    paymentMethodsQuery.isLoading

  if (isLoading) {
    return <SkeletonCheckoutPage />
  }

  if (!cart) {
    return (
      <div className="content-container py-12">
        <p className="text-ui-fg-subtle">Cart not found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
      <Wrapper cart={cart}>
        <CheckoutForm
          cart={cart}
          customer={customerQuery.data ?? null}
          shippingMethods={shippingMethodsQuery.data ?? null}
          paymentMethods={paymentMethodsQuery.data ?? null}
        />
      </Wrapper>
      <CheckoutSummary cart={cart} />
    </div>
  )
}

export default CheckoutClient
