import { Metadata } from "next"

import AddressesClient from "./addresses-client"

export const metadata: Metadata = {
  title: "Addresses",
  description: "View your addresses",
}

export default function Addresses({
  params,
}: {
  params: { countryCode: string }
}) {
  return <AddressesClient countryCode={params.countryCode} />
}
