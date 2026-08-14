"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminButton, AdminCard, AdminInput, AdminPanel } from "@/components/admin/AdminUi";
import { api, setToken } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@ibirunga.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.login(email, password);
      setToken(res.accessToken);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1612] px-4">
      <AdminCard>
        <AdminPanel title="Admin Login" description="Sign in to manage Ibirunga View Resort content.">
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <AdminInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <AdminInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <AdminButton type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </AdminButton>
          </form>
        </AdminPanel>
      </AdminCard>
    </div>
  );
}
