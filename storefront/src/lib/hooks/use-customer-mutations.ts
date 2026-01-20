import { useMutation, useQueryClient } from "@tanstack/react-query"
import { HttpTypes } from "@medusajs/types"

import { queryKeys } from "@lib/utils/query-keys"
import {
  addCustomerAddress,
  deleteCustomerAddress,
  updateCustomer,
  updateCustomerAddress,
} from "@lib/data/customer"
import {
  addCustomerAddressOptimistically,
  applyCustomerUpdateOptimistically,
  buildCustomerAddressFromFormData,
  removeCustomerAddressOptimistically,
  updateCustomerAddressOptimistically,
} from "@lib/utils/optimistic-customer"

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCustomer,
    onMutate: async (update: HttpTypes.StoreUpdateCustomer) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.customer() })
      const previousCustomer = queryClient.getQueryData<HttpTypes.StoreCustomer | null>(
        queryKeys.customer()
      )

      if (previousCustomer) {
        const optimisticCustomer = applyCustomerUpdateOptimistically(
          previousCustomer,
          update
        )
        queryClient.setQueryData(queryKeys.customer(), optimisticCustomer)
      }

      return { previousCustomer }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCustomer) {
        queryClient.setQueryData(queryKeys.customer(), context.previousCustomer)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customer() })
    },
  })
}

export const useAddCustomerAddress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) => addCustomerAddress(null, formData),
    onMutate: async (formData: FormData) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.customer() })
      const previousCustomer = queryClient.getQueryData<HttpTypes.StoreCustomer | null>(
        queryKeys.customer()
      )

      if (previousCustomer) {
        const address = buildCustomerAddressFromFormData(formData)
        const optimisticAddress = {
          id: `optimistic-${Date.now()}`,
          ...address,
        } as HttpTypes.StoreCustomerAddress

        const optimisticCustomer = addCustomerAddressOptimistically(
          previousCustomer,
          optimisticAddress
        )
        queryClient.setQueryData(queryKeys.customer(), optimisticCustomer)
      }

      return { previousCustomer }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCustomer) {
        queryClient.setQueryData(queryKeys.customer(), context.previousCustomer)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customer() })
    },
  })
}

export const useUpdateCustomerAddress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      addressId,
      formData,
    }: {
      addressId: string
      formData: FormData
    }) => updateCustomerAddress({ addressId }, formData),
    onMutate: async (variables: { addressId: string; formData: FormData }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.customer() })
      const previousCustomer = queryClient.getQueryData<HttpTypes.StoreCustomer | null>(
        queryKeys.customer()
      )

      if (previousCustomer) {
        const addressUpdate = buildCustomerAddressFromFormData(variables.formData)
        const optimisticCustomer = updateCustomerAddressOptimistically(
          previousCustomer,
          variables.addressId,
          addressUpdate
        )
        queryClient.setQueryData(queryKeys.customer(), optimisticCustomer)
      }

      return { previousCustomer }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCustomer) {
        queryClient.setQueryData(queryKeys.customer(), context.previousCustomer)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customer() })
    },
  })
}

export const useDeleteCustomerAddress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ addressId }: { addressId: string }) => deleteCustomerAddress(addressId),
    onMutate: async (variables: { addressId: string }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.customer() })
      const previousCustomer = queryClient.getQueryData<HttpTypes.StoreCustomer | null>(
        queryKeys.customer()
      )

      if (previousCustomer) {
        const optimisticCustomer = removeCustomerAddressOptimistically(
          previousCustomer,
          variables.addressId
        )
        queryClient.setQueryData(queryKeys.customer(), optimisticCustomer)
      }

      return { previousCustomer }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCustomer) {
        queryClient.setQueryData(queryKeys.customer(), context.previousCustomer)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customer() })
    },
  })
}
