"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function TermsOfUseDialog({
  trigger,
  open,
  onOpenChange,
  onAgree,
  onDecline,
  agreeLabel = "I Agree",
  declineLabel = "I Do Not Agree",
}: {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAgree?: () => void;
  onDecline?: () => void;
  agreeLabel?: string;
  declineLabel?: string;
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = open !== undefined && onOpenChange !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = isControlled ? onOpenChange! : setInternalOpen;
  const hasConsentButtons = onAgree !== undefined || onDecline !== undefined;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden sm:max-w-[55vw] p-0">
        <DialogHeader className="bg-white/bg-slate-50 p-6 pb-4 border-b border-slate-200">
          <DialogTitle>Terms of Use</DialogTitle>
          <DialogDescription>
            <strong>
              <em>LLIBI Claims Reimbursement Portal</em>
            </strong>
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto text-sm leading-6 text-slate-700 px-5">
          <p className="text-justify">
            Please read these Terms of Use before using the{" "}
            <strong>
              <em>LLIBI Claims Reimbursement Portal</em>
            </strong>{" "}
            (&ldquo;Portal&rdquo;).
          </p>
          <p className="text-justify">
            By accessing or using this Portal, you confirm that you have read,
            understood, and agree to comply with these Terms of Use.
          </p>

          <section>
            <h3 className="mb-1 font-semibold text-slate-900">
              About the Portal
            </h3>
            <p className="text-justify">
              The Portal is created, owned, and managed by Lacson and Lacson
              Insurance Brokers, Inc. (&ldquo;
              <strong>
                <em>LLIBI</em>
              </strong>
              ,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
              to facilitate the electronic submission of healthcare
              reimbursement claims and supporting documents by authorized
              representatives of{" "}
              <strong>
                <em>LLIBI</em>
              </strong>
              &apos;s corporate clients on behalf of their eligible employees or
              dependents (&ldquo;Members&rdquo;).
            </p>
            <p className="mt-2">The Portal allows authorized users to:</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li className="text-justify ml-5">
                Submit reimbursement claims and supporting documents on behalf
                of Members;
              </li>
              <li className="text-justify ml-5">
                View the status of submitted claims, where available; and
              </li>
              <li className="text-justify ml-5">
                Receive notifications or requests for additional information
                relating to submitted claims.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="mb-1 font-semibold text-slate-900">
              Authorized Users
            </h3>
            <p className="text-justify">
              Access to the Portal is restricted only to internal{" "}
              <strong>
                <em>LLIBI</em>
              </strong>{" "}
              Teams involved in Claims Processing such as Corporate Accounts
              Executives and where applicable, authorized Human Resources
              personnel, or other representatives designated by{" "}
              <strong>
                <em>LLIBI</em>
              </strong>
              &apos;s corporate clients and authorized to submit reimbursement
              claims on behalf of Members.
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
            <p className="text-justify">
              While{" "}
              <strong>
                <em>LLIBI</em>
              </strong>{" "}
              implements appropriate organizational, physical, and technical
              security measures to protect information processed through the
              Portal, you are responsible for:
            </p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li className="text-justify ml-5">
                maintaining the confidentiality of your login credentials;
              </li>
              <li className="text-justify ml-5">
                submitting only claims that you are authorized to submit;
              </li>
              <li className="text-justify ml-5">
                ensuring that information and documents uploaded through the
                Portal have been provided by, or verified with, the relevant
                Member to the best of your knowledge; and
              </li>
              <li className="text-justify ml-5">
                submitting complete, accurate, and legible information and
                supporting documents to facilitate claim evaluation.
              </li>
            </ul>
            <p className="mt-2">You agree not to:</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li className="text-justify ml-5">
                access or attempt to access claims or information for which you
                are not authorized;
              </li>
              <li className="text-justify ml-5">
                upload unlawful, fraudulent, misleading, altered, fabricated,
                malicious, or unauthorized content;
              </li>
              <li className="text-justify ml-5">
                interfere with or compromise the security, integrity, or
                availability of the Portal; or
              </li>
              <li className="text-justify ml-5">
                use the Portal for any purpose other than the submission and
                administration of reimbursement claims.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="mb-1 font-semibold text-slate-900">
              Claims Processing
            </h3>
            <p className="text-justify">
              Submission of a claim through the Portal does not guarantee
              approval or payment. All claims remain subject to verification,
              policy terms and conditions, applicable benefit limits and
              exclusions.
            </p>
            <p className="mt-2">
              <strong></strong>LLIBI may request additional information or
              supporting documents where necessary to evaluate or process a
              claim.
            </p>
          </section>

          <section>
            <h3 className="mb-1 font-semibold text-slate-900">
              Privacy and Confidentiality
            </h3>
            <p className="text-justify">
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
            <p className="text-justify">
              <strong>LLIBI</strong> employs reasonable administrative,
              physical, and technical safeguards to protect information
              processed through the Portal. However, users are responsible for
              protecting their login credentials and preventing unauthorized
              access to their accounts.
            </p>
            <p className="mt-2">
              If you suspect that your account has been compromised or that
              unauthorized access has occurred, you must immediately notify
              <strong>LLIBI</strong> through privacy@<strong>LLIBI</strong>.com.
            </p>
          </section>

          <section>
            <h3 className="mb-1 font-semibold text-slate-900">
              Portal Availability
            </h3>
            <p className="text-justify">
              <strong>LLIBI</strong> may modify, suspend, restrict, or
              discontinue any feature of the Portal at any time for maintenance,
              security, operational, legal, or other legitimate business
              reasons.
            </p>
          </section>

          <section>
            <h3 className="mb-1 font-semibold text-slate-900">Amendments</h3>
            <p className="text-justify">
              <strong>LLIBI</strong> may revise these Terms of Use from time to
              time. We will notify you of any material changes through the
              Portal or by other appropriate means. Your continued use of the
              Portal after the changes take effect means you accept the revised
              Terms.
            </p>
          </section>

          <p className="border-t border-slate-200 pt-3 text-xs text-slate-500">
            Version: 21 July 2026
          </p>
        </div>
        {hasConsentButtons && (
          <DialogFooter className="p-6 pt-4 border-t border-slate-200 justify-end gap-3.5 flex-shrink-0">
            {onDecline && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={onDecline}
              >
                {declineLabel}
              </Button>
            )}
            {onAgree && (
              <Button
                type="button"
                variant="default"
                size="lg"
                onClick={onAgree}
              >
                {agreeLabel}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

const privacyNoticeLink = (
  <a
    className="font-medium text-[#173b67] underline hover:text-[#0f2f55]"
    href="https://llibi.com/wp-content/uploads/2026/02/LLIBI-Privacy-Notice-Website-rev.-2026-v1.0.pdf"
    target="_blank"
    rel="noreferrer"
  >
    https://llibi.com/wp-content/uploads/2026/02/LLIBI-Privacy-Notice-Website-rev.-2026-v1.0.pdf
  </a>
);

function TermsList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="m-0 list-disc space-y-4 pl-6 marker:text-[#173b67]">
      {children}
    </ul>
  );
}

function HrSubmissionTerms() {
  return (
    <TermsList>
      <li className="pl-1">
        I confirm that I am an authorized HR personnel of an LLIBI corporate
        client, duly authorized to submit this claim on behalf of the Member
        named in the reimbursement documents to be submitted, and that all
        information and documents submitted have been provided by, or verified
        with, the Member and are, to the best of my knowledge and based on the
        information made available to me, true, correct, and complete. I
        understand that providing incomplete or unclear information or documents
        may result in delays in the evaluation and processing of the claim. I
        also understand that insurance fraud is prohibited under Philippine law,
        and that submitting false, misleading, fraudulent, altered, exaggerated,
        or fabricated claims or supporting documents may result not only in
        denial of benefits and policy cancellation, but also in civil or
        criminal liability for any person responsible under applicable
        Philippine law.
      </li>
      <li className="pl-1">
        In accordance with the Data Privacy Act of 2012 (Republic Act No.
        10173), its Implementing Rules and Regulations, and other applicable
        data protection and privacy laws, I confirm that, to the best of my
        knowledge, the Member has provided the necessary consent, or that the
        Client has otherwise identified a lawful basis for the collection and
        processing of the Member&apos;s personal data (which may include
        identification information, contact details, financial information, and
        medical records) for purposes of evaluating and settling the claim.
        <p className="mt-2.5">
          I acknowledge that I have read and understood LLIBI&apos;s Privacy
          Notice, available at {privacyNoticeLink}, and that I have made this
          Notice available to, or otherwise informed, the Member. I understand
          that the Notice informs the Member how the Member&apos;s personal data
          is collected, used, stored, shared, and protected, and sets out the
          Member&apos;s rights as a data subject under applicable law, including
          the right to access, correct, update, withdraw consent, or request
          deletion of personal data, subject to lawful limitations, and the
          procedures for exercising those rights.
        </p>
        <p className="mt-2.5">
          I understand that appropriate safeguards are in place to protect the
          Member&apos;s personal data and that such information will be retained
          only for as long as necessary to fulfill legal, regulatory, and
          contractual obligations.
        </p>
        <p className="mt-2.5">
          I confirm that, to the best of my knowledge, the Member has agreed, or
          that another lawful basis exists under applicable law, for such
          sharing only when necessary and in accordance with the law, with
          authorized third parties such as medical professionals, insurers,
          reinsurers, service providers, legal advisors, and regulatory
          authorities, for legitimate insurance, compliance, and fraud
          prevention purposes.
        </p>
      </li>
      <li className="pl-1">
        I confirm that all bank account and payment details provided are
        accurate and belong either to the Member or to the Member&apos;s duly
        authorized representative. I acknowledge that LLIBI shall not be liable
        for any error or misdirected payment solely resulting from incorrect or
        incomplete banking information submitted by me or the Member. LLIBI
        shall be deemed to have fulfilled its payment obligation once payment
        has been processed based on the banking details submitted.
      </li>
      <li className="pl-1">
        I confirm that I am authorized to submit this claim on behalf of the
        Member and that, to the best of my knowledge, the information,
        documents, and banking details submitted have been provided by, or
        verified with, the Member and are complete and accurate.
      </li>
    </TermsList>
  );
}

function OnsiteSubmissionTerms() {
  return (
    <TermsList>
      <li className="pl-1">
        I confirm that I am the Corporate Accounts Executive (Onsite) assigned
        to the LLIBI corporate client where the Member is employed, and that I
        am duly authorized to submit this claim on behalf of the Member named in
        the reimbursement documents. I further confirm that all information and
        documents submitted have been provided by, or verified with, the Member
        and are, to the best of my knowledge and based on the information made
        available to me, true, correct, and complete. I understand that
        providing incomplete or unclear information or documents may result in
        delays in the evaluation and processing of the claim. I also understand
        that insurance fraud is prohibited under Philippine law, and that
        submitting false, misleading, fraudulent, altered, exaggerated, or
        fabricated claims or supporting documents may result not only in denial
        of benefits and policy cancellation, but also in civil or criminal
        liability for any person responsible under applicable Philippine law.
      </li>
      <li className="pl-1">
        In accordance with the Data Privacy Act of 2012 (Republic Act No.
        10173), its Implementing Rules and Regulations, and other applicable
        data protection and privacy laws, I confirm that, to the best of my
        knowledge, the Member has provided the necessary consent, or that the
        Client has otherwise identified a lawful basis for the collection and
        processing of the Member&apos;s personal data (which may include
        identification information, contact details, financial information, and
        medical records) for purposes of evaluating and settling the claim.
        <p className="mt-2.5">
          I acknowledge that I have read and understood LLIBI&apos;s Privacy
          Notice, available at {privacyNoticeLink}, and that I have made this
          Notice available to, or otherwise informed, the Member. I understand
          that the Notice informs the Member how the Member&apos;s personal data
          is collected, used, stored, shared, and protected, and sets out the
          Member&apos;s rights as a data subject under applicable law, including
          the right to access, correct, update, withdraw consent, or request
          deletion of personal data, subject to lawful limitations, and the
          procedures for exercising those rights.
        </p>
        <p className="mt-2.5">
          I understand that appropriate safeguards are in place to protect the
          Member&apos;s personal data and that such information will be retained
          only for as long as necessary to fulfill legal, regulatory, and
          contractual obligations.
        </p>
        <p className="mt-2.5">
          I confirm that, to the best of my knowledge, the Member has agreed, or
          that another lawful basis exists under applicable law, for such
          sharing only when necessary and in accordance with the law, with
          authorized third parties such as medical professionals, insurers,
          reinsurers, service providers, legal advisors, and regulatory
          authorities, for legitimate insurance, compliance, and fraud
          prevention purposes.
        </p>
      </li>
      <li className="pl-1">
        I confirm that all bank account and payment details provided are
        accurate and belong either to the Member or to the Member&apos;s duly
        authorized representative. I acknowledge that LLIBI shall not be liable
        for any error or misdirected payment solely resulting from incorrect or
        incomplete banking information submitted by me or the Member. LLIBI
        shall be deemed to have fulfilled its payment obligation once payment
        has been processed based on the banking details submitted.
      </li>
      <li className="pl-1">
        I confirm that I am authorized to submit this claim on behalf of the
        Member and that, to the best of my knowledge, the information,
        documents, and banking details submitted have been provided by, or
        verified with, the Member and are complete and accurate.
      </li>
    </TermsList>
  );
}

export function SubmissionTermsDialog({
  open,
  onOpenChange,
  variant,
  onAgree,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: "hr" | "onsite";
  onAgree: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[850px] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b border-slate-200">
          <DialogTitle className="text-xl font-bold text-black dark:*:text-white">
            Terms and Conditions
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 overflow-y-auto text-[14px] leading-relaxed text-[#333] text-justify">
          <p className="mb-4 font-semibold">
            Please read and confirm the following before submitting the claim/s:
          </p>
          {variant === "onsite" ? (
            <OnsiteSubmissionTerms />
          ) : (
            <HrSubmissionTerms />
          )}
          <p className="mt-6 border-t border-slate-200 pt-4 font-medium text-slate-800">
            I have read, understood, and accepted the above statements.
          </p>
        </div>
        <DialogFooter className="p-6 pt-4 border-t border-slate-200 justify-end gap-3.5">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => onOpenChange(false)}
          >
            Disagree
          </Button>
          <Button type="button" variant="default" size="lg" onClick={onAgree}>
            Agree
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
