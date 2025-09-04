"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type ChatBubbleProps = {
  /** Message text to display */
  message: string;
  /** Display name (e.g., your name) */
  name: string;
  /** Time label (e.g., “11:46”) */
  time: string;
  /** Avatar image URL */
  avatarSrc: string;
  /** If provided, dismissal persists in sessionStorage under this key */
  persistKey?: string;
  /** Delay before showing (ms). Set 0 to show immediately. */
  delayMs?: number;
  /** Start visible on first mount (default true) */
  initialOpen?: boolean;
  /** Optional callback when closed */
  onClose?: () => void;
  /** Optional delivered/read hint; omit to hide */
  deliveredLabel?: string;
  /** Override max width of the bubble (Tailwind class). Default: "max-w-[320px]" */
  maxWidthClass?: string;
};

export default function ChatBubble({
  message,
  name,
  time,
  avatarSrc,
  persistKey,
  delayMs = 250,
  initialOpen = true,
  onClose,
  deliveredLabel = "Delivered",
  maxWidthClass = "max-w-[320px]",
}: ChatBubbleProps) {
  const [open, setOpen] = useState<boolean>(initialOpen);

  // Respect persisted dismissal (sessionStorage) without breaking SSR.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (persistKey && sessionStorage.getItem(persistKey) === "dismissed") {
      setOpen(false);
      return;
    }
    if (delayMs > 0) {
      const t = setTimeout(() => setOpen(true), delayMs);
      return () => clearTimeout(t);
    } else {
      setOpen(true);
    }
  }, [persistKey, delayMs]);

  const handleClose = () => {
    setOpen(false);
    if (typeof window !== "undefined" && persistKey) {
      sessionStorage.setItem(persistKey, "dismissed");
    }
    onClose?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          role="region"
          aria-label="Incoming message"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6 pointer-events-auto"
        >
          <div className="relative flex items-start gap-2.5">
            {/* Avatar */}
            <img
              src={avatarSrc}
              alt={`${name} avatar`}
              className="w-9 h-9 rounded-full object-cover"
              width={36}
              height={36}
            />

            {/* Bubble */}
            <div
              className={[
                "flex flex-col w-full",
                maxWidthClass,
                "leading-5 p-4 bg-white text-black border border-gray-200 rounded-2xl shadow-xl",
              ].join(" ")}
            >
              {/* Header: name + time */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{name}</span>
                <span className="text-xs text-gray-500">{time}</span>
              </div>

              {/* Message */}
              <p className="text-sm pt-2">{message}</p>

              {/* Footer hint */}
              {deliveredLabel ? (
                <span className="text-xs text-gray-500 pt-2">{deliveredLabel}</span>
              ) : null}
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close message"
              className="absolute -top-2 -right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              {/* Inline X icon to avoid extra deps */}
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
