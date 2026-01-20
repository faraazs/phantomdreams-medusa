import { Metadata } from "next"
import CartClient from "./cart-client"

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
}

export default function Cart() {
  return <CartClient />
}
