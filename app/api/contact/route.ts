// app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Updated minimal required fields
    const required = ["firstName", "email", "message"];
    const missing = required.filter((k) => !data?.[k]);
    if (missing.length) {
      return new NextResponse(
        `Missing required fields: ${missing.join(", ")}`,
        { status: 400 }
      );
    }

    // Log submission (replace with email/CRM integration)
    console.log("[contact] submission", {
      name: [data.firstName, data.lastName].filter(Boolean).join(" "),
      email: data.email,
      interest: data.interest,
      message: data.message,
    });

    await new Promise((r) => setTimeout(r, 300));
    return NextResponse.json({ ok: true });
  } catch {
    return new NextResponse("Invalid request", { status: 400 });
  }
}
