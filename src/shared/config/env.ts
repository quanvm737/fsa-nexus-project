export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Nexus Web",
  IS_PROD: process.env.NODE_ENV === "production",
} as const;
