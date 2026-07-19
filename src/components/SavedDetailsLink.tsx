"use client";

import { useEnquiry } from "@/components/EnquiryProvider";

/** Only visible once a customer's details are stored on this device. */
export default function SavedDetailsLink({
  className = "",
}: {
  className?: string;
}) {
  const { customer, editDetails } = useEnquiry();
  if (!customer) return null;

  return (
    <button
      type="button"
      onClick={editDetails}
      className={`transition-colors hover:text-orange ${className}`}
    >
      Saved as {customer.name.split(" ")[0]} · edit details
    </button>
  );
}
