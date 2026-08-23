"use client";

import React, { useEffect } from "react";
import { MoonLoader } from "react-spinners";
import { MailOpen, LogOut, RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/auth";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const { user, resendEmailVerification, logout } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/dashboard",
  });

  const isVerified = Boolean(user?.email_verified_at);
  const [sending, setSending] = React.useState(false);

  useEffect(() => {
    if (isVerified) {
      window.location.pathname = "/dashboard";
    }
  }, [isVerified]);

  const handleResend = async () => {
    setSending(true);
    await resendEmailVerification();
    setSending(false);
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
                  <MailOpen className="h-10 w-10" />
                </div>
                <div className="mt-6 text-center">
                  <h2 className="text-xl font-semibold text-foreground">Verify Your Email</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Confirm your email address to access the portal.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center px-6 py-10 md:px-10 md:py-12">
              <div className="w-full max-w-[420px] space-y-6 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    We sent a verification link to{" "}
                    <strong className="text-foreground">
                      {user?.email ?? "your email address"}
                    </strong>
                    . Click the link in the email to verify your account.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleResend}
                    disabled={sending}
                    className="h-10 w-full"
                    variant="default"
                  >
                    {sending ? (
                      <>
                        <MoonLoader size={16} color="currentColor" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4" />
                        Resend Verification Link
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => logout()}
                    disabled={sending}
                    className="h-10 w-full"
                    variant="outline"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  After verifying, you&apos;ll be redirected to the portal automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
