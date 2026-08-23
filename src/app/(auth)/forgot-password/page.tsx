"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MoonLoader } from "react-spinners";
import { AtSign, MailCheck } from "lucide-react";
import { useAuth } from "@/hooks/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  const { forgotPassword } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/reports/cae",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    if (loading) return;

    setLoading(true);
    try {
      await forgotPassword({ email: data.email });
      setSentEmail(data.email);
    } catch {
      // Handled in useAuth with toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(14,1,67,0.14),transparent_55%)] px-6 md:px-12 lg:px-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(15,23,42,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.12)_1px,transparent_1px)] [background-size:36px_36px]"
      />

      <div className="relative w-full max-w-[900px]">
        <div className="overflow-hidden rounded-3xl border border-border bg-card/80 shadow-[0_25px_70px_-40px_rgba(2,6,23,0.55)] backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative flex flex-col items-center justify-center px-8 py-10 md:py-12">
              <div aria-hidden className="absolute -left-24 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
              <div aria-hidden className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-indigo-950/20 blur-3xl" />

              <div className="flex w-full flex-col items-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-lg">
                  {sentEmail ? (
                    <MailCheck className="h-10 w-10" />
                  ) : (
                    <span className="text-3xl font-bold">R</span>
                  )}
                </div>
                <div className="mt-6 text-center">
                  <h2 className="text-xl font-semibold text-foreground">
                    {sentEmail ? "Check Your Email" : "Forgot Password"}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {sentEmail
                      ? "We've sent a reset link to your email."
                      : "Enter your email and we'll send you a reset link."}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center px-6 py-10 md:px-10 md:py-12">
              <div className="w-full max-w-[420px]">
                {sentEmail ? (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      If an account exists for{" "}
                      <strong className="text-foreground">{sentEmail}</strong>, you
                      will receive a password reset link shortly.
                    </p>
                    <Button
                      variant="outline"
                      className="h-10"
                      onClick={() => {
                        setSentEmail(null);
                        reset();
                      }}
                    >
                      Try another email
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate aria-busy={loading}>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
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

                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-10 w-full"
                    >
                      {loading ? (
                        <>
                          <MoonLoader size={16} color="currentColor" />
                          Sending...
                        </>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </form>
                )}

                <p className="mt-6 text-center text-xs text-muted-foreground">
                  Remembered your password?{" "}
                  <a
                    href="/login"
                    className="font-semibold text-primary hover:underline"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
