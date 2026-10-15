import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { ENV } from "@/shared/config/env";
import { ROUTES } from "@/shared/config/routes";
import {
  Code2,
  Compass,
  Layers,
  ShieldCheck,
  Sparkles,
  Terminal,
  LogIn,
  UserPlus,
  LayoutDashboard,
  ExternalLink,
} from "lucide-react";

export function HomePageView() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100 selection:bg-indigo-500 selection:text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[140px]" />

      <main className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        {/* Top Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Next.js 15 • Feature-Sliced Design (FSD) • Enterprise Architecture</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mt-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Nexus <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">Frontend</span> 🚀
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
            Khung sườn Frontend hoàn chỉnh, đã tích hợp đầy đủ API Request/Response chuẩn Clean Architecture.
          </p>

          {/* Action Navigation Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={ROUTES.AUTH.LOGIN}>
              <Button
                variant="primary"
                className="px-5 py-2.5 rounded-xl flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/20"
              >
                <LogIn className="h-4 w-4" />
                Đăng Nhập
              </Button>
            </Link>

            <Link href={ROUTES.AUTH.REGISTER}>
              <Button
                variant="outline"
                className="px-5 py-2.5 rounded-xl flex items-center gap-2 border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:text-white hover:bg-zinc-800"
              >
                <UserPlus className="h-4 w-4" />
                Đăng Ký Tài Khoản
              </Button>
            </Link>

            <Link href={ROUTES.DASHBOARD.ROOT}>
              <Button
                variant="secondary"
                className="px-5 py-2.5 rounded-xl flex items-center gap-2 border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white"
              >
                <LayoutDashboard className="h-4 w-4 text-indigo-400" />
                Vào Dashboard
              </Button>
            </Link>
          </div>

          {/* Backend Status indicator */}
          <div className="mx-auto mt-8 flex max-w-md items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 px-4 text-left shadow-inner">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
              </span>
              <div>
                <p className="text-xs font-semibold text-zinc-200">API Gateway URL</p>
                <p className="font-mono text-xs text-zinc-400">{ENV.API_URL}</p>
              </div>
            </div>
            <a
              href={`${ENV.API_URL}/swagger`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-1 text-[11px] font-mono text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              <span>Swagger</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* FSD Architecture Cards */}
        <div className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-indigo-400" />
              Cấu Trúc Các Tầng Feature-Sliced Design (FSD)
            </h2>
            <span className="text-xs text-zinc-400">Đã nối API trực tiếp</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 mb-2">
                  <Compass className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">1. src/app/</CardTitle>
                <CardDescription>Next.js App Router</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-zinc-400 leading-relaxed">
                Đóng vai trò định tuyến URL và Server Root (/login, /register, /dashboard). Bọc AuthProvider toàn cục.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 mb-2">
                  <Code2 className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">2. src/views/</CardTitle>
                <CardDescription>FSD Pages Layer</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-zinc-400 leading-relaxed">
                Giao diện toàn bộ của từng trang: HomePageView, LoginPageView, RegisterPageView, DashboardPageView.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 mb-2">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">3. features & entities</CardTitle>
                <CardDescription>Domain & Use Cases</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-zinc-400 leading-relaxed">
                Chứa authService, userService, LoginForm, RegisterForm, UserListTable, UserCard, UserBadge.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 mb-2">
                  <Terminal className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">4. src/shared/</CardTitle>
                <CardDescription>Re-usable Utilities</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-zinc-400 leading-relaxed">
                Axios apiClient với Interceptors tự động Bearer Token & bắt lỗi 401, quản lý cookie kép, TypeScript DTOs.
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick API Cheat Sheet Section */}
        <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            ⚡ Danh Sách Các API Đã Được Tích Hợp (feresponse.md)
          </h3>
          <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2 font-mono">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3.5">
              <span className="text-emerald-400 font-bold">POST</span> /api/v1/auth/register
              <p className="text-zinc-500 text-[11px] font-sans mt-1">Đăng ký tài khoản mới (Active ngay không cần verify mail)</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3.5">
              <span className="text-indigo-400 font-bold">POST</span> /api/v1/auth/login
              <p className="text-zinc-500 text-[11px] font-sans mt-1">Đăng nhập xác thực JWT Access Token</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3.5">
              <span className="text-sky-400 font-bold">GET</span> /api/v1/admin/users
              <p className="text-zinc-500 text-[11px] font-sans mt-1">Lấy danh sách người dùng kèm tìm kiếm và phân trang (Public)</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3.5">
              <span className="text-purple-400 font-bold">GET</span> /api/v1/users/me
              <p className="text-zinc-500 text-[11px] font-sans mt-1">Lấy hồ sơ cá nhân hiện tại (Yêu cầu Bearer Token)</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
