"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { waLink, site } from "@/lib/site";
import {
  loadCustomer,
  saveCustomer,
  clearCustomer,
  isValidKePhone,
  isValidEmail,
  type Customer,
} from "@/lib/customer";
import { WhatsAppIcon } from "@/components/icons";

export interface EnquiryPayload {
  /** product name; omit for a general enquiry */
  productName?: string;
  productUrl?: string;
  quantity?: number;
  note?: string;
  /** service name, for service-page enquiries */
  service?: string;
}

interface Ctx {
  openEnquiry: (payload?: EnquiryPayload) => void;
  /** opens the form on its own so a returning customer can edit their details */
  editDetails: () => void;
  customer: Customer | null;
}

const EnquiryContext = createContext<Ctx | null>(null);

export function useEnquiry(): Ctx {
  const ctx = useContext(EnquiryContext);
  if (!ctx)
    throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return ctx;
}

/**
 * `collect`: first visit, we need their details
 * `compose`: details known, just offer an optional message
 * `edit`:    managing saved details, no enquiry attached
 */
type Mode = "collect" | "compose" | "edit";

function buildMessage(
  payload: EnquiryPayload,
  c: Customer | null,
  extra: string
): string {
  const lines: string[] = ["Hello Hensa Solutions! 👋", ""];

  if (payload.productName) {
    lines.push("I'd like to enquire about:", `*${payload.productName}*`);
    if (payload.quantity && payload.quantity > 1)
      lines.push(`Quantity: ${payload.quantity}`);
  } else if (payload.service) {
    lines.push(`I'd like to enquire about your *${payload.service}* service.`);
  } else {
    lines.push("I'd like to make an enquiry.");
  }

  // the product widget's note and the modal message are both "their words"
  const notes = [payload.note?.trim(), extra.trim()].filter(Boolean);
  if (notes.length) lines.push(`Note: ${notes.join("; ")}`);

  if (payload.productUrl) lines.push("", payload.productUrl);

  if (c) {
    lines.push("", "---", `Name: ${c.name}`, `Phone: ${c.phone}`);
    if (c.email?.trim()) lines.push(`Email: ${c.email.trim()}`);
  }

  return lines.join("\n");
}

export default function EnquiryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("collect");
  const [pending, setPending] = useState<EnquiryPayload | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
  }>({});

  const firstField = useRef<HTMLInputElement>(null);
  const messageField = useRef<HTMLTextAreaElement>(null);

  const clearError = (field: keyof typeof errors) =>
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));

  useEffect(() => {
    setCustomer(loadCustomer());
  }, []);

  const go = useCallback(
    (payload: EnquiryPayload, c: Customer | null, extra: string) => {
      window.open(
        waLink(buildMessage(payload, c, extra)),
        "_blank",
        "noopener,noreferrer"
      );
    },
    []
  );

  const closeModal = useCallback(() => {
    setOpen(false);
    setPending(null);
    setErrors({});
    setMessage("");
  }, []);

  const primeForm = useCallback((c: Customer | null) => {
    setName(c?.name ?? "");
    setPhone(c?.phone ?? "");
    setEmail(c?.email ?? "");
    setErrors({});
  }, []);

  const openEnquiry = useCallback(
    (payload: EnquiryPayload = {}) => {
      const saved = loadCustomer();
      setCustomer(saved);
      primeForm(saved);
      setMessage("");
      setPending(payload);
      setMode(saved ? "compose" : "collect");
      setOpen(true);
    },
    [primeForm]
  );

  const editDetails = useCallback(() => {
    const saved = loadCustomer();
    setCustomer(saved);
    primeForm(saved);
    setMessage("");
    setPending(null);
    setMode("edit");
    setOpen(true);
  }, [primeForm]);

  // focus + escape + scroll lock
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(
      () =>
        mode === "compose"
          ? messageField.current?.focus()
          : firstField.current?.focus(),
      120
    );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, mode, closeModal]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    // returning customer, nothing to validate, just send
    if (mode === "compose") {
      const payload = pending;
      const extra = message;
      closeModal();
      if (payload) go(payload, customer, extra);
      return;
    }

    const next: typeof errors = {};
    if (!name.trim()) next.name = "Please tell us your name";
    if (!phone.trim()) next.phone = "We need a number to reply on";
    else if (!isValidKePhone(phone))
      next.phone = "That doesn't look like a valid number";
    if (!isValidEmail(email)) next.email = "That email looks off";
    setErrors(next);
    if (Object.keys(next).length) return;

    const saved = saveCustomer({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
    });
    setCustomer(saved);

    const payload = pending;
    const extra = message;
    closeModal();
    if (payload) go(payload, saved, extra);
  };

  const skip = () => {
    const payload = pending;
    const extra = message;
    closeModal();
    if (payload) go(payload, null, extra);
  };

  const forget = () => {
    clearCustomer();
    setCustomer(null);
    primeForm(null);
    setMode("collect");
  };

  const copy = {
    collect: {
      title: "Before we chat",
      body: "Quick intro so our team can prepare your quote. We'll remember it, so you only do this once.",
      cta: "Continue to WhatsApp",
    },
    compose: {
      title: "Anything to add?",
      body: "Tell us quantities, colours, sizes or deadlines, or just hit send and we'll take it from there.",
      cta: "Send on WhatsApp",
    },
    edit: {
      title: "Your details",
      body: "These are saved on this device and attached to your WhatsApp enquiries.",
      cta: "Save details",
    },
  }[mode];

  const inputClass = (invalid?: string) =>
    `mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink-soft/50 ${
      invalid ? "border-orange" : "border-ink/15 focus:border-green"
    }`;

  return (
    <EnquiryContext.Provider value={{ openEnquiry, editDetails, customer }}>
      {children}

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="animate-rise relative max-h-[92vh] w-full max-w-md overflow-y-auto overflow-x-hidden rounded-t-3xl border border-ink/10 bg-cream shadow-[0_40px_80px_rgba(28,26,22,0.35)] sm:rounded-3xl">
            <div className="halftone pointer-events-none absolute -right-8 -top-8 h-32 w-32 text-orange/25" />

            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-cream text-lg leading-none text-ink-soft transition-colors hover:border-orange hover:text-orange"
            >
              ×
            </button>

            <div className="relative p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-wa/15 text-green-deep">
                <WhatsAppIcon className="h-6 w-6" />
              </span>

              <h2
                id="enquiry-title"
                className="font-display mt-4 text-2xl font-extrabold tracking-tight"
              >
                {copy.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {copy.body}
              </p>

              <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
                {mode === "compose" ? (
                  /* returning customer: identity chip instead of the form */
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-ink/10 bg-paper-warm px-4 py-3">
                    <span className="min-w-0">
                      <span className="spec block text-[9px] text-ink-soft">
                        Sending as
                      </span>
                      <span className="block truncate text-sm font-bold">
                        {customer?.name}
                        <span className="font-normal text-ink-soft">
                          {" "}
                          · {customer?.phone}
                        </span>
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setMode("collect")}
                      className="flex-none text-xs font-semibold text-green-deep underline-offset-2 transition-colors hover:text-orange hover:underline"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <label
                        htmlFor="enq-name"
                        className="spec block text-[10px] text-ink-soft"
                      >
                        Your name
                      </label>
                      <input
                        id="enq-name"
                        ref={firstField}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          clearError("name");
                        }}
                        placeholder="Jane Wanjiku"
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                        className={inputClass(errors.name)}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs font-semibold text-orange">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="enq-phone"
                        className="spec block text-[10px] text-ink-soft"
                      >
                        Phone number
                      </label>
                      <input
                        id="enq-phone"
                        type="tel"
                        inputMode="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          clearError("phone");
                        }}
                        placeholder="0712 345 678"
                        autoComplete="tel"
                        aria-invalid={!!errors.phone}
                        className={inputClass(errors.phone)}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs font-semibold text-orange">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="enq-email"
                        className="spec flex items-center gap-2 text-[10px] text-ink-soft"
                      >
                        Email
                        <span className="rounded-full bg-ink/8 px-2 py-0.5 text-[9px] normal-case tracking-normal">
                          optional
                        </span>
                      </label>
                      <input
                        id="enq-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          clearError("email");
                        }}
                        placeholder="jane@company.co.ke"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        className={inputClass(errors.email)}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs font-semibold text-orange">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* optional message, sent with the enquiry */}
                {mode !== "edit" && (
                  <div>
                    <label
                      htmlFor="enq-message"
                      className="spec flex items-center gap-2 text-[10px] text-ink-soft"
                    >
                      Your message
                      <span className="rounded-full bg-ink/8 px-2 py-0.5 text-[9px] normal-case tracking-normal">
                        optional
                      </span>
                    </label>
                    <textarea
                      id="enq-message"
                      ref={messageField}
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. 50 pieces, navy blue, logo on the chest, needed by Friday"
                      className="mt-1.5 w-full resize-none rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink-soft/50 focus:border-green"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2.5 rounded-full bg-green px-6 py-3.5 font-display font-bold text-white shadow-[0_10px_26px_rgba(51,160,44,0.35)] transition-all hover:-translate-y-0.5 hover:bg-green-deep"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {copy.cta}
                </button>

                {mode !== "compose" && (
                  <div className="flex items-center justify-center gap-3 pt-0.5">
                    {mode === "edit"
                      ? customer && (
                          <button
                            type="button"
                            onClick={forget}
                            className="text-xs font-semibold text-ink-soft underline-offset-2 transition-colors hover:text-orange hover:underline"
                          >
                            Forget my details
                          </button>
                        )
                      : pending && (
                          <button
                            type="button"
                            onClick={skip}
                            className="text-xs font-semibold text-ink-soft underline-offset-2 transition-colors hover:text-orange hover:underline"
                          >
                            Skip for now
                          </button>
                        )}
                  </div>
                )}
              </form>
            </div>

            <p className="border-t border-dashed border-ink/15 bg-paper-warm px-7 py-3.5 text-center text-[11px] text-ink-soft">
              Or call us directly on{" "}
              <a
                href={site.phoneHref}
                className="font-semibold text-green-deep hover:text-orange"
              >
                {site.phone}
              </a>
            </p>
          </div>
        </div>
      )}
    </EnquiryContext.Provider>
  );
}
