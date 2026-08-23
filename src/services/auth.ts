import { isAxiosError } from "axios";

import axios from "@/lib/axios";
import { isDemoMode } from "@/lib/env";
import type {
  ChangePasswordPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  User,
} from "@/types/UserTypes";

export { isDemoMode };

export const DEMO_USER: User = {
  id: 1,
  employee_id: 1,
  name: "Jane Doe",
  email: "jane.doe@llibi.com",
  email_verified_at: "2026-01-15 09:30:00",
  notification_email: "",
  effective_notification_email: "jane.doe@llibi.com",
  account_status: "active",
  is_cae_admin: true,
  is_master_reimbursement_admin: true,
  role: "Administrator",
  capabilities: {
    reimbursements: { list: true, create: true },
    cae: { report: true, stats: true, export: true, quick_actions: true },
    admin: {
      manage_company_assignments: true,
      manage_cae_assignments: true,
      manage_cae_users: true,
      import_cae_users: true,
      create_cae_users: true,
      provision_local_users: true,
      view_admin_pages: true,
    },
    compliance: { read_only: false },
  },
  default_route: "/dashboard",
  privacy_consent: {
    required: false,
    consented: true,
    terms_version: "1.0",
    privacy_notice_version: "1.0",
    consented_at: "2026-01-15 09:30:00",
  },
};

type LoginPayload = {
  email: string;
  password: string;
  remember: boolean;
};

export const csrf = async () => {
  if (isDemoMode) return;
  return axios.get("/sanctum/csrf-cookie");
};

export const login = async ({ email, password, remember }: LoginPayload) => {
  if (isDemoMode) return;

  await csrf();
  await axios.post("/login", { email, password, remember });
};

export const logout = async () => {
  if (isDemoMode) return;
  await axios.post("/logout");
};

export const getUser = async (): Promise<User | undefined> => {
  if (isDemoMode) return DEMO_USER;

  return axios
    .get<User>("/api/user")
    .then((response) => response.data)
    .catch((error: unknown) => {
      if (isAxiosError(error) && error.response?.status === 409) return undefined;
      throw error;
    });
};

export const changePassword = async (payload: ChangePasswordPayload) => {
  if (isDemoMode) return;
  return axios.post("/change-password", payload);
};

export const forgotPassword = async ({ email }: ForgotPasswordPayload) => {
  if (isDemoMode) return;

  await csrf();
  return axios.post("/forgot-password", { email });
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  if (isDemoMode) return;

  await csrf();
  return axios.post("/reset-password", payload);
};

export const resendEmailVerification = async () => {
  if (isDemoMode) return;
  return axios.post("/email/verification-notification");
};
