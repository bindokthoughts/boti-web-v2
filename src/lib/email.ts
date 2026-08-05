import nodemailer from 'nodemailer';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmails(data: ContactFormData) {
  const { name, email, subject, message } = data;

  const resendApiKey = process.env.RESEND_API_KEY;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || '"Boti Browser" <info@botibrowser.com>';
  const adminEmail = process.env.ADMIN_EMAIL || 'info@botibrowser.com';

  const adminHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; padding: 28px; border-radius: 12px; border: 1px solid #1e293b;">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #334155;">
        <h2 style="color: #38bdf8; margin: 0; font-size: 24px;">📩 New Website Inquiry</h2>
        <p style="color: #94a3b8; margin-top: 6px; font-size: 14px;">Someone submitted the contact form on Boti Browser</p>
      </div>
      
      <div style="margin-top: 24px; background-color: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #334155;">
            <td style="padding: 10px 0; font-weight: 600; width: 130px; color: #94a3b8;">👤 Sender Name:</td>
            <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">${escapeHtml(name)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #334155;">
            <td style="padding: 10px 0; font-weight: 600; color: #94a3b8;">✉️ Email Address:</td>
            <td style="padding: 10px 0; color: #ffffff;"><a href="mailto:${escapeHtml(email)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: 600; color: #94a3b8;">📌 Topic / Subject:</td>
            <td style="padding: 10px 0; color: #38bdf8; font-weight: 600;">${escapeHtml(subject)}</td>
          </tr>
        </table>
      </div>

      <div style="margin-top: 24px; padding: 20px; background-color: #1e293b; border-left: 4px solid #38bdf8; border-radius: 6px;">
        <h4 style="margin: 0 0 10px 0; color: #94a3b8; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message:</h4>
        <p style="white-space: pre-wrap; margin: 0; color: #f1f5f9; line-height: 1.6; font-size: 15px;">${escapeHtml(message)}</p>
      </div>

      <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #334155; text-align: center;">
        <p style="margin: 0; font-size: 13px; color: #94a3b8;">
          💡 <strong>Quick Reply:</strong> Simply hit <em>"Reply"</em> in your mail app to respond directly to ${escapeHtml(name)}.
        </p>
      </div>
    </div>
  `;

  const visitorHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; padding: 28px; border-radius: 12px; border: 1px solid #1e293b;">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #334155;">
        <h2 style="color: #38bdf8; margin: 0; font-size: 24px;">Thank you for getting in touch!</h2>
        <p style="color: #94a3b8; margin-top: 6px; font-size: 14px;">We're happy to connect with you</p>
      </div>

      <div style="margin-top: 24px; line-height: 1.7; color: #e2e8f0; font-size: 15px;">
        <p>Hi <strong>${escapeHtml(name)}</strong>,</p>
        <p>
          Thank you for reaching out to us at <strong>Boti Browser</strong>! We have received your inquiry regarding <span style="color: #38bdf8; font-weight: 600;">"${escapeHtml(subject)}"</span>.
        </p>
        <p>
          Our team is already reviewing your message, and we typically respond within 24 hours.
        </p>
      </div>

      <div style="margin: 24px 0; padding: 20px; background-color: #1e293b; border-radius: 8px; border: 1px solid #334155;">
        <h4 style="margin: 0 0 10px 0; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Summary of your message:</h4>
        <p style="white-space: pre-wrap; margin: 0; color: #cbd5e1; font-style: italic; line-height: 1.5;">"${escapeHtml(message)}"</p>
      </div>

      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #334155; text-align: center;">
        <p style="margin: 0 0 8px 0; color: #e2e8f0; font-size: 15px;">Warm regards,</p>
        <p style="margin: 0; font-weight: bold; color: #38bdf8; font-size: 16px;">The Boti Browser Team</p>
        <p style="margin-top: 16px; font-size: 12px; color: #64748b;">
          This is an automated receipt sent to ${escapeHtml(email)}.
        </p>
      </div>
    </div>
  `;

  // OPTION 1: Resend API Integration
  if (resendApiKey) {
    const fromAddress = process.env.RESEND_FROM || 'Boti Browser <onboarding@resend.dev>';

    const sendResendEmail = async (to: string, sub: string, html: string, replyTo?: string) => {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [to],
          subject: sub,
          html,
          ...(replyTo ? { reply_to: replyTo } : {}),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Resend Error: ${errorData.message || res.statusText}`);
      }
      return res.json();
    };

    await Promise.all([
      sendResendEmail(adminEmail, `📩 New Contact Inquiry: ${subject} - from ${name}`, adminHtml, `"${name}" <${email}>`),
      sendResendEmail(email, `✨ We've received your message! – Boti Browser`, visitorHtml),
    ]);

    return {
      success: true,
      provider: 'resend',
      message: 'Emails dispatched successfully via Resend API.',
    };
  }

  // OPTION 2: SMTP Integration (Google Workspace / Custom SMTP)
  if (smtpHost && smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await Promise.all([
      transporter.sendMail({
        from: smtpFrom,
        to: adminEmail,
        replyTo: `"${name}" <${email}>`,
        subject: `📩 New Contact Inquiry: ${subject} - from ${name}`,
        html: adminHtml,
      }),
      transporter.sendMail({
        from: smtpFrom,
        to: email,
        subject: `✨ We've received your message! – Boti Browser`,
        html: visitorHtml,
      }),
    ]);

    return {
      success: true,
      provider: 'smtp',
      message: 'Emails dispatched successfully via SMTP.',
    };
  }

  // OPTION 3: Mock Mode Fallback
  console.log('======================================================================');
  console.log('⚡ [MOCK EMAIL SERVICE] Neither RESEND_API_KEY nor SMTP_PASS configured in .env');
  console.log('======================================================================');
  console.log('📩 [MOCK EMAIL 1 - ADMIN NOTIFICATION]');
  console.log(`To: ${adminEmail}`);
  console.log(`Reply-To: ${name} <${email}>`);
  console.log(`Subject: 📩 New Inquiry from ${name} - ${subject}`);
  console.log(`\nMessage details:\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: "${message}"`);
  console.log('----------------------------------------------------------------------');
  console.log('✨ [MOCK EMAIL 2 - VISITOR AUTO-CONFIRMATION]');
  console.log(`To: ${email}`);
  console.log(`From: ${smtpFrom}`);
  console.log(`Subject: ✨ We've received your message! – Boti Browser`);
  console.log('======================================================================');

  return {
    success: true,
    mocked: true,
    message: 'Form submitted successfully! (Mock mode active - add RESEND_API_KEY or SMTP_PASS to .env to deliver live emails).',
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
