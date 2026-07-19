"use client";

import { useEnquiry } from "@/components/EnquiryProvider";
import { WhatsAppIcon } from "@/components/icons";

export default function WhatsAppFloat() {
  const { openEnquiry } = useEnquiry();
  return (
    <button
      type="button"
      onClick={() => openEnquiry()}
      aria-label="Enquire on WhatsApp"
      className="animate-wa-pulse fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-lg transition-transform hover:scale-110 sm:bottom-7 sm:right-7"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </button>
  );
}
