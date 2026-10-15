import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ─── Docker Production Output ──────────────────────────────────────
  // output: 'standalone' tạo ra thư mục .next/standalone chứa toàn bộ
  // app + dependencies cần thiết để chạy, không cần cài lại node_modules.
  // Dockerfile của chúng ta sẽ copy thư mục này vào production image.
  // TODO: Uncomment dòng dưới khi chuẩn bị build Docker image
  // output: 'standalone',
};

export default nextConfig;
