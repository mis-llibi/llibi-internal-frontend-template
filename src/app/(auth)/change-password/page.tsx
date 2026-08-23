"use client";

import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MoonLoader } from "react-spinners";
import { Lock, Eye, EyeOff, Check, X, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FieldType = "current" | "new" | "confirm";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

function evaluatePasswordStrength(password: string) {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
  };
  const score = Object.values(checks).filter(Boolean).length;
  return { checks, score };
}

function strengthMeta(score: number) {
  if (score <= 1) return { label: "Weak", color: "bg-red-500", width: "25%" };
  if (score === 2) return { label: "Fair", color: "bg-amber-500", width: "50%" };
  if (score === 3) return { label: "Good", color: "bg-blue-500", width: "75%" };
  return { label: "Strong", color: "bg-green-500", width: "100%" };
}

export default function ChangePasswordPage() {
  const { user, changePassword } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/reports/cae",
  });

  const [show, setShow] = useState<Record<FieldType, boolean>>({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = useWatch({ control, name: "newPassword" }) || "";
  const strength = evaluatePasswordStrength(newPassword);
  const meta = strengthMeta(strength.score);

  const toggleShow = (field: FieldType) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = async (data: ChangePasswordFormData) => {
    if (loading || !user?.email) return;

    setLoading(true);
    try {
      await changePassword({
        email: user.email,
        current_password: data.currentPassword,
        password: data.newPassword,
        password_confirmation: data.confirmPassword,
      });
      reset();
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

      <div className="relative w-full max-w-[960px]">
        <div className="overflow-hidden rounded-3xl border border-border bg-card/80 shadow-[0_25px_70px_-40px_rgba(2,6,23,0.55)] backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative flex flex-col items-center justify-center px-8 py-10 md:py-12">
              <div aria-hidden className="absolute -left-24 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
              <div aria-hidden className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-indigo-950/20 blur-3xl" />

              <div className="flex w-full flex-col items-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-lg">
                  <ShieldCheck className="h-10 w-10" />
                </div>
                <div className="mt-6 text-center">
                  <h2 className="text-xl font-semibold text-foreground">Change Password</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Update your password to keep your account secure.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center px-6 py-10 md:px-10 md:py-12">
              <div className="w-full max-w-[420px]">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate aria-busy={loading}>
                  {/* Current Password */}
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative mt-1">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="current-password"
                        type={show.current ? "text" : "password"}
                        {...register("currentPassword")}
                        placeholder="••••••••"
                        className="pl-9 pr-9"
                        autoComplete="current-password"
                        disabled={loading}
                        aria-invalid={Boolean(errors.currentPassword)}
                        aria-describedby={errors.currentPassword ? "current-error" : undefined}
                      />
                      <button
                        type="button"
                        onClick={() => toggleShow("current")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {show.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p id="current-error" role="alert" className="mt-1 text-xs font-medium text-destructive">
                        {errors.currentPassword.message}
                      </p>
                    )}
                  </div>

                  {/* New Password */}
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative mt-1">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="new-password"
                        type={show.new ? "text" : "password"}
                        {...register("newPassword")}
                        placeholder="••••••••"
                        className="pl-9 pr-9"
                        autoComplete="new-password"
                        disabled={loading}
                        aria-invalid={Boolean(errors.newPassword)}
                        aria-describedby={errors.newPassword ? "new-error" : undefined}
                      />
                      <button
                        type="button"
                        onClick={() => toggleShow("new")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {show.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p id="new-error" role="alert" className="mt-1 text-xs font-medium text-destructive">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  {newPassword.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Password strength</span>
                        <span className="text-xs font-medium text-muted-foreground">{meta.label}</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full transition-all ${meta.color}`}
                          style={{ width: meta.width }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Confirm Password */}
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <div className="relative mt-1">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type={show.confirm ? "text" : "password"}
                        {...register("confirmPassword")}
                        placeholder="••••••••"
                        className="pl-9 pr-9"
                        autoComplete="new-password"
                        disabled={loading}
                        aria-invalid={Boolean(errors.confirmPassword)}
                        aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
                      />
                      <button
                        type="button"
                        onClick={() => toggleShow("confirm")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {show.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p id="confirm-error" role="alert" className="mt-1 text-xs font-medium text-destructive">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="rounded-lg border border-border bg-muted/40 p-3">
                    <p className="mb-2 text-xs font-medium text-muted-foreground">Password requirements</p>
                    <ul className="grid grid-cols-2 gap-y-1.5">
                      {[
                        { label: "8+ characters", ok: strength.checks.length },
                        { label: "Uppercase", ok: strength.checks.uppercase },
                        { label: "Lowercase", ok: strength.checks.lowercase },
                        { label: "Number", ok: strength.checks.number },
                      ].map((req) => (
                        <li key={req.label} className="flex items-center gap-1.5 text-xs">
                          {req.ok ? (
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                          ) : (
                            <X className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                          <span className={req.ok ? "text-foreground" : "text-muted-foreground"}>
                            {req.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button type="submit" disabled={loading} className="h-10 w-full">
                    {loading ? (
                      <>
                        <MoonLoader size={16} color="currentColor" />
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
