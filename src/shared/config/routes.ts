/**
 * ============================================================
 *  ROUTES — Bản đồ URL tập trung của toàn bộ ứng dụng Nexus
 * ============================================================
 *
 * ❓ TẠI SAO CẦN FILE NÀY?
 * ------------------------
 * Thay vì gõ hard-code chuỗi "/login" hay "/dashboard/users" rải rác
 * khắp nơi trong code, ta tập trung TẤT CẢ URL vào 1 file duy nhất.
 *
 * ✅ LỢI ÍCH:
 *  1. DRY (Don't Repeat Yourself): Đổi URL 1 lần → áp dụng toàn app
 *  2. Type-safe: TypeScript báo lỗi ngay nếu dùng sai route
 *  3. Autocomplete: IDE gợi ý ROUTES.AUTH.LOGIN thay vì phải nhớ chuỗi
 *  4. Dễ tìm: Xem file này là biết ngay toàn bộ URL có trong hệ thống
 *
 * 📦 CÁCH DÙNG:
 * ─────────────
 *  import { ROUTES } from '@/shared/config/routes';
 *
 *  // Trong component:
 *  <Link href={ROUTES.AUTH.LOGIN}>Đăng nhập</Link>
 *
 *  // Trong router.push:
 *  router.push(ROUTES.DASHBOARD.ROOT);
 *
 *  // Dynamic route với tham số:
 *  router.push(ROUTES.DASHBOARD.USER_DETAIL('abc-123'));
 *
 * 🔧 CÁCH MỞ RỘNG KHI THÊM TRANG MỚI:
 * ──────────────────────────────────────
 *  Ví dụ thêm trang quản lý xe hơi (/dashboard/vehicles):
 *
 *  DASHBOARD: {
 *    ROOT: '/dashboard',
 *    VEHICLES: {
 *      LIST: '/dashboard/vehicles',
 *      CREATE: '/dashboard/vehicles/new',
 *      DETAIL: (id: string) => `/dashboard/vehicles/${id}` as const,
 *    },
 *  }
 * ============================================================
 */

// ─── Public Routes (Không cần đăng nhập) ──────────────────────────
export const ROUTES = {
  HOME: '/',

  // ─── Auth Routes ──────────────────────────────────────────────────
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },

  // ─── Dashboard Routes (Cần đăng nhập) ────────────────────────────
  DASHBOARD: {
    ROOT: '/dashboard',
    // TODO: Thêm các sub-routes khi mở rộng tính năng
    // Ví dụ:
    // USERS: {
    //   LIST: '/dashboard/users',
    //   CREATE: '/dashboard/users/new',
    //   DETAIL: (id: string) => `/dashboard/users/${id}` as const,
    // },
  },

  // ─── API Routes (dùng cho middleware checks nếu cần) ─────────────
  // NOTE: Đây là frontend routes, KHÔNG phải backend API endpoints.
  //       Để quản lý API endpoints → xem src/shared/api/endpoints.ts

} as const;

// ─── Helper: Kiểm tra một pathname có phải protected route không ───
// Dùng trong middleware.ts để quyết định có cần redirect về /login không
export const PROTECTED_ROUTE_PREFIXES = [
  '/dashboard',
  // Thêm prefix khác khi có trang cần đăng nhập
] as const;

// ─── Helper: Kiểm tra một pathname có phải auth route không ─────────
// Dùng để redirect user đã login ra khỏi trang /login
export const AUTH_ROUTE_PREFIXES = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
] as const;

// ─── TypeScript Type Helpers ──────────────────────────────────────────
// Kiểu đại diện cho tất cả string routes (không phải hàm dynamic)
export type StaticRoute = string;
