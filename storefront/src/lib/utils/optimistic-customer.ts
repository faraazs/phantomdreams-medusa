import { HttpTypes } from "@medusajs/types"

type Customer = HttpTypes.StoreCustomer
type CustomerAddress = HttpTypes.StoreCustomerAddress

export const applyCustomerUpdateOptimistically = (
  customer: Customer,
  update: Partial<Customer>
) => {
  return {
    ...customer,
    ...update,
  }
}

export const addCustomerAddressOptimistically = (
  customer: Customer,
  address: CustomerAddress
) => {
  return {
    ...customer,
    addresses: [...(customer.addresses ?? []), address],
  }
}

export const updateCustomerAddressOptimistically = (
  customer: Customer,
  addressId: string,
  update: Partial<CustomerAddress>
) => {
  return {
    ...customer,
    addresses: (customer.addresses ?? []).map((address) =>
      address.id === addressId ? { ...address, ...update } : address
    ),
  }
}

export const removeCustomerAddressOptimistically = (
  customer: Customer,
  addressId: string
) => {
  return {
    ...customer,
    addresses: (customer.addresses ?? []).filter((address) => address.id !== addressId),
  }
}

export const buildCustomerAddressFromFormData = (
  formData: FormData
): Partial<CustomerAddress> => {
  const getValue = (key: string) => {
    const value = formData.get(key)
    if (typeof value === "string") {
      return value
    }

    const prefixedValue = formData.get(`billing_address.${key}`)
    return typeof prefixedValue === "string" ? prefixedValue : undefined
  }

  return {
    first_name: getValue("first_name"),
    last_name: getValue("last_name"),
    company: getValue("company"),
    address_1: getValue("address_1"),
    address_2: getValue("address_2"),
    city: getValue("city"),
    postal_code: getValue("postal_code"),
    province: getValue("province"),
    country_code: getValue("country_code"),
    phone: getValue("phone"),
  }
}
