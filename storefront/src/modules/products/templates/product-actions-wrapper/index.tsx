"use client"

import { PRODUCT_ACTION_FIELDS } from "@lib/data/products"
import { sdk } from "@lib/config"
import { queryKeys } from "@lib/utils/query-keys"
import { HttpTypes } from "@medusajs/types"
import ProductActions from "@modules/products/components/product-actions"
import { useQuery } from "@tanstack/react-query"

/**
 * Fetches real time pricing for a product and renders the product actions component.
 */
export default function ProductActionsWrapper({
  id,
  region,
}: {
  id: string
  region: HttpTypes.StoreRegion
}) {
  const { data: product } = useQuery({
    queryKey: queryKeys.productById(id, PRODUCT_ACTION_FIELDS, region.id),
    queryFn: async () => {
      const { products } = await sdk.store.product.list({
        id: [id],
        region_id: region.id,
        fields: PRODUCT_ACTION_FIELDS,
      })

      return products?.[0] ?? null
    },
    staleTime: 0,
    suspense: true,
  })

  if (!product) {
    return null
  }

  return <ProductActions product={product} region={region} />
}
