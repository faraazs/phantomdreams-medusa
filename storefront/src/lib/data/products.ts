import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { cache } from "react"
import { getRegion } from "./regions"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { sortProducts } from "@lib/util/sort-products"

export const PRODUCT_LIST_FIELDS = [
  "id",
  "handle",
  "title",
  "thumbnail",
  "*images",
  "*variants.calculated_price",
].join(",")

export const PRODUCT_DETAIL_FIELDS = [
  "id",
  "handle",
  "title",
  "description",
  "thumbnail",
  "collection_id",
  "material",
  "origin_country",
  "weight",
  "length",
  "width",
  "height",
  "*collection",
  "*images",
  "*tags",
  "*type",
  "*options",
  "*options.values",
  "*variants.options",
  "variants.id",
  "variants.sku",
  "variants.title",
  "variants.manage_inventory",
  "variants.allow_backorder",
  "*variants.calculated_price",
  "+variants.inventory_quantity",
].join(",")

export const PRODUCT_PRICE_FIELDS = [
  "id",
  "handle",
  "*variants.calculated_price",
].join(",")

export const PRODUCT_ACTION_FIELDS = [
  "id",
  "handle",
  "title",
  "*options",
  "*options.values",
  "*variants.options",
  "variants.id",
  "variants.sku",
  "variants.title",
  "variants.manage_inventory",
  "variants.allow_backorder",
  "*variants.calculated_price",
  "+variants.inventory_quantity",
].join(",")

export const PRODUCT_LINE_ITEM_FIELDS = [
  "id",
  "handle",
  "thumbnail",
  "*images",
  "variants.id",
  "variants.title",
  "variants.manage_inventory",
  "*variants.calculated_price",
].join(",")

const salesChannelId = process.env.NEXT_PUBLIC_MEDUSA_SALES_CHANNEL_ID
const salesChannelParam = salesChannelId
  ? { sales_channel_id: salesChannelId }
  : {}

export const getProductsById = cache(async function ({
  ids,
  regionId,
  fields,
}: {
  ids: string[]
  regionId: string
  fields?: string
}) {
  return sdk.store.product
    .list(
      {
        id: ids,
        region_id: regionId,
        fields: fields ?? PRODUCT_PRICE_FIELDS,
        ...salesChannelParam,
      },
      { next: { tags: ["products"], revalidate: 300 } as any }
    )
    .then(({ products }) => products)
})

export const getProductByHandle = cache(async function (
  handle: string,
  regionId: string,
  fields: string = PRODUCT_DETAIL_FIELDS
) {
  const normalizedHandle = (() => {
    try {
      return decodeURIComponent(handle).toLowerCase()
    } catch {
      return handle.toLowerCase()
    }
  })()

  const initialResponse = await sdk.store.product.list(
    {
      handle: normalizedHandle,
      region_id: regionId,
      fields,
      limit: 1,
      ...salesChannelParam,
    },
    { next: { tags: ["products"], revalidate: 300 } as any }
  )

  const initialProduct = initialResponse.products?.[0]

  if (initialProduct?.handle?.toLowerCase() === normalizedHandle) {
    return initialProduct
  }

  const pageLimit = 100
  let offset = 0

  while (true) {
    const { products, count } = await sdk.store.product.list(
      {
        region_id: regionId,
        fields,
        limit: pageLimit,
        offset,
        ...salesChannelParam,
      },
      { next: { tags: ["products"], revalidate: 300 } as any }
    )

    const matchedProduct = products.find(
      (product) => product.handle?.toLowerCase() === normalizedHandle
    )
    if (matchedProduct) {
      return matchedProduct
    }

    offset += pageLimit
    if (!products.length || offset >= count) {
      break
    }
  }

  return null
})

export const getProductsList = cache(async function ({
  pageParam = 1,
  queryParams,
  countryCode,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> {
  const limit = queryParams?.limit || 12
  const validPageParam = Math.max(pageParam, 1);
  const offset = (validPageParam - 1) * limit
  const region = await getRegion(countryCode)

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }
  const { fields, ...restQueryParams } = queryParams ?? {}

  return sdk.store.product
    .list(
      {
        limit,
        offset,
        region_id: region.id,
        fields: fields ?? PRODUCT_LIST_FIELDS,
        ...salesChannelParam,
        ...restQueryParams,
      },
      { next: { tags: ["products"], revalidate: 300 } as any }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      }
    })
})

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const getProductsListWithSort = cache(async function ({
  page = 0,
  queryParams,
  sortBy = "created_at",
  countryCode,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> {
  const limit = queryParams?.limit || 12

  const {
    response: { products, count },
  } = await getProductsList({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    countryCode,
  })

  const sortedProducts = sortProducts(products, sortBy)

  const pageParam = (page - 1) * limit

  const nextPage = count > pageParam + limit ? pageParam + limit : null

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  }
})
