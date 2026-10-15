"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/features/auth";
import { UserCard } from "@/entities/user";
import { UserListTable } from "@/features/users";
import { ROUTES } from "@/shared/config/routes";
import { ENV } from "@/shared/config/env";
import {
  LogOut,
  ExternalLink,
  Layers,
  Home,
  UserCheck,
} from "lucide-react";

export function DashboardPageView() {
  const { user, logout, isLoading, refreshProfile } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.HOME}
              className="flex items-center gap-2 text-white font-bold tracking-tight hover:opacity-90 transition-opacity"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20">
                <Layers className="h-5 w-5" />
              </div>
              <span>Nexus Web</span>
            </Link>
            <span className="hidden sm:inline-block rounded-md bg-zinc-800/80 px-2 py-0.5 text-[11px] font-mono text-zinc-400 border border-zinc-700/50">
              Clean Architecture + FSD
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.HOME}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <Home className="h-3.5 w-3.5" />
              Trang Chủ
            </Link>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 text-xs font-medium text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Backend Info Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
            </span>
            <div className="text-xs">
              <span className="font-semibold text-zinc-200">API Gateway Endpoint: </span>
              <code className="text-indigo-400 font-mono">{ENV.API_URL}</code>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`${ENV.API_URL}/swagger`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-indigo-400 transition-colors"
            >
              <span>Swagger UI</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* User Profile Section (GetMe) */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-indigo-400" />
              Hồ Sơ Cá Nhân (API: <code>GET /api/v1/users/me</code>)
            </h2>
            <button
              onClick={() => refreshProfile()}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
              Cập nhật hồ sơ
            </button>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 text-center text-xs text-zinc-400 animate-pulse">
              Đang xác thực và tải thông tin hồ sơ người dùng từ token JWT...
            </div>
          ) : user ? (
            <div className="max-w-2xl">
              <UserCard user={user} />
            </div>
          ) : (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-xs text-amber-300">
              Chưa thể tải dữ liệu cá nhân từ <code>/api/v1/users/me</code>. Vui lòng kiểm tra lại trạng thái Backend hoặc đăng nhập lại.
            </div>
          )}
        </section>

        {/* All Users List Section (Admin / Public) */}
        <section>
          <UserListTable />
        </section>
      </main>
    </div>
  );
}
