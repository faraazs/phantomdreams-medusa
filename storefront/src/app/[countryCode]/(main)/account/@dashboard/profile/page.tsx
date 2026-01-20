import { Metadata } from "next"

import ProfileClient from "./profile-client"

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your Medusa Store profile.",
}

export default function Profile() {
  return <ProfileClient />
}
