import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"
import { getSiteName } from "@lib/site-config"

export const metadata: Metadata = {
  title: "Sign in",
  description: `Sign in to your ${getSiteName()} account.`,
}

export default function Login() {
  return <LoginTemplate />
}
