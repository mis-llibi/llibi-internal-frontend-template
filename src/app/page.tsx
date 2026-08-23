"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import { MoonLoader } from "react-spinners";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const router = useRouter();
  const { user, error } = useAuth({
    middleware: "guest",
  });

  useEffect(() => {
    if (error) {
      router.replace("/login");
    }
  }, [error, router]);

  if (!user && !error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <MoonLoader size={32} color="hsl(var(--primary))" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Alert className="max-w-lg">
          <AlertTitle>Access not available</AlertTitle>
          <AlertDescription>
            Your account does not currently have access to a Reimbursement Portal feature. Contact an administrator if you need company reimbursement access.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return null;
}
