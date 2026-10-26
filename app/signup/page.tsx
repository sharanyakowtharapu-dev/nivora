"use client";

import { FormEvent, useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Something went wrong.");
        return;
      }

      setMessage(data.message || "Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");
    } catch {
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f8f6] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1d6b55] text-xl font-bold text-white">
            N
          </div>

          <h1 className="text-4xl font-bold text-[#13231e]">
            Create your Nivora account
          </h1>

          <p className="mt-3 text-[#5d7069]">
            Start building your financial foundation.
          </p>
        </div>

        <div className="rounded-3xl border border-[#dce7e2] bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#263a33]">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-[#d6e1dc] px-4 py-3 outline-none transition focus:border-[#1d6b55] focus:ring-2 focus:ring-[#1d6b55]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#263a33]">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-[#d6e1dc] px-4 py-3 outline-none transition focus:border-[#1d6b55] focus:ring-2 focus:ring-[#1d6b55]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#263a33]">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                required
                className="w-full rounded-xl border border-[#d6e1dc] px-4 py-3 outline-none transition focus:border-[#1d6b55] focus:ring-2 focus:ring-[#1d6b55]/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#1d6b55] px-5 py-3.5 font-semibold text-white transition hover:bg-[#155744] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>

            {message && (
              <p className="rounded-xl bg-[#eef7f3] px-4 py-3 text-center text-sm text-[#1d6b55]">
                {message}
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-[#667871]">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-[#1d6b55] hover:underline"
            >
              Log in
            </a>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-[#81918b]">
          Your financial journey starts here.
        </p>
      </div>
    </main>
  );
}