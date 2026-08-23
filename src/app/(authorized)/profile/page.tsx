"use client";

import * as React from "react";
import {
  Bell,
  CheckCircle2,
  KeyRound,
  Lock,
  Mail,
  RefreshCw,
  Shield,
  ShieldCheck,
  Smartphone,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { getInitials } from "@/lib/profile";

const demoUser = {
  name: "Jane Doe",
  email: "jane.doe@llibi.com",
  role: "Administrator",
  department: "Corporate Medical Services",
  employeeId: "EMP-2026-0842",
  phone: "+63 (917) 555-0192",
  email_verified_at: "2026-01-15 09:30:00",
  account_status: "ACTIVE",
  last_login_at: "2026-08-19 09:15:22",
  notification_email: "jane.doe.notifications@llibi.com",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ProfilePage() {
  const [fullName, setFullName] = React.useState(demoUser.name);
  const [loginEmail, setLoginEmail] = React.useState(demoUser.email);
  const [phone, setPhone] = React.useState(demoUser.phone);
  const [department, setDepartment] = React.useState(demoUser.department);
  const [savingProfile, setSavingProfile] = React.useState(false);
  const [profileErrors, setProfileErrors] = React.useState<{ name?: string; email?: string }>({});

  const [notificationEmail, setNotificationEmail] = React.useState(demoUser.notification_email);
  const [savingNotification, setSavingNotification] = React.useState(false);

  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [savingPassword, setSavingPassword] = React.useState(false);
  const [passwordErrors, setPasswordErrors] = React.useState<{
    current_password?: string;
    password?: string;
    confirm_password?: string;
  }>({});

  const handleProfileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileErrors({});

    if (!fullName.trim()) {
      setProfileErrors({ name: "Full name is required." });
      return;
    }
    if (!loginEmail.trim() || !EMAIL_PATTERN.test(loginEmail.trim())) {
      setProfileErrors({ email: "Please enter a valid corporate email." });
      return;
    }

    setSavingProfile(true);
    setTimeout(() => {
      setSavingProfile(false);
      toast.success("Profile Updated", {
        description: "Your account identity has been saved.",
      });
    }, 600);
  };

  const handleNotificationSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (notificationEmail.trim() && !EMAIL_PATTERN.test(notificationEmail.trim())) {
      toast.error("Invalid Email", {
        description: "Please provide a valid notification email address.",
      });
      return;
    }

    setSavingNotification(true);
    setTimeout(() => {
      setSavingNotification(false);
      toast.success("Notification Preferences Saved", {
        description: "Claims and audit alerts will be routed to your delivery inbox.",
      });
    }, 600);
  };

  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordErrors({});

    if (!currentPassword) {
      setPasswordErrors({ current_password: "Current password is required." });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordErrors({ password: "New password must be at least 8 characters." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordErrors({ confirm_password: "Passwords do not match." });
      return;
    }

    setSavingPassword(true);
    setTimeout(() => {
      setSavingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password Updated", {
        description: "Your security credentials have been updated successfully.",
      });
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <PageHeader
        title="Account & Profile"
        description={`Role: ${demoUser.role} · Department: ${demoUser.department} · Last login: ${demoUser.last_login_at}`}
      >
        <Badge variant="secondary" className="font-mono text-xs">
          {demoUser.employeeId}
        </Badge>
        <StatusBadge status={demoUser.account_status} />
      </PageHeader>

      {/* Hero Overview Frameless Container */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-16 rounded-2xl ring-2 ring-primary/10">
            <AvatarFallback className="rounded-2xl bg-primary/10 text-xl font-bold text-primary">
              {getInitials(fullName)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">{fullName}</h2>
              <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 border-0">
                <CheckCircle2 className="mr-1 size-3" />
                Verified Corporate Email
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground font-mono">{loginEmail}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1 text-xs">
            {demoUser.role}
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="identity" className="w-full">
        <TabsList className="h-10 w-fit rounded-xl bg-muted/40 p-1 gap-1">
          <TabsTrigger value="identity" className="h-8 text-xs rounded-lg px-4 font-medium">
            <User className="mr-1.5 size-3.5" />
            Identity
          </TabsTrigger>
          <TabsTrigger value="notifications" className="h-8 text-xs rounded-lg px-4 font-medium">
            <Bell className="mr-1.5 size-3.5" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="h-8 text-xs rounded-lg px-4 font-medium">
            <Lock className="mr-1.5 size-3.5" />
            Security & Password
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Identity Form */}
        <TabsContent value="identity" className="pt-4">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8 rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 sm:p-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Personal Information
                </h3>
                <p className="text-xs text-muted-foreground">
                  Update your contact info and personal identity details.
                </p>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-4 pt-1">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                      id="full-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                    />
                    {profileErrors.name && (
                      <p className="text-xs font-medium text-destructive">{profileErrors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="login-email">Login Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="jane.doe@llibi.com"
                    />
                    {profileErrors.email && (
                      <p className="text-xs font-medium text-destructive">{profileErrors.email}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+63 (917) 000-0000"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="Department"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button type="submit" disabled={savingProfile} className="gap-1.5 h-9 rounded-xl">
                    {savingProfile && <RefreshCw className="size-4 animate-spin" />}
                    {savingProfile ? "Saving..." : "Save Identity"}
                  </Button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-4 rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Employment Details
                </h3>
                <p className="text-xs text-muted-foreground">Managed by Corporate HR</p>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-border/20">
                  <span className="text-muted-foreground">Employee ID</span>
                  <span className="font-mono font-medium text-foreground">{demoUser.employeeId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/20">
                  <span className="text-muted-foreground">Designated Role</span>
                  <span className="font-semibold text-foreground">{demoUser.role}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/20">
                  <span className="text-muted-foreground">Account Status</span>
                  <StatusBadge status={demoUser.account_status} />
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Verification Date</span>
                  <span className="text-muted-foreground">{demoUser.email_verified_at}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Notifications */}
        <TabsContent value="notifications" className="pt-4">
          <div className="max-w-2xl rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 sm:p-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Email Dispatch & Notification Routing
              </h3>
              <p className="text-xs text-muted-foreground">
                Configure where claim receipts and urgent approval alerts are sent.
              </p>
            </div>
            <form onSubmit={handleNotificationSubmit} className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <Label htmlFor="notification-email">Delivery Email Address</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="notification-email"
                    type="email"
                    value={notificationEmail}
                    onChange={(e) => setNotificationEmail(e.target.value)}
                    placeholder="jane.notifications@llibi.com"
                    className="pl-9"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Leave blank to default to your corporate login email address.
                </p>
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={savingNotification} className="gap-1.5 h-9 rounded-xl">
                  {savingNotification && <RefreshCw className="size-4 animate-spin" />}
                  {savingNotification ? "Updating..." : "Save Preferences"}
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>

        {/* Tab 3: Security & Password */}
        <TabsContent value="security" className="pt-4">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 sm:p-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Update Security Password
                </h3>
                <p className="text-xs text-muted-foreground">
                  Ensure your account is protected with a strong, distinct password.
                </p>
              </div>
              <form onSubmit={handlePasswordSubmit} className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <Label htmlFor="current-pass">Current Password</Label>
                  <Input
                    id="current-pass"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  {passwordErrors.current_password && (
                    <p className="text-xs font-medium text-destructive">
                      {passwordErrors.current_password}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="new-pass">New Password</Label>
                  <Input
                    id="new-pass"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Minimum 8 characters with letters, numbers, and symbols.
                  </p>
                  {passwordErrors.password && (
                    <p className="text-xs font-medium text-destructive">
                      {passwordErrors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirm-pass">Confirm New Password</Label>
                  <Input
                    id="confirm-pass"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  {passwordErrors.confirm_password && (
                    <p className="text-xs font-medium text-destructive">
                      {passwordErrors.confirm_password}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <Button type="submit" disabled={savingPassword} className="gap-1.5 h-9 rounded-xl">
                    {savingPassword ? (
                      <RefreshCw className="size-4 animate-spin" />
                    ) : (
                      <KeyRound className="size-4" />
                    )}
                    {savingPassword ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-5 rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Security Checklist
                </h3>
                <p className="text-xs text-muted-foreground">Session policy and compliance</p>
              </div>
              <div className="space-y-3.5 text-xs text-muted-foreground pt-1">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="size-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground block">Two-Factor Authentication</span>
                    <span>Enforced via corporate Single Sign-On (SSO) policy.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Shield className="size-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground block">Session Expiration</span>
                    <span>Inactivity timeout after 30 minutes of idle time.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Smartphone className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground block">Active Devices</span>
                    <span>1 current browser session active on this network.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
