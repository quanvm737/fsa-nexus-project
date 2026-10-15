'use client'; // ⚠️ BẮT BUỘC: Next.js Error Components PHẢI là Client Component

/**
 * ============================================================
 *  error.tsx — Global Error Boundary (Trang lỗi hệ thống)
 * ============================================================
 *
 * ❓ FILE NÀY LÀM GÌ?
 * --------------------
 * Next.js App Router tự động sử dụng file này làm "lưới hứng lỗi"
 * khi có runtime error xảy ra trong BẤT KỲ component nào bên trong
 * cùng thư mục (src/app/).
 *
 * Nó hoạt động giống React Error Boundary nhưng được Next.js quản lý.
 *
 * ❓ KHI NÀO ĐƯỢC KÍCH HOẠT?
 * ---------------------------
 *  - Component ném ra exception khi render (throw new Error(...))
 *  - useEffect ném ra lỗi không được bắt
 *  - Server Action thất bại và ném lỗi
 *  - fetch() thất bại không được xử lý
 *
 * ✅ PROPS ĐƯỢC TRUYỀN VÀO TỰ ĐỘNG BỞI NEXT.JS:
 *  - error  → Đối tượng Error chứa message và stack trace
 *             + digest: mã lỗi unique do Next.js tạo ra (để tra log server)
 *  - reset  → Hàm () => void: Khi gọi, Next.js sẽ thử RE-RENDER lại
 *             segment bị lỗi (không reload toàn trang!)
 *
 * 📦 CẤU TRÚC PHÂN CẤP ERROR.TSX:
 * ─────────────────────────────────
 *  src/app/error.tsx              ← Bắt lỗi toàn app (file này)
 *  src/app/dashboard/error.tsx    ← Chỉ bắt lỗi trong /dashboard/*
 *  src/app/auth/error.tsx         ← Chỉ bắt lỗi trong /auth/*
 *
 *  → Lỗi sẽ được bắt bởi error.tsx GẦN NHẤT, rồi "bubble up" lên trên
 *
 * 🚧 TRẠNG THÁI: SKELETON — Cần hoàn thiện giao diện sau
 * ============================================================
 */

import type { FC } from 'react';

// ─── Kiểu Props bắt buộc theo chuẩn Next.js ─────────────────────────
interface ErrorPageProps {
  error: Error & {
    digest?: string; // Mã lỗi unique của Next.js (dùng để tra server logs)
  };
  reset: () => void; // Gọi hàm này để thử render lại component bị lỗi
}

// ─── Component Error Page ─────────────────────────────────────────────
const ErrorPage: FC<ErrorPageProps> = ({ error, reset }) => {
  // TODO: Tích hợp error monitoring service (Sentry, Datadog, etc.)
  // Ví dụ: Sentry.captureException(error);

  return (
    <div>
      {/* TODO: Thay thế bằng giao diện Error Page đẹp hơn */}
      <h1>Đã xảy ra lỗi!</h1>
      <p>{error.message}</p>
      {error.digest && <small>Mã lỗi: {error.digest}</small>}
      <button onClick={reset}>Thử lại</button>
    </div>
  );
};

export default ErrorPage;
