"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

interface CopyableEmailProps {
  email: string;
  variant?: "footer" | "contact";
}

export function CopyableEmail({ email, variant = "contact" }: CopyableEmailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === "footer") {
    return (
      <a
        href={`mailto:${email}`}
        onClick={handleCopy}
        className="flex items-start gap-2 text-ink/75 transition-colors hover:text-ink group cursor-pointer"
      >
        <Mail className="h-4 w-4 text-ink/50 shrink-0 mt-[1px]" />
        <span className="break-all group-hover:underline leading-snug">
          {copied ? "COPIED TO CLIPBOARD!" : email.toUpperCase()}
        </span>
      </a>
    );
  }

  return (
    <a
      href={`mailto:${email}`}
      onClick={handleCopy}
      className="flex items-center gap-3 group cursor-pointer"
    >
      <div className="btn-icon-circular shrink-0">
        <Mail className="h-4 w-4" />
      </div>
      <div>
        <div className="caption-mono text-ink/40 mb-0.5">Email</div>
        <span className="body-sm-figma text-ink group-hover:underline">
          {copied ? "Copied to clipboard!" : email}
        </span>
      </div>
    </a>
  );
}
