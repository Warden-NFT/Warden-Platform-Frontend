declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_WARDEN_ENVIRONMENT: "local" | "staging" | "production"
      NEXT_PUBLIC_WARDEN_API_URL: string
      NEXT_PUBLIC_APP_URL: string
      NEXT_PUBLIC_ALCHEMY_KEY: string
      GOOGLE_MAPS_API_KEY: string
      NEXT_PUBLIC_GCP_STORAGE_URL: string
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string
      NEXT_PUBLIC_RECAPTCHA_SECRET_KEY: string

      VERCEL_ENV: "development" | "production"

      NEXT_PUBLIC_POLYGONSCAN_URL: string
      NODE_ENV: "development" | "production"
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
