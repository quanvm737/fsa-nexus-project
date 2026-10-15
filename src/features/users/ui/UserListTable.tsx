"use client";

import React, { useState, useEffect, useCallback } from "react";
import { userService } from "../services/user.service";
import type { UserProfile, PaginationMetadata, ApiErrorResponse } from "@/shared/types/api";
import { UserBadge } from "@/entities/user";
import {
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Filter,
  Users as UsersIcon,
  AlertCircle,
  Loader2,
} from "lucide-react";

export const UserListTable: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [pagination, setPagination] = useState<PaginationMetadata>({
    pageIndex: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchUsers = useCallback(async (page = 1, query = searchQuery, role = selectedRole) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await userService.getAllUsers({
        page,
        pageSize: pagination.pageSize,
        q: query.trim() || undefined,
        role: role || undefined,
      });

      if (response && response.data) {
        setUsers(response.data.items || []);
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      }
    } catch (err: unknown) {
      const apiErr = err as ApiErrorResponse;
      setErrorMessage(
        apiErr?.detail || apiErr?.title || "Chưa thể kết nối tới API Gateway backend http://localhost:8000"
      );
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.pageSize, searchQuery, selectedRole]);

  useEffect(() => {
    fetchUsers(1, "", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(1, searchQuery, selectedRole);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);
    fetchUsers(1, searchQuery, newRole);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    fetchUsers(newPage, searchQuery, selectedRole);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md overflow-hidden">
      {/* Header bar */}
      <div className="p-5 border-b border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-indigo-400" />
            Danh Sách Người Dùng Hệ Thống
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Dữ liệu đồng bộ trực tiếp từ API Gateway (`GET /api/v1/admin/users`)
          </p>
        </div>

        <button
          onClick={() => fetchUsers(pagination.pageIndex)}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin text-indigo-400" : ""}`} />
          Làm mới
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-zinc-950/40 border-b border-zinc-800/80 flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo username, email, tên hiển thị..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 pl-10 pr-20 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[11px] font-medium text-white transition-colors"
          >
            Tìm
          </button>
        </form>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Filter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className="rounded-xl border border-zinc-800 bg-zinc-900/80 pl-9 pr-8 py-2 text-xs text-zinc-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none cursor-pointer"
            >
              <option value="">Tất cả vai trò</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error state */}
      {errorMessage && (
        <div className="m-4 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-200">Chưa tải được danh sách người dùng:</p>
            <p className="mt-0.5 text-zinc-400">{errorMessage}</p>
            <p className="mt-2 text-[11px] text-zinc-400 italic">
              (Khi bạn khởi chạy backend tại http://localhost:8000, danh sách sẽ tự động hiển thị dữ liệu thật).
            </p>
          </div>
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-950/60 text-zinc-400 uppercase font-semibold text-[11px] border-b border-zinc-800">
            <tr>
              <th className="py-3.5 px-4">Người dùng</th>
              <th className="py-3.5 px-4">Email</th>
              <th className="py-3.5 px-4">Vai trò</th>
              <th className="py-3.5 px-4">Trạng thái</th>
              <th className="py-3.5 px-4 font-mono">User ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-zinc-500">
                  <div className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                    <span>Đang tải dữ liệu từ API Gateway...</span>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-zinc-500">
                  Không tìm thấy người dùng nào phù hợp.
                </td>
              </tr>
            ) : (
              users.map((item) => {
                const initial = (item.displayName || item.email || "U")[0].toUpperCase();
                return (
                  <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-xs border border-indigo-500/30">
                          {initial}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{item.displayName || "—"}</div>
                          <div className="text-[11px] text-zinc-500">{item.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400">{item.email}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {item.roles && item.roles.length > 0 ? (
                          item.roles.map((r) => <UserBadge key={r} role={r} />)
                        ) : (
                          <span className="text-zinc-500 text-[11px]">Chưa gán</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {item.status || "Active"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-500">
                      {item.id.slice(0, 8)}...
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
        <div>
          Hiển thị trang <span className="font-semibold text-white">{pagination.pageIndex}</span> /{" "}
          <span className="font-semibold text-white">{pagination.totalPages || 1}</span> (Tổng{" "}
          <span className="font-semibold text-white">{pagination.totalCount}</span> người dùng)
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(pagination.pageIndex - 1)}
            disabled={!pagination.hasPreviousPage || isLoading}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Trước
          </button>
          <button
            onClick={() => handlePageChange(pagination.pageIndex + 1)}
            disabled={!pagination.hasNextPage || isLoading}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Sau
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
