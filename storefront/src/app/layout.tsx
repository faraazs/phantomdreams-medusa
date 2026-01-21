import { getBaseURL } from "@lib/util/env"
import { getFonts } from "@lib/site-config"
import { Metadata } from "next"
import "styles/globals.css"
import Providers from "./providers"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const fonts = getFonts()
  
  return (
    <html lang="en" data-mode="light">
      <head>
        {fonts.heading.url && (
          <link rel="preconnect" href="https://fonts.googleapis.com" />
        )}
        {fonts.heading.url && (
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        )}
        {fonts.heading.url && <link href={fonts.heading.url} rel="stylesheet" />}
        {fonts.body.url !== fonts.heading.url && fonts.body.url && (
          <link href={fonts.body.url} rel="stylesheet" />
        )}
      </head>
      <body>
        <Providers>
          <main className="relative">{props.children}</main>
        </Providers>
      </body>
    </html>
  )
}
