"use client";

import React, { useState } from "react";
import { UserBadge } from "@/entities/user";
import {
  Layers,
  Shield,
  Store,
  Briefcase,
  ShoppingBag,
  Users,
  Database,
  Code2,
  Activity,
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart3,
  Server,
  FileSpreadsheet,
} from "lucide-react";

type RoleType = "admin" | "seller" | "staff" | "buyer";

interface RoleConfig {
  id: RoleType;
  title: string;
  badge: string;
  description: string;
  icon: React.ElementType;
  plannedFunctions: {
    name: string;
    description: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    targetFields: string[];
  }[];
}

const ROLES_DATA: Record<RoleType, RoleConfig> = {
  admin: {
    id: "admin",
    title: "Admin Portal",
    badge: "admin",
    description: "Quản trị hệ thống, phân quyền người dùng, kiểm soát cấu hình & logs",
    icon: Shield,
    plannedFunctions: [
      {
        name: "Quản lý người dùng & phân quyền",
        description: "Xem danh sách, khóa/mở tài khoản, cấp quyền",
        method: "GET",
        targetFields: ["user_id", "email", "full_name", "roles", "status", "created_at"],
      },
      {
        name: "Cấu hình hệ thống & tham số",
        description: "Quản lý biến môi trường, chính sách bảo mật",
        method: "PUT",
        targetFields: ["config_key", "config_value", "description", "updated_by"],
      },
      {
        name: "Giám sát hệ thống & Audit Logs",
        description: "Theo dõi hoạt động của tất cả các tài khoản",
        method: "GET",
        targetFields: ["log_id", "actor_id", "action", "ip_address", "timestamp", "payload"],
      },
    ],
  },
  seller: {
    id: "seller",
    title: "Seller Center",
    badge: "seller",
    description: "Quản lý gian hàng, danh mục sản phẩm, đơn hàng bán & doanh thu",
    icon: Store,
    plannedFunctions: [
      {
        name: "Quản lý danh mục & sản phẩm",
        description: "Đăng tải sản phẩm mới, cập nhật giá & tồn kho",
        method: "POST",
        targetFields: ["product_id", "title", "price", "stock_qty", "category_id", "images"],
      },
      {
        name: "Xử lý đơn đặt hàng",
        description: "Tiếp nhận đơn, cập nhật trạng thái vận chuyển",
        method: "GET",
        targetFields: ["order_id", "buyer_id", "items", "total_amount", "shipping_status"],
      },
      {
        name: "Báo cáo doanh số",
        description: "Thống kê doanh thu theo ngày/tháng",
        method: "GET",
        targetFields: ["period", "gross_revenue", "net_profit", "order_count"],
      },
    ],
  },
  staff: {
    id: "staff",
    title: "Staff Operations",
    badge: "staff",
    description: "Vận hành hỗ trợ, xử lý yêu cầu khiếu nại, duyệt nội dung & kiểm duyệt",
    icon: Briefcase,
    plannedFunctions: [
      {
        name: "Duyệt sản phẩm mới từ Seller",
        description: "Kiểm tra tiêu chuẩn nội dung trước khi publish",
        method: "PUT",
        targetFields: ["approval_id", "product_id", "status", "rejection_reason", "moderated_by"],
      },
      {
        name: "Hỗ trợ khách hàng & Khiếu nại",
        description: "Tiếp nhận ticket, hỗ trợ phản hồi giải quyết tranh chấp",
        method: "GET",
        targetFields: ["ticket_id", "requester_id", "subject", "priority", "status", "assigned_to"],
      },
      {
        name: "Kiểm soát giao dịch bất thường",
        description: "Phát hiện đơn hàng nghi ngờ gian lận",
        method: "GET",
        targetFields: ["alert_id", "transaction_id", "risk_score", "flag_reason", "created_at"],
      },
    ],
  },
  buyer: {
    id: "buyer",
    title: "Buyer Experience",
    badge: "buyer",
    description: "Khách hàng mua sắm, quản lý giỏ hàng, đặt hàng & lịch sử giao dịch",
    icon: ShoppingBag,
    plannedFunctions: [
      {
        name: "Khám phá & Tìm kiếm sản phẩm",
        description: "Lọc sản phẩm theo tiêu chí, giá bán, đánh giá",
        method: "GET",
        targetFields: ["product_id", "title", "rating", "price", "thumbnail", "seller_info"],
      },
      {
        name: "Giỏ hàng & Đặt hàng (Checkout)",
        description: "Thêm vào giỏ, chọn địa chỉ và thanh toán",
        method: "POST",
        targetFields: ["cart_items", "shipping_address", "payment_method", "coupon_code"],
      },
      {
        name: "Lịch sử đơn hàng & Tra cứu vận đơn",
        description: "Theo dõi tiến độ giao hàng và đánh giá sản phẩm",
        method: "GET",
        targetFields: ["order_id", "order_date", "total_price", "tracking_number", "status"],
      },
    ],
  },
};

export function DashboardPageView() {
  const [selectedRole, setSelectedRole] = useState<RoleType>("admin");
  const currentRole = ROLES_DATA[selectedRole];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-white font-bold tracking-tight">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-base sm:text-lg">Nexus Web</span>
            </div>
            <span className="hidden sm:inline-block rounded-md bg-zinc-800/80 px-2.5 py-0.5 text-[11px] font-mono text-zinc-400 border border-zinc-700/50">
              Clean Skeleton (FSD)
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="font-medium hidden sm:inline">UI Prototype Mode</span>
              <span className="font-medium sm:hidden">UI Mode</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner: Design Alignment Announcement */}
        <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-zinc-900/60 p-6 backdrop-blur-md">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Frontend Skeleton Workspace — 4 Roles System
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
                Frontend đã được dọn sạch toàn bộ kết nối API cũ. Sẵn sàng cho giai đoạn xác định các fields & màn hình của từng role trước khi Backend triển khai service APIs.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-mono text-zinc-300">
                FSD Layered
              </span>
            </div>
          </div>
        </div>

        {/* 4 Roles Selector Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-400" />
              Chọn Role Xem Giao Diện & Danh Sách Trường Cần Thiết
            </h2>
            <span className="text-xs text-zinc-500">4 phân quyền chính</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {(Object.keys(ROLES_DATA) as RoleType[]).map((roleKey) => {
              const role = ROLES_DATA[roleKey];
              const Icon = role.icon;
              const isSelected = selectedRole === roleKey;

              return (
                <button
                  key={roleKey}
                  onClick={() => setSelectedRole(roleKey)}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500"
                      : "border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected
                          ? "bg-indigo-500 text-white"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <UserBadge role={role.badge} />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{role.title}</h3>
                  <p className="mt-1 text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {role.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* High-level Metrics Skeleton */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
            <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
              <Activity className="h-3.5 w-3.5 text-indigo-400" />
              <span>Trạng thái kết nối</span>
            </div>
            <p className="text-lg font-bold text-white">Sườn Rỗng</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Không còn API cũ</p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
            <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
              <BarChart3 className="h-3.5 w-3.5 text-purple-400" />
              <span>Kiến trúc FSD</span>
            </div>
            <p className="text-lg font-bold text-white">Chuẩn Hóa</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Giữ khung .gitkeep</p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
            <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
              <Database className="h-3.5 w-3.5 text-pink-400" />
              <span>Quy trình mới</span>
            </div>
            <p className="text-lg font-bold text-white">Field First</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Liệt kê fields trước</p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
            <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
              <Server className="h-3.5 w-3.5 text-emerald-400" />
              <span>Backend Alignment</span>
            </div>
            <p className="text-lg font-bold text-white">4 Roles</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Tách biệt theo domain</p>
          </div>
        </section>

        {/* Selected Role Screen Functions & Field Specifications */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
            <div>
              <div className="flex items-center gap-2.5">
                <currentRole.icon className="h-5 w-5 text-indigo-400" />
                <h2 className="text-lg font-bold text-white">{currentRole.title} — Danh Sách Tính Năng & Fields Dự Kiến</h2>
                <UserBadge role={currentRole.badge} />
              </div>
              <p className="mt-1 text-xs text-zinc-400">
                Các field cần thiết để đội ngũ Backend trả về API tương ứng khi xây dựng services
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-800 text-xs font-mono text-zinc-300">
              <Code2 className="h-3.5 w-3.5 text-indigo-400" />
              {currentRole.plannedFunctions.length} Functions
            </span>
          </div>

          <div className="space-y-4">
            {currentRole.plannedFunctions.map((fn, index) => (
              <div
                key={index}
                className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-4 transition-colors hover:border-zinc-700"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          fn.method === "GET"
                            ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                            : fn.method === "POST"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {fn.method}
                      </span>
                      <h4 className="text-sm font-semibold text-white">{fn.name}</h4>
                    </div>
                    <p className="text-xs text-zinc-400">{fn.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Chờ Backend Service</span>
                  </div>
                </div>

                {/* Target Fields List */}
                <div className="mt-3 pt-3 border-t border-zinc-800/60">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-300 mb-2">
                    <FileSpreadsheet className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Fields Cần Thiết Trong Response / DTO:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {fn.targetFields.map((field) => (
                      <span
                        key={field}
                        className="rounded-md bg-zinc-900 px-2 py-1 font-mono text-[11px] text-indigo-300 border border-zinc-800"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture Status Footer */}
        <section className="rounded-xl border border-zinc-800/60 bg-zinc-900/20 p-4 text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>FSD Layout: <code>src/app</code>, <code>src/views</code>, <code>src/entities</code>, <code>src/features</code>, <code>src/shared</code></span>
          </div>
          <div>
            <span>Nexus Web Frontend Skeleton • Sẵn sàng code màn hình & nhận API mới</span>
          </div>
        </section>
      </main>
    </div>
  );
}
