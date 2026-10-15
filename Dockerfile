# ============================================================
#  Dockerfile — Đóng gói ứng dụng Next.js thành Docker Image
# ============================================================
#
# ❓ FILE NÀY LÀM GÌ?
# --------------------
# Dockerfile là "công thức" hướng dẫn Docker cách tạo ra một
# Image chứa toàn bộ ứng dụng nexus-web ở trạng thái production-ready.
#
# Khi chạy lệnh: docker build -t nexus-web .
# Docker đọc file này từng bước, tạo ra một "container" có thể
# deploy lên bất kỳ server nào (AWS, GCP, VPS...) mà không cần
# cài Node.js hay npm trên server đó.
#
# 🔄 LUỒNG BUILD (Multi-stage Build Pattern):
# ─────────────────────────────────────────────
#  Stage 1 (deps):    Chỉ install npm dependencies
#  Stage 2 (builder): Build production bundle (npm run build)
#  Stage 3 (runner):  Image cuối nhỏ gọn, chỉ chứa output cần thiết
#
# ✅ LỢI ÍCH MULTI-STAGE:
#  - Image cuối chỉ ~100MB (thay vì ~1GB nếu copy cả node_modules!)
#  - Không lộ source code, chỉ có compiled output
#  - Bảo mật hơn (không có devDependencies trong production)
#
# 🚀 CÁCH DÙNG:
# ─────────────
#  # Build image:
#  docker build -t nexus-web:latest .
#
#  # Chạy container (port 3000):
#  docker run -p 3000:3000 --env-file .env.local nexus-web:latest
#
#  # Hoặc dùng docker-compose (xem docker-compose.yml):
#  docker-compose up nexus-web
#
# 🚧 TRẠNG THÁI: SKELETON — Sẽ hoàn thiện khi chuẩn bị deploy production
# ============================================================

# TODO: Uncomment và điều chỉnh khi cần build production image

# ─── Stage 1: Install Dependencies ───────────────────────────────────
# FROM node:20-alpine AS deps
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm ci --only=production

# ─── Stage 2: Build Application ───────────────────────────────────────
# FROM node:20-alpine AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# ENV NEXT_TELEMETRY_DISABLED=1
# RUN npm run build

# ─── Stage 3: Production Runner ───────────────────────────────────────
# FROM node:20-alpine AS runner
# WORKDIR /app
# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# USER nextjs
# EXPOSE 3000
# ENV PORT=3000
# CMD ["node", "server.js"]
