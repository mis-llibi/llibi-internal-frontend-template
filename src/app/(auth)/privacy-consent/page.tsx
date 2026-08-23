"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useAuth } from "@/hooks/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { safeReturnTo } from "@/lib/safe-return-to";
import { authenticatedRedirectTo } from "@/lib/auth-redirect";
import axios from "@/lib/axios";

const PRIVACY_URL =
  "https://llibi.com/wp-content/uploads/2026/02/LLIBI-Privacy-Notice-Website-rev.-2026-v1.0.pdf";

export default function PrivacyConsent() {
  const router = useRouter();
  const { user, logout, isLoading, mutate } = useAuth({ middleware: "auth" });
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkboxRef.current?.focus();
  }, []);

  const returnTo =
    typeof window === "undefined"
      ? null
      : safeReturnTo(
          new URLSearchParams(window.location.search).get("returnTo"),
          window.location.origin,
        );

  const termsVersion = user?.privacy_consent?.terms_version ?? "21 July 2026";
  const privacyNoticeVersion =
    user?.privacy_consent?.privacy_notice_version ?? "14 July 2026";

  const handleAgree = async () => {
    if (submitting || !confirmed) return;
    setSubmitting(true);
    setError(null);

    try {
      await axios.post("/api/privacy-consent", {
        terms_version: termsVersion,
        privacy_notice_version: privacyNoticeVersion,
      });

      const refreshedUser = await mutate();
      const target = authenticatedRedirectTo(
        returnTo,
        refreshedUser?.default_route,
      );
      router.replace(target);
    } catch (error) {
      let message = "Something went wrong. Please try again.";

      if (isAxiosError(error)) {
        message =
          error.response?.data?.message ??
          error.response?.data?.errors?.terms_version?.[0] ??
          message;
      }

      setError(message);
      toast.error("Error", {
        description: message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDisagree = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      await logout("/unable-to-access");
    } catch {
      window.location.assign("/unable-to-access");
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden sm:max-w-[55vw]"
      >
        <DialogHeader>
          <DialogTitle>Policy consent</DialogTitle>
          <DialogDescription>
            Your account is in read-only mode until you accept the current Terms
            of Use and Privacy Notice.
          </DialogDescription>
        </DialogHeader>

        <div
          data-testid="consent-terms-content"
          className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 text-sm leading-6 text-slate-700"
        >
          <p className="font-semibold">
            Please read these Terms of Use before using the LLIBI Portal Template
            (&ldquo;Portal&rdquo;).
          </p>
          <p>
            By accessing or using this Portal, you confirm that you have read,
            understood, and agree to comply with these Terms of Use.
          </p>

          <section>
            <h3 className="mb-1 font-semibold text-slate-900">
              About the Portal
            </h3>
            <p>
              The Portal is created, owned, and managed by Lacson and Lacson
              Insurance Brokers, Inc. (&ldquo;LLIBI,&rdquo; &ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;) to facilitate the
              electronic submission of healthcare reimbursement claims and
              supporting documents by authorized representatives of LLIBI&apos;s
              corporate clients on behalf of their eligible employees or
              dependents (&ldquo;Members&rdquo;).
            </p>
            <p className="mt-2">The Portal allows authorized users to:</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                Submit reimbursement claims and supporting documents on behalf
                of Members;
              </li>
              <li>View the status of submitted claims, where available; and</li>
              <li>
                Receive notifications or requests for additional information
                relating to submitted claims.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="mb-1 font-semibold text-slate-900">
              Authorized Users
            </h3>
            <p>
              Access to the Portal is restricted only to internal LLIBI Teams
              involved in Claims Processing such as Corporate Accounts
              Executives and where applicable, authorized Human Resources
              personnel, or other representatives designated by LLIBI&apos;s
              corporate clients and authorized to submit reimbursement claims on
              behalf of Members.
            </p>
            <p className="mt-2">
              You are responsible for ensuring that your use of the Portal is
              within the scope of your authority and in accordance with your
              organization&apos;s internal policies.
            </p>
          </section>

          <section>
            <h3 className="mb-1 font-semibold text-slate-900">
              Your Responsibilities
            </h3>
            <p>
              While LLIBI implements appropriate organizational, physical, and
              technical security measures to protect information processed
              through the Portal, you are responsible for:
            </p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                maintaining the confidentiality of your login credentials;
              </li>
              <li>submitting only claims that you are authorized to submit;</li>
              <li>
                ensuring that information and documents uploaded through the
                Portal have been provided by, or verified with, the relevant
                Member to the best of your knowledge; and
              </li>
              <li>
                submitting complete, accurate, and legible information and
                supporting documents to facilitate claim evaluation.
              </li>
            </ul>
            <p className="mt-2">You agree not to:</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                access or attempt to access claims or information for which you
                are not authorized;
              </li>
              <li>
                upload unlawful, fraudulent, misleading, altered, fabricated,
                malicious, or unauthorized content;
              </li>
              <li>
                interfere with or compromise the security, integrity, or
                availability of the Portal; or
              </li>
              <li>
                use the Portal for any purpose other than the submission and
                administration of reimbursement claims.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="mb-1 font-semibold text-slate-900">
              Claims Processing
            </h3>
            <p>
              Submission of a claim through the Portal does not guarantee
              approval or payment. All claims remain subject to verification,
              policy terms and conditions, applicable benefit limits and
              exclusions.
            </p>
            <p className="mt-2">
              LLIBI may request additional information or supporting documents
              where necessary to evaluate or process a claim.
            </p>
          </section>

          <section>
            <h3 className="mb-1 font-semibold text-slate-900">
              Privacy and Confidentiality
            </h3>
            <p>
              The Portal processes personal information, which may include
              sensitive personal information such as medical records, solely for
              legitimate insurance, healthcare benefits administration, claims
              processing, fraud prevention, legal, and regulatory compliance
              purposes.
            </p>
            <p className="mt-2">
              Authorized users shall treat all Member information accessed
              through the Portal as confidential and shall process such
              information only for authorized business purposes and in
              accordance with applicable privacy laws and their
              organization&apos;s internal policies.
            </p>
          </section>

          <section>
            <h3 className="mb-1 font-semibold text-slate-900">Security</h3>
            <p>
              LLIBI employs reasonable administrative, physical, and technical
              safeguards to protect information processed through the Portal.
              However, users are responsible for protecting their login
              credentials and preventing unauthorized access to their accounts.
            </p>
            <p className="mt-2">
              If you suspect that your account has been compromised or that
              unauthorized access has occurred, you must immediately notify
              LLIBI through privacy@llibi.com.
            </p>
          </section>

          <section>
            <h3 className="mb-1 font-semibold text-slate-900">
              Portal Availability
            </h3>
            <p>
              LLIBI may modify, suspend, restrict, or discontinue any feature of
              the Portal at any time for maintenance, security, operational,
              legal, or other legitimate business reasons.
            </p>
          </section>

          <section>
            <h3 className="mb-1 font-semibold text-slate-900">Amendments</h3>
            <p>
              LLIBI may revise these Terms of Use from time to time. We will
              notify you of any material changes through the Portal or by other
              appropriate means. Your continued use of the Portal after the
              changes take effect means you accept the revised Terms.
            </p>
          </section>

          <p className="border-t border-slate-200 pt-3 text-xs text-slate-500">
            Version: 21 July 2026
          </p>
        </div>

        <label className="mt-4 flex items-start gap-3 px-5 text-sm leading-6 text-slate-700 sm:mt-5">
          <input
            ref={checkboxRef}
            type="checkbox"
            checked={confirmed}
            onChange={(event) => setConfirmed(event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
          />
          <span>
            By checking this box, I confirm that I have read, understood, and
            agree to the{" "}
            <strong className="font-medium text-slate-900">Terms of Use</strong>{" "}
            and{" "}
            <Link
              className="font-medium text-cyan-700 underline underline-offset-2 hover:text-cyan-800"
              href={PRIVACY_URL}
              target="_blank"
              rel="noreferrer"
            >
              Privacy Notice
            </Link>
            , and I consent to the use of this application in accordance with
            these policies.
          </span>
        </label>

        {error && (
          <p
            className="mx-5 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse gap-5 px-5 pb-5 sm:flex-row sm:justify-end">
          <Button
            className="w-full sm:w-auto"
            type="button"
            variant="secondary"
            onClick={handleDisagree}
            disabled={submitting}
          >
            I Disagree
          </Button>
          <Button
            className="w-full sm:w-auto"
            type="button"
            onClick={handleAgree}
            disabled={submitting || !confirmed}
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
            I Agree
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
