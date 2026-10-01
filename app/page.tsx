"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function SignInPage() {

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const url = "http://localhost:8000/api/login";
    
    if (!email || !password) {
      setError("Please fill in both email and password fields.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    
    try{
      const response = await axios.post(url, {email: email, password: password}, {
        headers: {
          "Content-Type": "application/json",
        },withCredentials: true
      })

      if (response.data.status === "success") {
        router.push("/dashboard");
      }else{
        setError(response.data.message);
      }
    }catch(error){
        if (axios.isAxiosError(error)) {
          console.log(error.response)
      }
    };
  }
    

  return (
    <>
      <div className="flex min-h-screen">
        {/* Left Side */}
        <section className="relative hidden overflow-hidden bg-slate-950 lg:flex lg:w-1/2">
          {/* Decorative shapes */}
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">
            {/* Logo */}
            <Link
              href="/"
              className="w-fit text-2xl font-black tracking-tight text-white"
            >
              Wise<span className="text-amber-400">Gen</span>
            </Link>

            {/* Main Content */}
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300">
                Admin Portal
              </div>

              <h1 className="text-4xl font-black leading-tight text-white xl:text-5xl">
                Raising a generation that loves God, lives wisely, and fulfills
                purpose.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-8 text-slate-400">
                Manage the WiseGen community, events, news, members, and other
                activities from one place.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                  Community
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                  Events
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                  News
                </div>
              </div>
            </div>

            {/* Bottom */}
            <p className="text-sm text-slate-500">
              Know God. Gain Wisdom. Discover Purpose. Impact Your Generation.
            </p>
          </div>
        </section>

        {/* Right Side */}
        <section className="flex w-full items-center justify-center px-6 py-12 sm:px-10 lg:w-1/2">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-12 lg:hidden">
              <Link
                href="/"
                className="text-2xl font-black tracking-tight text-slate-950"
              >
                Wise<span className="text-amber-500">Gen</span>
              </Link>

              <p className="mt-2 text-sm text-slate-500">Admin Portal</p>
            </div>

            {/* Heading */}
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <LockKeyhole size={23} />
              </div>

              <h2 className="text-3xl font-black tracking-tight text-slate-950">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to access the WiseGen administration dashboard.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-5">
              {/* Email */}
              <div className={`w-full h-max py-2 text-center text-sm bg-red-600 text-white rounded
                ${error ? "block" : "hidden"}
                `}>
                {error}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-amber-600 transition hover:text-amber-700"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 accent-amber-500"
                  />

                  <span className="text-sm text-slate-600">
                    Remember me
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                onClick={handleSubmit}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
              >
                Sign in
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* Footer */}
            <div className="mt-10 border-t border-slate-200 pt-6 text-center">
              <p className="text-xs leading-5 text-slate-400">
                This area is restricted to authorized WiseGen administrators.
              </p>

              <Link
                href="/"
                className="mt-3 inline-block text-sm font-semibold text-slate-600 transition hover:text-amber-600"
              >
                ← Back to WiseGen
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}