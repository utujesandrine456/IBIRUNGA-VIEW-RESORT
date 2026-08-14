"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, setToken } from "@/lib/api";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

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
      const res = await api.login(email.trim(), password);
      setToken(res.accessToken);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      {/* Resort image panel */}
      <div className="relative min-h-80 lg:min-h-screen">
        <Image
          src="/LUCIMAGES_20.JPG"
          alt="Ibirunga View Resort"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
        <div className="absolute inset-0 bg-linear-to-br from-[#1a1612]/75 via-[#1a1612]/45 to-[#1a1612]/65" />
        <div className="absolute inset-0 bg-linear-to-t from-[#1a1612]/90 via-transparent to-transparent" />

        <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12 lg:p-14">
          <div>
            <Image
              src="/logo.png"
              alt="Ibirunga View Resort logo"
              width={64}
              height={64}
              className="brightness-0 invert"
              priority
            />
          </div>

          <div className="max-w-md">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#c19a6b] uppercase">
              Content Management System
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.75rem]">
              Ibirunga View Resort
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-white/75">
              Manage your homepage, rooms, bookings, and resort content in one secure admin workspace.
            </p>
          </div>

          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} Ibirunga View Resort. All rights reserved.
          </p>
        </div>
      </div>

      {/* Login form panel */}
      <div className="flex items-center justify-center bg-white px-6 py-12 md:px-12 lg:px-16">
        <div className="w-full max-w-105">
          <div className="mb-10 text-center lg:text-left">
            <div className="mb-6 inline-flex lg:hidden">
              <Image src="/logo.png" alt="" width={52} height={52} />
            </div>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#c19a6b] uppercase">
              Admin Access
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#2a1d14]">Sign in</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]">
              Enter your credentials to open the dashboard.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#2a1d14]">
                Email address
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#9a9a9a]">
                  <MailIcon />
                </span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#e8e4dc] bg-[#faf9f7] py-3.5 pr-4 pl-12 text-sm text-[#2a1d14] outline-none transition placeholder:text-[#9a9a9a] focus:border-[#6b4423] focus:bg-white focus:ring-4 focus:ring-[#6b4423]/8"
                  placeholder="you@ibirunga.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#2a1d14]">
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#9a9a9a]">
                  <LockIcon />
                </span>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-[#e8e4dc] bg-[#faf9f7] py-3.5 pr-4 pl-12 text-sm text-[#2a1d14] outline-none transition placeholder:text-[#9a9a9a] focus:border-[#6b4423] focus:bg-white focus:ring-4 focus:ring-[#6b4423]/8"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error ? (
              <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#6b4423] px-4 py-4 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:bg-[#54341a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in to dashboard"}
            </button>
          </form>

          <div className="mt-10 border-t border-[#ebe7df] pt-6">
            <p className="text-center text-xs leading-relaxed text-[#9a9a9a] lg:text-left">
              Secure admin area for authorized staff only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
