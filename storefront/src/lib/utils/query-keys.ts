type PaginationParams = {
  limit?: number
  offset?: number
}

export const queryKeys = {
  cart: (fields?: string) => ["cart", { fields: fields ?? null }],
  customer: () => ["customer"],
  orders: (params?: PaginationParams) => ["orders", params ?? {}],
  order: (id: string) => ["order", id],
  regions: () => ["regions"],
  region: (countryCode?: string) => ["region", countryCode ?? null],
  shippingOptions: (cartId: string) => ["shipping-options", cartId],
  paymentProviders: (regionId: string) => ["payment-providers", regionId],
  productById: (id: string, fields?: string, regionId?: string) => [
    "product",
    id,
    { fields: fields ?? null, regionId: regionId ?? null },
  ],
}
