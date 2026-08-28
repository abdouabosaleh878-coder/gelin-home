interface SendEmailInput {
  to: string;
  subject: string;
  text: string;
}

interface SendEmailResult {
  delivered: boolean;
  mode: "resend" | "console";
}

/**
 * Minimal pluggable email sender. Without RESEND_API_KEY configured, emails
 * are logged to the server console instead of failing — callers (e.g. the
 * password reset flow) surface a dev-mode link in the UI in that case.
 */
export async function sendEmail({ to, subject, text }: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(`[mailer] No email provider configured. Would send to ${to}:\nSubject: ${subject}\n${text}`);
    return { delivered: false, mode: "console" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "AI Shorts Studio <onboarding@resend.dev>",
      to,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Failed to send email via Resend (${response.status}): ${body}`);
  }

  return { delivered: true, mode: "resend" };
}
