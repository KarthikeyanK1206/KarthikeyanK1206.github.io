"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <>
      <button type="button" onClick={copy} className="text-button">
        {copied ? <Check size={17} /> : <Copy size={17} />}
        {copied ? "Email copied" : "Copy email"}
      </button>
      <span className="sr-only" role="status">
        {copied ? "Email address copied to clipboard." : ""}
      </span>
    </>
  );
}
