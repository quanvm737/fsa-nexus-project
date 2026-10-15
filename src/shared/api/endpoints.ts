/**
 * ============================================================
 *  shared/api/endpoints.ts — URL API Gateway theo feresponse.md
 * ============================================================
 */

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",
  },
  USERS: {
    LIST: "/api/v1/admin/users",
    ME: "/api/v1/users/me",
  },
} as const;
