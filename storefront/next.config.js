const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

const medusaBackendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
const medusaBackendHost = medusaBackendUrl?.replace(/^https?:\/\//, "")
const medusaBackendProtocol = medusaBackendUrl?.startsWith("https")
  ? "https"
  : "http"

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        
      },
      { // Note: needed to serve images from /public folder
        protocol: process.env.NEXT_PUBLIC_BASE_URL?.startsWith('https') ? 'https' : 'http',
        hostname: process.env.NEXT_PUBLIC_BASE_URL?.replace(/^https?:\/\//, ''),
      },
      ...(medusaBackendHost ? [{ // Note: only needed when using local-file for product media
        protocol: medusaBackendProtocol,
        hostname: medusaBackendHost,
      }] : []),
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      ...(process.env.NEXT_PUBLIC_MINIO_ENDPOINT ? [{ // Note: needed when using MinIO bucket storage for media
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
      }] : []),
    ],
  }
}

module.exports = nextConfig
