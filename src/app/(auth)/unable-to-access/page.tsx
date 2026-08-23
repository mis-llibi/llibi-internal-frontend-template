"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Lock, LogIn, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TermsOfUseDialog } from "@/components/terms-of-use-dialog";

const PRIVACY_NOTICE_URL =
  "https://llibi.com/wp-content/uploads/2026/02/LLIBI-Privacy-Notice-Website-rev.-2026-v1.0.pdf";

export default function UnableToAccess() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(15,23,42,0.14),transparent_55%)] px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(15,23,42,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.12)_1px,transparent_1px)] [background-size:36px_36px]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="overflow-hidden rounded-3xl border border-border bg-card/90 p-8 text-center shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-2 shadow-sm border border-border">
              <Image
                src="/llibi-icon.png"
                alt="LLIBI Logo"
                width={48}
                height={48}
                unoptimized
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <Lock className="h-6 w-6" />
            </div>
          </div>

          <h1 className="mt-6 text-xl font-bold tracking-tight text-foreground">
            Access Declined
          </h1>

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            You cannot access the LLIBI Portal Template because you did not agree to the current Terms of Use and Privacy Notice.
          </p>

          <div className="mt-6 space-y-2.5">
            <Button
              asChild
              className="h-10 w-full font-semibold shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              <Link href="/login">
                <LogIn className="h-4 w-4" />
                <span>Return to Sign In</span>
              </Link>
            </Button>

            <TermsOfUseDialog
              trigger={
                <Button
                  variant="outline"
                  className="h-10 w-full font-medium gap-2 border-border hover:bg-accent"
                >
                  <FileText className="h-4 w-4" />
                  <span>Read Terms of Use</span>
                </Button>
              }
            />
          </div>

          <div className="mt-5 pt-4 border-t border-border/60 text-xs text-muted-foreground">
            <a
              href={PRIVACY_NOTICE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
            >
              <span>View Privacy Notice (PDF)</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
