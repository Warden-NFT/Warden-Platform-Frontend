declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_WARDEN_API_URL: string
      NEXT_PUBLIC_APP_URL: string
      NEXT_PUBLIC_SENTRY_DSN: string
      NEXT_PUBLIC_ALCHEMY_KEY: string
      SENTRY_AUTH_TOKEN: string

      GOOGLE_MAPS_API_KEY: string

      NEXT_PUBLIC_PINATA_BASE_API: string
      NEXT_PUBLIC_PINATA_API_KEY: string
      NEXT_PUBLIC_PINATA_JWT: string
      NEXT_PUBLIC_PINATA_SECRET: string

      VERCEL_ENV: "development" | "production"

      NEXT_PUBLIC_POLYGONSCAN_URL: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
