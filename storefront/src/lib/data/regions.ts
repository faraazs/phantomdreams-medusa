"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"

export const listRegions = async function () {
  return sdk.store.region
    .list({}, { cache: "no-store" as any })
    .then(({ regions }) => regions)
    .catch(medusaError)
}

export const retrieveRegion = async function (id: string) {
  return sdk.store.region
    .retrieve(id, {}, { cache: "no-store" as any })
    .then(({ region }) => region)
    .catch(medusaError)
}

export const getRegion = async function (countryCode: string) {
  try {
    const regions = await listRegions()

    if (!regions) {
      return null
    }

    const regionMap = new Map<string, HttpTypes.StoreRegion>()

    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        regionMap.set(c?.iso_2 ?? "", region)
      })
    })

    const region = countryCode
      ? regionMap.get(countryCode)
      : regionMap.get("us")

    return region
  } catch (e: any) {
    return null
  }
}
