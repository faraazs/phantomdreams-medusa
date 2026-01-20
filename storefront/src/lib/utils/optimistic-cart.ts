import { HttpTypes } from "@medusajs/types"

type CartLineItem = HttpTypes.StoreCartLineItem
type Cart = HttpTypes.StoreCart

type AddLineItemInput = {
  product: HttpTypes.StoreProduct
  variant: HttpTypes.StoreProductVariant
  quantity: number
}

const getLineItemUnitPrice = (item: CartLineItem) => {
  if (typeof item.unit_price === "number") {
    return item.unit_price
  }

  const calculatedAmount = item.variant?.calculated_price?.calculated_amount
  if (typeof calculatedAmount === "number") {
    return calculatedAmount
  }

  if (typeof item.total === "number" && item.quantity) {
    return Math.round(item.total / item.quantity)
  }

  return 0
}

const getLineItemTotal = (item: CartLineItem, quantity = item.quantity) => {
  return getLineItemUnitPrice(item) * quantity
}

const recalculateTotals = (cart: Cart, items: CartLineItem[]) => {
  const itemSubtotal = items.reduce((sum, item) => sum + getLineItemTotal(item), 0)
  const shippingTotal = cart.shipping_total ?? 0
  const taxTotal = cart.tax_total ?? 0
  const discountTotal = cart.discount_total ?? 0
  const giftCardTotal = cart.gift_card_total ?? 0

  return {
    ...cart,
    items,
    item_subtotal: itemSubtotal,
    subtotal: itemSubtotal,
    total: itemSubtotal + shippingTotal + taxTotal - discountTotal - giftCardTotal,
  }
}

export const addLineItemOptimistically = (cart: Cart, input: AddLineItemInput) => {
  const { product, variant, quantity } = input
  const items = [...(cart.items ?? [])]
  const existingIndex = items.findIndex((item) => item.variant_id === variant.id)

  if (existingIndex >= 0) {
    const existingItem = items[existingIndex]
    const newQuantity = existingItem.quantity + quantity
    items[existingIndex] = {
      ...existingItem,
      quantity: newQuantity,
      total: getLineItemTotal(existingItem, newQuantity),
      updated_at: new Date(),
    }
  } else {
    const unitPrice = variant.calculated_price?.calculated_amount ?? 0
    const optimisticItem = {
      id: `optimistic-${variant.id}-${Date.now()}`,
      cart_id: cart.id,
      product_id: product.id,
      variant_id: variant.id,
      title: product.title,
      product_title: product.title,
      quantity,
      unit_price: unitPrice,
      total: unitPrice * quantity,
      created_at: new Date(),
      updated_at: new Date(),
      metadata: {},
      requires_shipping: true,
      is_discountable: true,
      is_tax_inclusive: false,
      variant: {
        ...variant,
        product: {
          id: product.id,
          handle: product.handle,
          title: product.title,
          thumbnail: product.thumbnail,
          images: product.images,
        },
      },
    } as CartLineItem

    items.push(optimisticItem)
  }

  return recalculateTotals(cart, items)
}

export const updateLineItemOptimistically = (
  cart: Cart,
  lineId: string,
  quantity: number
) => {
  const items = (cart.items ?? []).map((item) => {
    if (item.id !== lineId) {
      return item
    }

    return {
      ...item,
      quantity,
      total: getLineItemTotal(item, quantity),
      updated_at: new Date(),
    }
  })

  return recalculateTotals(cart, items)
}

export const removeLineItemOptimistically = (cart: Cart, lineId: string) => {
  const items = (cart.items ?? []).filter((item) => item.id !== lineId)
  return recalculateTotals(cart, items)
}

export const applyShippingMethodOptimistically = (
  cart: Cart,
  shippingOption?: HttpTypes.StoreCartShippingOption | null
) => {
  if (!shippingOption) {
    return cart
  }

  const shippingMethods = [
    ...(cart.shipping_methods ?? []).filter(
      (method) => method.shipping_option_id !== shippingOption.id
    ),
    {
      id: `optimistic-${shippingOption.id}`,
      shipping_option_id: shippingOption.id,
      shipping_option: shippingOption,
      amount: shippingOption.amount ?? 0,
    },
  ] as HttpTypes.StoreCartShippingMethod[]

  const updatedCart = {
    ...cart,
    shipping_methods: shippingMethods,
    shipping_total: shippingOption.amount ?? 0,
  }

  return recalculateTotals(updatedCart, updatedCart.items ?? [])
}

export const applyPromotionsOptimistically = (cart: Cart, codes: string[]) => {
  const normalizedCodes = codes.filter((code): code is string => typeof code === "string")
  const automaticPromotions = (cart.promotions ?? []).filter((promotion) =>
    Boolean(promotion.is_automatic)
  )

  const existingByCode = new Map(
    (cart.promotions ?? [])
      .filter((promotion) => promotion.code)
      .map((promotion) => [promotion.code, promotion])
  )

  const manualPromotions = normalizedCodes.map((code) => {
    const existing = existingByCode.get(code)
    if (existing) {
      return existing
    }

    return {
      id: `optimistic-${code}-${Date.now()}`,
      code,
      is_automatic: false,
    } as HttpTypes.StorePromotion
  })

  return {
    ...cart,
    promotions: [...automaticPromotions, ...manualPromotions],
  }
}

const getAddressValue = (
  formData: FormData,
  key: string,
  fallback?: string | null
) => {
  const value = formData.get(key)
  if (typeof value === "string" && value.length > 0) {
    return value
  }
  return fallback ?? undefined
}

const buildAddress = (
  formData: FormData,
  prefix: string,
  fallback?: HttpTypes.StoreCartAddress | null
) => {
  return {
    first_name: getAddressValue(
      formData,
      `${prefix}.first_name`,
      fallback?.first_name ?? undefined
    ),
    last_name: getAddressValue(
      formData,
      `${prefix}.last_name`,
      fallback?.last_name ?? undefined
    ),
    company: getAddressValue(
      formData,
      `${prefix}.company`,
      fallback?.company ?? undefined
    ),
    address_1: getAddressValue(
      formData,
      `${prefix}.address_1`,
      fallback?.address_1 ?? undefined
    ),
    address_2: getAddressValue(
      formData,
      `${prefix}.address_2`,
      fallback?.address_2 ?? undefined
    ),
    postal_code: getAddressValue(
      formData,
      `${prefix}.postal_code`,
      fallback?.postal_code ?? undefined
    ),
    city: getAddressValue(
      formData,
      `${prefix}.city`,
      fallback?.city ?? undefined
    ),
    province: getAddressValue(
      formData,
      `${prefix}.province`,
      fallback?.province ?? undefined
    ),
    country_code: getAddressValue(
      formData,
      `${prefix}.country_code`,
      fallback?.country_code ?? undefined
    ),
    phone: getAddressValue(
      formData,
      `${prefix}.phone`,
      fallback?.phone ?? undefined
    ),
  }
}

export const applyAddressesOptimistically = (cart: Cart, formData: FormData) => {
  const sameAsBilling = formData.get("same_as_billing") === "on"
  const shippingAddress = buildAddress(
    formData,
    "shipping_address",
    cart.shipping_address
  )
  const billingAddress = sameAsBilling
    ? shippingAddress
    : buildAddress(formData, "billing_address", cart.billing_address)

  return {
    ...cart,
    shipping_address: shippingAddress,
    billing_address: billingAddress,
    email: getAddressValue(formData, "email", cart.email),
  }
}
