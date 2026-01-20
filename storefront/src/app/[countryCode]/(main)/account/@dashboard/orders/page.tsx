import { Metadata } from "next"

import OrdersClient from "./orders-client"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

export default function Orders() {
  return <OrdersClient />
}
