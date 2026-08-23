"use client";

import useSWR from "swr";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { safeReturnTo } from "@/lib/safe-return-to";
import { authenticatedRedirectTo } from "@/lib/auth-redirect";
import * as authService from "@/services/auth";

import type {
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LoginFormValues,
  ResetPasswordPayload,
  User,
} from "@/types/UserTypes";

const CONSENT_PAGES = ["/privacy-consent", "/unable-to-access"];

type AuthTypes = {
  middleware?: string;
  redirectIfAuthenticated?: string;
  loginReturnTo?: string;
};

export const useAuth = ({ middleware, redirectIfAuthenticated, loginReturnTo }: AuthTypes = {}) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: user,
    error,
    mutate,
    isLoading,
  } = useSWR<User | undefined>(
    "/api/user",
    () =>
      authService.getUser().catch((error: unknown) => {
        if (!isAxiosError(error) || error.response?.status !== 409) throw error;
        return undefined;
      }),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const login = async ({ email, password, rememberMe }: LoginFormValues) => {
    try {
      await authService.login({
        email,
        password,
        remember: rememberMe,
      });
      const refreshedUser = await mutate();
      const target = consentRedirectTarget(refreshedUser, redirectIfAuthenticated ?? null);
      router.replace(target);
    } catch (error) {
      let message = "Something went wrong. Please try again.";

      if (isAxiosError(error)) {
        const status = error.response?.status;
        const validationErrors = error.response?.data?.errors;
        const validationMessage = validationErrors
          ? Object.values(validationErrors).flat().find((value) => typeof value === "string")
          : undefined;

        if (!error.response) {
          message = "Unable to connect to the server. Check your connection and try again.";
        } else if (status === 419) {
          message = "Your session expired. Please try signing in again.";
        } else if (status === 429) {
          message = "Too many sign-in attempts. Please wait a moment and try again.";
        } else if (typeof validationMessage === "string") {
          message = validationMessage;
        } else if (status && status >= 500) {
          message = "The server is currently unavailable. Please try again later.";
        } else if (typeof error.response.data?.message === "string") {
          message = error.response.data.message;
        }
      }

      toast.error("Login Failed", {
        description: message,
      });
      throw error;
    }
  };

  const logout = async (redirectTo = "/login") => {
    if (!error) {
      await authService.logout().then(() => mutate());
    }

    window.location.assign(redirectTo);
  };

  useEffect(() => {
    if (middleware === "guest" && user) {
      if (CONSENT_PAGES.includes(pathname)) return;
      router.push(authenticatedRedirectTo(redirectIfAuthenticated ?? null, user.default_route));
    }

    if (middleware === "auth" && error) {
      const requestedReturnTo = loginReturnTo ?? `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const returnTo = safeReturnTo(requestedReturnTo, window.location.origin);
      window.location.assign(returnTo ? `/login?returnTo=${encodeURIComponent(returnTo)}` : "/login");
    }
  }, [user, error, middleware, redirectIfAuthenticated, loginReturnTo, router, pathname]);

  const changePassword = async ({
    email,
    current_password,
    password,
    password_confirmation,
  }: ChangePasswordPayload) => {
    try {
      await authService.changePassword({
        email,
        current_password,
        password,
        password_confirmation,
      });
      toast.success("Password Changed", {
        description: "Your password has been updated successfully. A confirmation email has been sent.",
      });
    } catch (error: unknown) {
      let message = "Something went wrong. Please try again.";

      if (isAxiosError(error)) {
        message =
          error.response?.data?.message ??
          error.response?.data?.errors?.email?.[0] ??
          error.response?.data?.errors?.password?.[0] ??
          message;
      }

      toast.error("Password Update Failed", {
        description: message,
      });
      throw error;
    }
  };

  const forgotPassword = async ({ email }: ForgotPasswordPayload) => {
    try {
      await authService.forgotPassword({ email });
      toast.success("Check Your Email", {
        description: "We've sent a password reset link to your email address.",
      });
    } catch (error) {
      let message = "Something went wrong. Please try again.";

      if (isAxiosError(error)) {
        message =
          error.response?.data?.errors?.email?.[0] ??
          error.response?.data?.message ??
          message;
      }

      toast.error("Request Failed", {
        description: message,
      });
      throw error;
    }
  };

  const resetPassword = async ({
    token,
    email,
    password,
    password_confirmation,
  }: ResetPasswordPayload) => {
    try {
      await authService.resetPassword({
        token,
        email,
        password,
        password_confirmation,
      });
      toast.success("Password Reset", {
        description: "Your password has been reset successfully. You can now log in.",
      });
      router.push("/login");
    } catch (error) {
      let message = "Something went wrong. Please try again.";

      if (isAxiosError(error)) {
        message =
          error.response?.data?.errors?.email?.[0] ??
          error.response?.data?.errors?.password?.[0] ??
          error.response?.data?.message ??
          message;
      }

      toast.error("Reset Failed", {
        description: message,
      });
      throw error;
    }
  };

  const resendEmailVerification = async () => {
    try {
      await authService.resendEmailVerification();
      toast.success("Email Sent", {
        description: "A new verification link has been sent to your email address.",
      });
    } catch (error) {
      let message = "Something went wrong. Please try again.";

      if (isAxiosError(error)) {
        message =
          error.response?.status === 429
            ? "Too many requests. Please wait a moment before trying again."
            : error.response?.data?.message ?? message;
      }

      toast.error("Verification Failed", {
        description: message,
      });
      throw error;
    }
  };

  return {
    login,
    changePassword,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    user,
    error,
    isLoading,
    mutate,
    logout,
  };
};

function consentRedirectTarget(user: User | undefined, returnTo: string | null): string {
  if (user?.privacy_consent?.required) {
    const safeReturn = returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : "";
    return `/privacy-consent${safeReturn}`;
  }
  return authenticatedRedirectTo(returnTo, user?.default_route);
}
