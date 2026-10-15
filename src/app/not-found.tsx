import Link from "next/link";
import { Button } from "@/shared/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-center text-zinc-100">
      <h1 className="text-7xl font-extrabold text-indigo-500">404</h1>
      <h2 className="mt-4 text-2xl font-bold tracking-tight">Trang không tồn tại</h2>
      <p className="mt-2 text-sm text-zinc-400">Trang bạn đang tìm kiếm hiện chưa được tạo hoặc đã di chuyển.</p>
      <div className="mt-6">
        <Link href="/">
          <Button variant="primary">Trở về Trang chủ</Button>
        </Link>
      </div>
    </div>
  );
}
