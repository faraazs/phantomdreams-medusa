import { Metadata } from "next"

import OverviewClient from "./overview-client"

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
}

export default function OverviewTemplate() {
  return <OverviewClient />
}
