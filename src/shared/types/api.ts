/**
 * ============================================================
 *  shared/types/api.ts — Cấu trúc dữ liệu API chuẩn (feresponse.md)
 * ============================================================
 */

// ── Response Envelope Chung ────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  traceId: string;
  timestamp: string;
}

// ── Phân Trang ──────────────────────────────────────────────
export interface PaginationMetadata {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PagedData<T> {
  items: T[];
  pagination: PaginationMetadata;
}

// ── User DTOs ──────────────────────────────────────────────
export type UserRole = "buyer" | "seller" | "staff" | "admin";

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  roles: (UserRole | string)[];
  status: string;
  shopName?: string;
}

export interface LoginResponseData {
  accessToken: string;
  expiresAt: string;
  userId: string;
  roles: (UserRole | string)[];
}

// ── Request Payloads ────────────────────────────────────────
export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  displayName?: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface UserQueryParams {
  page?: number;
  pageSize?: number;
  q?: string;
  role?: string;
}

// ── Error Response Chuẩn RFC 7807 ──────────────────────────
export interface ApiErrorResponse {
  type?: string;
  title: string;
  status: number;
  errorCode?: string;
  detail?: string;
  errors?: Record<string, string[]>;
  traceId?: string;
  timestamp?: string;
}
