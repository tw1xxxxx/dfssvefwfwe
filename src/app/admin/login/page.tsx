"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Неверный логин или пароль");
      }
    } catch (err) {
      setError("Ошибка входа");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#05070a] p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Вход в админку</h1>
          <p className="mt-2 text-sm text-white/60">Введите данные для доступа</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80">
                Логин
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80">
                Пароль
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 p-3 text-center text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg bg-white px-4 py-2 text-sm font-bold text-black hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
