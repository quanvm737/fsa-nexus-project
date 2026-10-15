"use client";

import React from "react";
import Link from "next/link";
import { RegisterForm } from "@/features/auth";
import { ROUTES } from "@/shared/config/routes";
import { ArrowLeft, Sparkles } from "lucide-react";

export function RegisterPageView() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-zinc-950 text-zinc-100 p-6 overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-purple-500/15 blur-[140px]" />

      <div className="w-full max-w-md mb-6">
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Quay lại Trang Chủ
        </Link>
      </div>

      <RegisterForm />

      <div className="mt-8 text-center text-xs text-zinc-500 flex items-center gap-2 justify-center">
        <Sparkles className="h-3 w-3 text-purple-400" />
        <span>Hỗ trợ mã hóa Argon2id & kích hoạt Active tự động</span>
      </div>
    </div>
  );
}
