/**
 * ============================================================
 *  shared/api/client.ts — Axios HTTP Client (feresponse.md)
 * ============================================================
 */

import axios, { AxiosError } from "axios";
import { ENV } from "@/shared/config/env";
import type { ApiErrorResponse } from "@/shared/types/api";

// 1. Khởi tạo Axios Instance trỏ về API Gateway cổng 8000
export const apiClient = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Helper lấy token an toàn
export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

// Helper lưu token kép (localStorage cho Axios + Cookie cho Next.js Edge Middleware)
export function setStoredToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("accessToken", token);
  // Lưu Cookie với thời hạn 7 ngày để middleware.ts đọc được trên Edge Runtime
  document.cookie = `access_token=${token}; path=/; max-age=604800; samesite=lax`;
}

// Helper xóa token kép
export function clearStoredToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
  document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; samesite=lax";
}

// 2. Request Interceptor: Tự động đính kèm Bearer Token nếu có
apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. Response Interceptor: Trả thẳng data hoặc xử lý 401 tự động
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        clearStoredToken();
        if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
      }
      return Promise.reject(data || {
        title: error.message || "An error occurred",
        status: status,
        detail: "Request failed with status code " + status,
        timestamp: new Date().toISOString(),
      });
    }

    // Lỗi mạng hoặc không có response (Backend chưa bật)
    const networkError: ApiErrorResponse = {
      title: "Không thể kết nối đến máy chủ",
      status: 0,
      detail: error.message || "Vui lòng kiểm tra API Gateway http://localhost:8000",
      errorCode: "NETWORK_ERROR",
      timestamp: new Date().toISOString(),
    };
    return Promise.reject(networkError);
  }
);
