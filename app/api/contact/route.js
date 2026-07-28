import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request) {
  try {
    const { name, businessName, businessType, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: "Name, email, and message are required." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const toEmail = process.env.CONTACT_EMAIL || "info@hasaanai.com";

    await resend.emails.send({
      from: "Smart SMB Hub <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `Custom Plan Request — ${businessName || name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#060911;color:#e2e8f0;padding:32px;border-radius:12px;border:1px solid #1A2540">
          <div style="font-size:11px;color:#F5A623;letter-spacing:3px;text-transform:uppercase;margin-bottom:8px">Smart SMB Hub</div>
          <h2 style="font-size:22px;font-weight:800;color:#ffffff;margin:0 0 24px">New Custom Plan Request</h2>

          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #1A2540;color:#64748B;font-size:12px;width:140px">Name</td><td style="padding:10px 0;border-bottom:1px solid #1A2540;font-size:14px;color:#fff">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #1A2540;color:#64748B;font-size:12px">Business</td><td style="padding:10px 0;border-bottom:1px solid #1A2540;font-size:14px;color:#fff">${businessName || "—"}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #1A2540;color:#64748B;font-size:12px">Industry</td><td style="padding:10px 0;border-bottom:1px solid #1A2540;font-size:14px;color:#F5A623">${businessType || "—"}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #1A2540;color:#64748B;font-size:12px">Email</td><td style="padding:10px 0;border-bottom:1px solid #1A2540;font-size:14px;color:#22D3EE">${email}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #1A2540;color:#64748B;font-size:12px">Phone</td><td style="padding:10px 0;border-bottom:1px solid #1A2540;font-size:14px;color:#fff">${phone || "—"}</td></tr>
          </table>

          <div style="margin-top:24px">
            <div style="font-size:11px;color:#64748B;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px">Message</div>
            <div style="background:#0C1220;border:1px solid #243050;border-radius:8px;padding:16px;font-size:14px;color:#94A3B8;line-height:1.6">${message.replace(/\n/g, "<br/>")}</div>
          </div>

          <div style="margin-top:24px;padding-top:16px;border-top:1px solid #1A2540;font-size:11px;color:#64748B">
            Sent from smartsmbhub.com contact form
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ message: "Failed to send message." }, { status: 500 });
  }
}
