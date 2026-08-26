"use client";

import { Toaster } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminShell>{children}</AdminShell>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast: "font-sans",
            success: "bg-[#6b4423]! text-white! border-[#54341a]!",
            error: "bg-red-700! text-white!",
          },
        }}
      />
    </>
  );
}
