import React from "react";
import { cn } from "@/shared/lib/utils";

interface UserBadgeProps {
  role: string;
  className?: string;
}

export const UserBadge: React.FC<UserBadgeProps> = ({ role, className }) => {
  const normalizedRole = role.toLowerCase();

  const roleStyles: Record<string, string> = {
    admin: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    seller: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    staff: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    buyer: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  };

  const currentStyle = roleStyles[normalizedRole] || "bg-zinc-500/10 text-zinc-400 border-zinc-500/30";

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize backdrop-blur-sm",
        currentStyle,
        className
      )}
    >
      {normalizedRole}
    </span>
  );
};
