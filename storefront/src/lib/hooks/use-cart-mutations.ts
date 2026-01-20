import { useMutation, useQueryClient } from "@tanstack/react-query"
import { HttpTypes } from "@medusajs/types"

import { queryKeys } from "@lib/utils/query-keys"
import {
  addToCart,
  applyPromotions,
  deleteLineItem,
  setAddresses,
  setShippingMethod,
  updateLineItem,
} from "@lib/data/cart"
import {
  addLineItemOptimistically,
  applyAddressesOptimistically,
  applyPromotionsOptimistically,
  applyShippingMethodOptimistically,
  removeLineItemOptimistically,
  updateLineItemOptimistically,
} from "@lib/utils/optimistic-cart"

type AddToCartInput = {
  variantId: string
  quantity: number
  countryCode: string
  product?: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: AddToCartInput) => addToCart(variables),
    onMutate: async (variables: AddToCartInput) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.cart() })
      const previousCart = queryClient.getQueryData<HttpTypes.StoreCart | null>(
        queryKeys.cart()
      )

      if (previousCart && variables.product && variables.variant) {
        const optimisticCart = addLineItemOptimistically(previousCart, {
          product: variables.product,
          variant: variables.variant,
          quantity: variables.quantity,
        })
        queryClient.setQueryData(queryKeys.cart(), optimisticCart)
      }

      return { previousCart }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(queryKeys.cart(), context.previousCart)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart() })
    },
  })
}

export const useUpdateLineItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateLineItem,
    onMutate: async (variables: { lineId: string; quantity: number }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.cart() })
      const previousCart = queryClient.getQueryData<HttpTypes.StoreCart | null>(
        queryKeys.cart()
      )

      if (previousCart) {
        const optimisticCart = updateLineItemOptimistically(
          previousCart,
          variables.lineId,
          variables.quantity
        )
        queryClient.setQueryData(queryKeys.cart(), optimisticCart)
      }

      return { previousCart }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(queryKeys.cart(), context.previousCart)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart() })
    },
  })
}

export const useDeleteLineItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ lineId }: { lineId: string }) => deleteLineItem(lineId),
    onMutate: async (variables: { lineId: string }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.cart() })
      const previousCart = queryClient.getQueryData<HttpTypes.StoreCart | null>(
        queryKeys.cart()
      )

      if (previousCart) {
        const optimisticCart = removeLineItemOptimistically(previousCart, variables.lineId)
        queryClient.setQueryData(queryKeys.cart(), optimisticCart)
      }

      return { previousCart }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(queryKeys.cart(), context.previousCart)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart() })
    },
  })
}

export const useApplyPromotions = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ codes }: { codes: string[] }) => applyPromotions(codes),
    onMutate: async (variables: { codes: string[] }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.cart() })
      const previousCart = queryClient.getQueryData<HttpTypes.StoreCart | null>(
        queryKeys.cart()
      )

      if (previousCart) {
        const optimisticCart = applyPromotionsOptimistically(previousCart, variables.codes)
        queryClient.setQueryData(queryKeys.cart(), optimisticCart)
      }

      return { previousCart }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(queryKeys.cart(), context.previousCart)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart() })
    },
  })
}

type SetShippingMethodInput = {
  cartId: string
  shippingMethodId: string
  shippingOption?: HttpTypes.StoreCartShippingOption | null
}

export const useSetShippingMethod = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      cartId,
      shippingMethodId,
    }: SetShippingMethodInput) => setShippingMethod({ cartId, shippingMethodId }),
    onMutate: async (variables: SetShippingMethodInput) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.cart() })
      const previousCart = queryClient.getQueryData<HttpTypes.StoreCart | null>(
        queryKeys.cart()
      )

      if (previousCart) {
        const optimisticCart = applyShippingMethodOptimistically(
          previousCart,
          variables.shippingOption
        )
        queryClient.setQueryData(queryKeys.cart(), optimisticCart)
      }

      return { previousCart }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(queryKeys.cart(), context.previousCart)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart() })
    },
  })
}

export const useSetAddresses = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) => setAddresses(null, formData),
    onMutate: async (formData: FormData) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.cart() })
      const previousCart = queryClient.getQueryData<HttpTypes.StoreCart | null>(
        queryKeys.cart()
      )

      if (previousCart) {
        const optimisticCart = applyAddressesOptimistically(previousCart, formData)
        queryClient.setQueryData(queryKeys.cart(), optimisticCart)
      }

      return { previousCart }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(queryKeys.cart(), context.previousCart)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart() })
    },
  })
}
