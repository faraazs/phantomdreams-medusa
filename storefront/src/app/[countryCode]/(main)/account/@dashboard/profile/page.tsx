import { Metadata } from "next"

import ProfileClient from "./profile-client"
import { getSiteName } from "@lib/site-config"

export const metadata: Metadata = {
  title: "Profile",
  description: `View and edit your ${getSiteName()} profile.`,
}

export default function Profile() {
  return <ProfileClient />
}
