"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/lib/site";
import { loadCustomer, saveCustomer, isValidKePhone } from "@/lib/customer";
import { WhatsAppIcon } from "@/components/icons";

const TOPICS = [
  "General enquiry",
  "Request a quote",
  "Branding & printing",
  "Corporate gifts",
  "Banners & signage",
  "Web design",
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");

  // reuse whatever they gave us in a previous enquiry
  useEffect(() => {
    const c = loadCustomer();
    if (c) {
      setName(c.name);
      setPhone(c.phone);
    }
  }, []);

  const composed = [
    `Hello Hensa Solutions! 👋`,
    ``,
    `*${topic}*`,
    ``,
    message.trim() || "(I'd like to discuss a project with you.)",
    name.trim() || phone.trim() ? `` : null,
    name.trim() || phone.trim() ? `———` : null,
    name.trim() ? `Name: ${name.trim()}` : null,
    phone.trim() ? `Phone: ${phone.trim()}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const remember = () => {
    if (name.trim() && phone.trim() && isValidKePhone(phone))
      saveCustomer({ name: name.trim(), phone: phone.trim() });
  };

  return (
    <div className="cropmarks border border-ink/15 bg-cream p-7">
      <p className="spec text-green-deep">Send us a message</p>
      <h2 className="font-display mt-2 text-2xl font-extrabold">
        It lands straight in our WhatsApp
      </h2>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="spec mb-1.5 block text-ink-soft">
            Your name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Wanjiku"
            className="w-full rounded-lg border border-ink/20 bg-white/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink-soft/50 focus:border-green"
          />
        </div>

        <div>
          <label htmlFor="phone" className="spec mb-1.5 block text-ink-soft">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0712 345 678"
            className="w-full rounded-lg border border-ink/20 bg-white/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink-soft/50 focus:border-green"
          />
        </div>

        <div>
          <label htmlFor="topic" className="spec mb-1.5 block text-ink-soft">
            What&apos;s it about?
          </label>
          <select
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-lg border border-ink/20 bg-white/70 px-4 py-3 text-sm outline-none focus:border-green"
          >
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="spec mb-1.5 block text-ink-soft">
            Your message
          </label>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about the products, quantities, branding and timelines you have in mind…"
            className="w-full resize-none rounded-lg border border-ink/20 bg-white/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink-soft/50 focus:border-green"
          />
        </div>

        <a
          href={waLink(composed)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={remember}
          className="flex w-full items-center justify-center gap-2.5 rounded-full bg-green px-6 py-4 font-display font-bold text-white shadow-[0_8px_24px_rgba(51,160,44,0.35)] transition-all hover:-translate-y-0.5 hover:bg-green-deep"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Send via WhatsApp
        </a>
        <p className="text-center text-xs text-ink-soft">
          Opens WhatsApp with your message pre-filled — nothing is sent until
          you press send.
        </p>
      </div>
    </div>
  );
}
