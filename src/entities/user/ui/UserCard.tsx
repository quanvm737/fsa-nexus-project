import React from "react";
import type { UserProfile } from "@/shared/types/api";
import { UserBadge } from "./UserBadge";
import { Card, CardContent } from "@/shared/ui/card";
import { Mail, User as UserIcon } from "lucide-react";

interface UserCardProps {
  user: UserProfile;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const initial = (user.displayName || user.email || "U")[0].toUpperCase();

  return (
    <Card className="border border-zinc-800 bg-zinc-900/60 backdrop-blur-md overflow-hidden relative">
      <div className="absolute top-0 right-0 h-28 w-28 bg-indigo-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/20">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-white truncate">
                {user.displayName || "Người dùng"}
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {user.status || "Active"}
              </span>
            </div>

            <div className="mt-2 space-y-1.5 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserIcon className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                <span className="font-mono text-[11px] text-zinc-500 truncate">ID: {user.id}</span>
              </div>
            </div>

            {user.roles && user.roles.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {user.roles.map((r) => (
                  <UserBadge key={r} role={r} />
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
