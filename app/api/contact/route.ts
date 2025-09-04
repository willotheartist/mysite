import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Basic guardrails (server-side)
    const { name, email, message, company, budget, hp_field } = data ?? {};
    if (typeof hp_field === "string" && hp_field.trim() !== "") {
      // Honeypot caught a bot
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    // 🔒 In a real setup, send an email or store in DB here.
    // e.g., Resend/Sendgrid/SES/Notion/Slack webhook, etc.
    // For now we just log on the server:
    console.log("[CONTACT] New inquiry", {
      name,
      email,
      company: company ?? "",
      budget: budget ?? "",
      message,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[CONTACT] Error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
