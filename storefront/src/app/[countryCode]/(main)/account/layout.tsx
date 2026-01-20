import AccountLayoutClient from "./account-layout-client"

export default function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
}) {
  return <AccountLayoutClient dashboard={dashboard} login={login} />
}
