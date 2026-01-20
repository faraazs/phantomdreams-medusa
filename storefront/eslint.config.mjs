import { defineConfig, globalIgnores } from "eslint/config"
import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"

const eslintConfig = defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,
  globalIgnores([
    ".github/**",
    ".next/**",
    "build/**",
    "coverage/**",
    "e2e/**",
    "out/**",
    "next-env.d.ts",
    "check-env-variables.js",
    "next-sitemap.js",
    "next.config.js",
    "postcss.config.js",
    "tailwind.config.js",
  ]),
  {
    rules: {
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    files: ["**/*.{js,cjs,mjs}"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
])

export default eslintConfig
