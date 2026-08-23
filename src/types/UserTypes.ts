export type User = {
  id: number;
  employee_id: number | null;
  name: string;
  email: string | null;
  email_verified_at: string | null;
  notification_email?: string | null;
  effective_notification_email?: string | null;
  account_status?: "active" | "inactive";
  company_assignments?: Array<{
    company_key: string;
    company_code: string;
    company_name: string;
  }>;
  is_cae_admin: boolean;
  is_master_reimbursement_admin: boolean;
  role?: string | null;
  capabilities?: {
    reimbursements?: { list: boolean; create: boolean };
    cae?: { report: boolean; stats: boolean; export: boolean; quick_actions: boolean };
    admin?: {
      manage_company_assignments: boolean;
      manage_cae_assignments: boolean;
      manage_cae_users: boolean;
      import_cae_users: boolean;
      create_cae_users: boolean;
      provision_local_users: boolean;
      view_admin_pages?: boolean;
    };
    compliance?: { read_only?: boolean };
  };
  default_route?: string;
  privacy_consent?: {
    required: boolean;
    consented: boolean;
    terms_version: string;
    privacy_notice_version: string;
    consented_at: string | null;
  };
};

export type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ChangePasswordPayload = {
  email: string;
  current_password: string;
  password: string;
  password_confirmation: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};
