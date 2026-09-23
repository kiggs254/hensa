"use client";

import { useEffect, useState } from "react";

/** Workshop hours: Mon–Sat, 08:00–18:00 Nairobi time. */
const OPEN_HOUR = 8;
const CLOSE_HOUR = 18;
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function nairobiNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const weekday = get("weekday");
  const hour = parseInt(get("hour"), 10);
  const minute = get("minute");
  const day = DAYS.indexOf(weekday);

  return { day, hour, minute, clock: `${String(hour).padStart(2, "0")}:${minute}` };
}

export default function OpenStatus() {
  const [now, setNow] = useState<ReturnType<typeof nairobiNow> | null>(null);

  useEffect(() => {
    const tick = () => setNow(nairobiNow());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // render nothing until mounted, which avoids a server/client clock mismatch
  if (!now) {
    return <span className="block h-[18px]" aria-hidden="true" />;
  }

  const isWorkday = now.day >= 1 && now.day <= 6;
  const isOpen = isWorkday && now.hour >= OPEN_HOUR && now.hour < CLOSE_HOUR;

  const nextOpen = () => {
    if (isWorkday && now.hour < OPEN_HOUR) return "opens 8:00am";
    if (now.day === 6 && now.hour >= CLOSE_HOUR) return "opens Mon 8:00am";
    if (now.day === 0) return "opens Mon 8:00am";
    return "opens tomorrow 8:00am";
  };

  return (
    <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
      <span className="relative flex h-2 w-2 flex-none">
        {isOpen && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa opacity-75" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            isOpen ? "bg-wa" : "bg-orange"
          }`}
        />
      </span>
      <span className={isOpen ? "font-semibold text-wa" : "font-semibold text-orange"}>
        {isOpen ? "Open now" : "Closed"}
      </span>
      <span className="text-cream/45">
        {isOpen ? `· ${now.clock} in Nairobi` : `· ${nextOpen()}`}
      </span>
    </span>
  );
}
