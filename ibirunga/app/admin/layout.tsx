"use client";

import { Toaster } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminShell>{children}</AdminShell>
      <Toaster
        position="top-right"
        closeButton
        duration={5000}
        toastOptions={{
          duration: 5000,
          classNames: {
            toast:
              "font-sans !bg-white !text-[#2a1d14] !border !border-[#e8e2d8] !shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
            title: "!text-[#2a1d14] !font-semibold",
            description: "!text-[#5c5048]",
            success: "!border-l-4 !border-l-emerald-500",
            error: "!border-l-4 !border-l-red-600",
            warning: "!border-l-4 !border-l-amber-500",
            info: "!border-l-4 !border-l-[#6b4423]",
            closeButton:
              "!bg-white !border-[#e8e2d8] !text-[#6b635a] hover:!bg-[#faf8f4]",
          },
        }}
      />
    </>
  );
}
