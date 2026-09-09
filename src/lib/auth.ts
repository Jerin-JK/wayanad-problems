import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

/**
 * Custom magic-link sender using the Resend HTTP API.
 *
 * Why HTTP API instead of SMTP?
 * - Resend SMTP with onboarding@resend.dev can ONLY send to the account
 *   owner's email address (a Resend sandbox restriction).
 * - The HTTP API works for any recipient once you have a valid API key,
 *   and gives clear JSON error messages instead of SMTP handshake errors.
 */
async function sendVerificationRequest({
  identifier: email,
  url,
  provider,
}: {
  identifier: string;
  url: string;
  provider: { from: string };
}) {
  const apiKey = process.env.EMAIL_SERVER_PASSWORD || "";

  if (!apiKey) {
    throw new Error("EMAIL_SERVER_PASSWORD (Resend API key) is not set.");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: provider.from,
      to: [email],
      subject: "Sign in to Wayanad Problems",
      html: `
        <div style="font-family:Arial,sans-serif;background:#09090b;padding:40px;max-width:480px;margin:auto;border-radius:16px;border:1px solid #27272a">
          <h1 style="color:#34d399;font-size:22px;margin:0 0 4px;letter-spacing:-0.5px">Wayanad Problems</h1>
          <p style="color:#71717a;font-size:13px;margin:0 0 28px">Community platform for reporting public issues in Wayanad.</p>
          <p style="color:#e4e4e7;font-size:15px;margin:0 0 8px;font-weight:600">Your magic sign-in link</p>
          <p style="color:#a1a1aa;font-size:14px;margin:0 0 24px">Click the button below to sign in instantly — no password needed. This link expires in 24 hours.</p>
          <a href="${url}"
             style="display:inline-block;background:linear-gradient(135deg,#059669,#0891b2);color:#fff;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:10px;font-size:14px;letter-spacing:0.08em;text-transform:uppercase">
            Sign In →
          </a>
          <p style="color:#3f3f46;font-size:11px;margin:28px 0 0;line-height:1.6">
            If you didn't request this email, you can safely ignore it.<br/>
            This link was requested from the Wayanad Problems platform.
          </p>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    console.error("Resend API error:", res.status, body);
    throw new Error(
      `Failed to send email via Resend: ${res.status} — ${JSON.stringify(body)}`
    );
  }
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    EmailProvider({
      from:
        process.env.EMAIL_FROM ||
        "Wayanad Problems <onboarding@resend.dev>",
      // Override the default SMTP send with our Resend HTTP API call
      sendVerificationRequest,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, user }: any) {
      if (session?.user) {
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.image = user.image;
      }
      return session;
    },
  },
};
