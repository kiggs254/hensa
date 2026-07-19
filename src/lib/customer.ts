export interface Customer {
  name: string;
  phone: string;
  email?: string;
  savedAt: string;
}

const KEY = "hensa.customer.v1";

export function loadCustomer(): Customer | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Customer>;
    if (!parsed?.name || !parsed?.phone) return null;
    return {
      name: parsed.name,
      phone: parsed.phone,
      email: parsed.email,
      savedAt: parsed.savedAt ?? "",
    };
  } catch {
    return null;
  }
}

export function saveCustomer(c: Omit<Customer, "savedAt">): Customer {
  const record: Customer = { ...c, savedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    /* storage blocked — enquiry still proceeds, we just can't remember them */
  }
  return record;
}

export function clearCustomer(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

/** Accepts 07…, 01…, +2547…, 2547… and normalises for display. */
export function isValidKePhone(input: string): boolean {
  const digits = input.replace(/[\s-()]/g, "");
  return /^(?:\+?254|0)?7\d{8}$/.test(digits) || /^(?:\+?254|0)?1\d{8}$/.test(digits);
}

export function isValidEmail(input: string): boolean {
  if (!input.trim()) return true; // optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.trim());
}
