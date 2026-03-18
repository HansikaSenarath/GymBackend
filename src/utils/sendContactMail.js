import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactMail = async ({ name, email, message }) => {
  const gymEmail = process.env.RESEND_FROM_EMAIL; // must be a verified domain email in Resend
  const gymName = process.env.GYM_NAME || "PowerFit Gym";

  // --- Email 1: Notify gym owner ---
  const ownerResult = await resend.emails.send({
    from: `${gymName} Contact Form <${gymEmail}>`,
    to: [gymEmail],
    subject: `New Inquiry from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="color: #f97316; margin-bottom: 4px;">New Contact Form Submission</h2>
        <p style="color: #6b7280; margin-top: 0;">Someone just reached out via the website.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; width: 100px;"><strong>Name</strong></td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;"><strong>Email</strong></td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #f97316;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><strong>Message</strong></td>
            <td style="padding: 8px 0;">${message}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="color: #9ca3af; font-size: 12px;">Sent from ${gymName} website contact form.</p>
      </div>
    `,
  });

  if (ownerResult.error) {
    throw new Error(`Owner mail failed: ${ownerResult.error.message}`);
  }

  // --- Email 2: Confirmation to user ---
  const userResult = await resend.emails.send({
    from: `${gymName} <${gymEmail}>`,
    to: [email],
    subject: `We received your message, ${name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="color: #f97316;">Thanks for reaching out, ${name}!</h2>
        <p style="color: #374151;">We've received your message and will get back to you within <strong>24–48 hours</strong>.</p>
        <div style="background: #fff7ed; border-left: 4px solid #f97316; padding: 16px; border-radius: 4px; margin: 20px 0;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;"><strong>Your message:</strong></p>
          <p style="margin: 8px 0 0; color: #374151;">${message}</p>
        </div>
        <p style="color: #374151;">In the meantime, feel free to reach us at:</p>
        <ul style="color: #374151; padding-left: 20px;">
          <li>📧 <a href="mailto:${gymEmail}" style="color: #f97316;">${gymEmail}</a></li>
          <li>📍 123 Fitness Street, Health City, HC 12345</li>
        </ul>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} ${gymName}. All rights reserved.</p>
      </div>
    `,
  });

  if (userResult.error) {
    throw new Error(`User mail failed: ${userResult.error.message}`);
  }
};
