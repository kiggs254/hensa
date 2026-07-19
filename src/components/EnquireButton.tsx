"use client";

import { useEnquiry, type EnquiryPayload } from "@/components/EnquiryProvider";

/**
 * Any WhatsApp enquiry entry point. Routes through the enquiry modal the first
 * time, then straight to WhatsApp for returning customers.
 */
export default function EnquireButton({
  payload = {},
  className,
  children,
  ariaLabel,
}: {
  payload?: EnquiryPayload;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  const { openEnquiry } = useEnquiry();
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => openEnquiry(payload)}
      className={className}
    >
      {children}
    </button>
  );
}
