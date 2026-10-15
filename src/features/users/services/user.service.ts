import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import type {
  ApiResponse,
  PagedData,
  UserProfile,
  UserQueryParams,
} from "@/shared/types/api";

export const userService = {
  /**
   * Lấy danh sách toàn bộ users kèm phân trang, tìm kiếm và lọc role
   * GET /api/v1/admin/users
   */
  async getAllUsers(params?: UserQueryParams): Promise<ApiResponse<PagedData<UserProfile>>> {
    return apiClient.get(API_ENDPOINTS.USERS.LIST, { params });
  },
};
