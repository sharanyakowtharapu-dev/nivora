"use client";

import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Invalid email or password.");
        return;
}

window.location.href = "/dashboard";
    } catch {
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f9f7] flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1d6b55] text-2xl font-bold text-white">
            N
          </div>

          <h1 className="mt-5 text-3xl font-bold text-[#102a43]">
            Welcome back to Nivora
          </h1>

          <p className="mt-2 text-[#667871]">
            Continue building your financial foundation.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-[#dce7e2] bg-white p-8 shadow-sm">
          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-[#102a43]">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-[#d5e1dc] px-4 py-3 outline-none transition focus:border-[#1d6b55] focus:ring-2 focus:ring-[#1d6b55]/20"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-[#102a43]">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-[#d5e1dc] px-4 py-3 outline-none transition focus:border-[#1d6b55] focus:ring-2 focus:ring-[#1d6b55]/20"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#1d6b55] py-3 font-semibold text-white transition hover:bg-[#155542] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log In →"}
            </button>

            {/* Message */}
            {message && (
              <p className="mt-4 rounded-xl bg-[#eef7f3] px-4 py-3 text-center text-sm text-[#1d6b55]">
                {message}
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-[#667871]">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-semibold text-[#1d6b55] hover:underline"
            >
              Create one
            </a>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-[#81918b]">
          Your financial journey continues here.
        </p>

      </div>
    </main>
  );
}