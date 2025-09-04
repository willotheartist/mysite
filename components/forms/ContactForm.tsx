"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export default function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const hpId = useId(); // honeypot id

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.status === "submitting") return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      budget: String(formData.get("budget") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      hp_field: String(formData.get("hp_field") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setState({ status: "error", message: "Please fill in name, email, and a message." });
      return;
    }

    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json?.error || "Something went wrong");
      setState({ status: "success" });
      form.reset();
    } catch (err: any) {
      setState({ status: "error", message: err?.message || "Could not send message" });
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-2xl">
      {/* Honeypot */}
      <div className="sr-only" aria-hidden>
        <label htmlFor={hpId}>Leave this field empty</label>
        <input id={hpId} name="hp_field" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-1 block w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[15px] outline-none ring-0 focus:border-black/30"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 block w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[15px] outline-none ring-0 focus:border-black/30"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-neutral-700">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className="mt-1 block w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[15px] outline-none ring-0 focus:border-black/30"
          />
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-neutral-700">
            Budget (optional)
          </label>
          <select
            id="budget"
            name="budget"
            defaultValue=""
            className="mt-1 block w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[15px] outline-none ring-0 focus:border-black/30"
          >
            <option value="" disabled>
              Select a range
            </option>
            <option value="under-2k">Under £2,000</option>
            <option value="2k-5k">£2,000 – £5,000</option>
            <option value="5k-10k">£5,000 – £10,000</option>
            <option value="10k-plus">£10,000+</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700">
            Project details *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="mt-1 block w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[15px] outline-none ring-0 focus:border-black/30"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs text-neutral-600">By submitting, you agree to be contacted about your project.</p>
        <Button type="submit" disabled={state.status === "submitting"}>
          {state.status === "submitting" ? "Sending…" : "Send message"}
        </Button>
      </div>

      {state.status === "success" && (
        <div className="mt-4 rounded-xl border border-green-600/20 bg-green-50 px-4 py-3 text-sm text-green-700">
          Thanks — got it! I’ll reply to your email soon.
        </div>
      )}
      {state.status === "error" && (
        <div className="mt-4 rounded-xl border border-red-600/20 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </div>
      )}
    </form>
  );
}
