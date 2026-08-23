"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MoonLoader } from "react-spinners";
import { AtSign, Lock } from "lucide-react";
import { useAuth } from "@/hooks/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { safeReturnTo } from "@/lib/safe-return-to";
import { TermsOfUseDialog } from "@/components/terms-of-use-dialog";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [loading, setLoading] = useState(false);

  const returnTo =
    typeof window === "undefined"
      ? null
      : safeReturnTo(
          new URLSearchParams(window.location.search).get("returnTo"),
          window.location.origin,
        );

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: returnTo ?? undefined,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    if (loading) return;
    setLoading(true);
    try {
      await login(data);
    } catch {
      // Handled in useAuth with toast notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(14,1,67,0.14),transparent_55%)] px-6 md:px-12 lg:px-16">
      {/* Soft grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(15,23,42,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.12)_1px,transparent_1px)] [background-size:36px_36px]"
      />

      <div className="relative w-full max-w-[900px]">
        <div className="overflow-hidden rounded-3xl border border-border bg-card/80 shadow-[0_25px_70px_-40px_rgba(2,6,23,0.55)] backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* LEFT: Branding */}
            <div className="relative flex flex-col items-center justify-center px-8 py-10 md:py-12">
              {/* Accent blobs */}
              <div aria-hidden className="absolute -left-24 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
              <div aria-hidden className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-indigo-950/20 blur-3xl" />

              {/* Mobile branding */}
              <div className="flex w-full flex-col items-center md:hidden">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-sm">
                  <Image
                    src="/llibi-icon.png"
                    alt="LLIBI Logo"
                    width={1024}
                    height={1024}
                    unoptimized
                    priority
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="mt-4 text-center text-foreground">
                  <h1 className="text-lg font-semibold">Welcome back</h1>
                  <p className="mt-1 text-sm text-muted-foreground">LLIBI Portal Template</p>
                </div>
              </div>

              {/* Desktop branding */}
              <div className="hidden w-full flex-col items-center justify-center md:flex">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white p-3 shadow-lg">
                  <Image
                    src="/llibi-icon.png"
                    alt="LLIBI Logo"
                    width={1024}
                    height={1024}
                    unoptimized
                    priority
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h2 className="text-xl font-semibold text-foreground">Welcome back</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Log in to continue managing your workspace and tracking updates.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className="flex items-center justify-center px-6 py-10 md:px-10 md:py-12">
              <div className="w-full max-w-[420px]">
                {/* Desktop title */}
                <div className="hidden md:flex md:flex-col md:items-center">
                  <div className="mt-4 text-center">
                    <h1 className="text-xl font-semibold text-foreground">Sign in</h1>
                    <p className="mt-1 text-sm text-muted-foreground">LLIBI Portal Template</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate aria-busy={loading}>
                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative mt-1">
                      <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="you@example.com"
                        className="pl-9"
                        autoComplete="email"
                        autoCapitalize="none"
                        spellCheck={false}
                        disabled={loading}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                    </div>
                    {errors.email && (
                      <p
                        id="email-error"
                        role="alert"
                        className="mt-1 text-xs font-medium text-destructive"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        {...register("password")}
                        placeholder="••••••••"
                        className="pl-9"
                        autoComplete="current-password"
                        disabled={loading}
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={errors.password ? "password-error" : undefined}
                      />
                    </div>
                    {errors.password && (
                      <p
                        id="password-error"
                        role="alert"
                        className="mt-1 text-xs font-medium text-destructive"
                      >
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Remember */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
                        {...register("rememberMe")}
                        disabled={loading}
                      />
                      Remember me
                    </label>
                    <a
                      href="/forgot-password"
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-10 w-full"
                  >
                    {loading ? (
                      <>
                        <MoonLoader size={16} color="currentColor" />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By using this portal, you agree to our{" "}
          <TermsOfUseDialog
            trigger={
              <button
                type="button"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Terms of Use
              </button>
            }
          />{" "}
          and{" "}
          <a
            href="https://llibi.com/wp-content/uploads/2026/02/LLIBI-Privacy-Notice-Website-rev.-2026-v1.0.pdf"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            Privacy Notice
          </a>.
        </p>
      </div>
    </div>
  );
}
