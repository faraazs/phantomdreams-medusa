"use client"

import CartTemplate from "@modules/cart/templates"
import SkeletonCartPage from "@modules/skeletons/templates/skeleton-cart-page"
import { enrichLineItems, retrieveCart } from "@lib/data/cart"
import { getCustomer } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@lib/utils/query-keys"

const CartClient = () => {
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

  const isLoading = cartQuery.isLoading || customerQuery.isLoading

  if (isLoading) {
    return <SkeletonCartPage />
  }

  return (
    <CartTemplate cart={cartQuery.data ?? null} customer={customerQuery.data ?? null} />
  )
}

export default CartClient
