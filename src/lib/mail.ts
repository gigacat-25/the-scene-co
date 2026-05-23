export async function getMailEnv() {
  let env: any = process.env;
  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    const ctx = getRequestContext();
    if (ctx && ctx.env) {
      env = { ...process.env, ...ctx.env };
    }
  } catch {}
  return {
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    refreshToken: env.GOOGLE_REFRESH_TOKEN,
    adminEmail: env.ADMIN_EMAIL || "thescene.co26@gmail.com",
  };
}

export async function sendGmail({
  to,
  subject,
  htmlBody,
}: {
  to: string;
  subject: string;
  htmlBody: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const config = await getMailEnv();
    if (!config.clientId || !config.clientSecret || !config.refreshToken) {
      return { success: false, error: "Missing Google OAuth credentials in environment" };
    }

    // 1. Refresh access token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        refresh_token: config.refreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      return { success: false, error: `Failed to refresh OAuth token: ${errText}` };
    }

    const tokenData = await tokenRes.json() as { access_token: string };
    const accessToken = tokenData.access_token;

    // Helper for safe UTF-8 to binary string conversion for btoa
    const toBinaryString = (str: string) =>
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      );

    // 2. Build RFC 2822 raw message
    const utf8Subject = `=?utf-8?B?${btoa(toBinaryString(subject))}?=`;
    const base64Body = btoa(toBinaryString(htmlBody));

    const emailLines = [
      `To: ${to}`,
      `Subject: ${utf8Subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=utf-8`,
      `Content-Transfer-Encoding: base64`,
      ``,
      base64Body,
    ];

    const rawEmail = emailLines.join("\r\n");
    const base64Safe = btoa(toBinaryString(rawEmail))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // 3. Send email via Gmail API
    const sendRes = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: base64Safe }),
    });

    if (!sendRes.ok) {
      const errText = await sendRes.text();
      return { success: false, error: `Failed to send email via Gmail API: ${errText}` };
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || String(error) };
  }
}
