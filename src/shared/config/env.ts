export const ENV = {
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Nexus Web",
  IS_PROD: process.env.NODE_ENV === "production",
} as const;
