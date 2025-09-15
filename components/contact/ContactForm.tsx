// components/contact/ContactForm.tsx
"use client";

import { useId, useState } from "react";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

export default function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Request failed");
      }
      setStatus({ state: "success" });
      form.reset();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setStatus({ state: "error", message });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-labelledby={`${formId}-title`}
      className="flex flex-col gap-6"
    >
      <div>
        <h2
          id={`${formId}-title`}
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          Feel free to introduce yourself
        </h2>
        <p className="mt-1 text-sm text-neutral-600">
          We’ll get back as soon as we can.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="First name"
          name="firstName"
          autoComplete="given-name"
          required
        />
        <Field
          label="Last name (optional)"
          name="lastName"
          autoComplete="family-name"
          required={false}
        />
        <Field
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          required
        />
        <Select
          label="What are you looking for?"
          name="interest"
          options={["A project", "Consulting", "Speaking", "Just saying hi"]}
          fullCol
        />
        <Textarea
          label="What’s on your mind?"
          name="message"
          placeholder="Share a bit about what you need, timing, links—anything helpful."
          required
          rows={6}
          fullCol
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={status.state === "submitting"}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status.state === "submitting" ? "Sending…" : "Send message"}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="transition group-hover:translate-x-0.5"
          >
            <path
              d="M7 17L17 7M17 7H9M17 7v8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>

        {/* Inline status */}
        {status.state === "success" && (
          <p role="status" className="mt-3 text-sm text-emerald-600">
            Thanks — your message is in. We’ll reply soon.
          </p>
        )}
        {status.state === "error" && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}

/* ---------- Inputs ---------- */

function Field(props: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  fullCol?: boolean;
}) {
  const id = useId();
  return (
    <div className={props.fullCol ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500"
      >
        {props.label} {props.required ? <span aria-hidden>*</span> : null}
      </label>
      <input
        id={id}
        name={props.name}
        type={props.type ?? "text"}
        required={props.required}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        className="block w-full rounded-xl bg-white px-4 py-3 text-sm text-neutral-900 outline-none ring-1 ring-neutral-200 transition placeholder:text-neutral-500 focus:ring-2 focus:ring-neutral-900/20"
      />
    </div>
  );
}

function Select(props: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  fullCol?: boolean;
}) {
  const id = useId();
  return (
    <div className={props.fullCol ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500"
      >
        {props.label} {props.required ? <span aria-hidden>*</span> : null}
      </label>
      <div className="relative">
        <select
          id={id}
          name={props.name}
          required={props.required}
          className="block w-full appearance-none rounded-xl bg-white px-4 py-3 pr-9 text-sm text-neutral-900 outline-none ring-1 ring-neutral-200 transition focus:ring-2 focus:ring-neutral-900/20"
          defaultValue=""
        >
          <option value="" disabled>
            Please select an option
          </option>
          {props.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center"
        >
          ▼
        </span>
      </div>
    </div>
  );
}

function Textarea(props: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
  fullCol?: boolean;
}) {
  const id = useId();
  return (
    <div className={props.fullCol ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500"
      >
        {props.label} {props.required ? <span aria-hidden>*</span> : null}
      </label>
      <textarea
        id={id}
        name={props.name}
        rows={props.rows ?? 5}
        required={props.required}
        placeholder={props.placeholder}
        className="block w-full resize-y rounded-xl bg-white px-4 py-3 text-sm text-neutral-900 outline-none ring-1 ring-neutral-200 transition placeholder:text-neutral-500 focus:ring-2 focus:ring-neutral-900/20"
      />
    </div>
  );
}
