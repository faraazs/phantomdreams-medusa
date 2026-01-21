import siteConfigData from "../../siteConfig.json"

export interface ColorShades {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}

export interface FontConfig {
  family: string
  url: string
}

export interface SiteConfig {
  site: {
    name: string
    tagline: string
  }
  social: {
    twitter: string
    instagram: string
    tiktok: string
    facebook: string
    youtube: string
    bluesky: string
  }
  theme: {
    colors: {
      primary: ColorShades
      secondary: ColorShades
      accent: ColorShades
    }
    fonts: {
      heading: FontConfig
      body: FontConfig
    }
  }
}

export const siteConfig: SiteConfig = siteConfigData as SiteConfig

// Helper functions
export const getSiteName = (): string => {
  return siteConfig.site.name || "Store"
}

export const getSiteTagline = (): string => {
  return siteConfig.site.tagline || ""
}

export const getSocialLinks = () => {
  return Object.entries(siteConfig.social)
    .filter(([_, url]) => url && url.trim() !== "")
    .map(([platform, url]) => ({
      platform: platform as keyof typeof siteConfig.social,
      url,
    }))
}

export const getThemeColors = () => {
  return siteConfig.theme.colors
}

export const getFonts = () => {
  return siteConfig.theme.fonts
}

export default siteConfig
