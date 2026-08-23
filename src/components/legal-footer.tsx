"use client";

import Link from "next/link";
import { TermsOfUseDialog } from "@/components/terms-of-use-dialog";

export function LegalFooter() {
  return (
    <footer className="border-t border-border bg-background px-6 py-4">
      <nav className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
        <TermsOfUseDialog
          trigger={
            <button
              type="button"
              className="hover:text-foreground underline-offset-2 hover:underline"
            >
              Terms of Use
            </button>
          }
        />
        <Link
          href="https://llibi.com/wp-content/uploads/2026/02/LLIBI-Privacy-Notice-Website-rev.-2026-v1.0.pdf"
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground underline-offset-2 hover:underline"
        >
          Privacy Notice
        </Link>
      </nav>
    </footer>
  );
}