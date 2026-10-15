import { apiClient, setStoredToken, clearStoredToken, getStoredToken } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import type {
  ApiResponse,
  UserProfile,
  LoginResponseData,
  RegisterPayload,
  LoginPayload,
} from "@/shared/types/api";

export const authService = {
  /**
   * Đăng ký tài khoản mới (Public)
   * POST /api/v1/auth/register
   */
  async register(payload: RegisterPayload): Promise<ApiResponse<UserProfile>> {
    return apiClient.post(API_ENDPOINTS.AUTH.REGISTER, payload);
  },

  /**
   * Đăng nhập lấy Bearer token (Public)
   * POST /api/v1/auth/login
   */
  async login(payload: LoginPayload): Promise<ApiResponse<LoginResponseData>> {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);
  },

  /**
   * Xem hồ sơ cá nhân hiện tại (GetMe) - Bắt buộc Bearer Token
   * GET /api/v1/users/me
   */
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    return apiClient.get(API_ENDPOINTS.USERS.ME);
  },

  setToken(token: string) {
    setStoredToken(token);
  },

  getToken(): string | null {
    return getStoredToken();
  },

  clearToken() {
    clearStoredToken();
  },
};
