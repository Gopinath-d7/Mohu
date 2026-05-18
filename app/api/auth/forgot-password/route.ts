import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import nodemailer from "nodemailer";

// 🛠️ UPDATE YOUR CUSTOM SMTP TRANSPORTER IN YOUR ROUTE FILE
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // ⚡ ADD THIS OBJECT: Bypasses the untrusted certificate chain restriction
  tls: {
    rejectUnauthorized: false
  }
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Security practice: Don't leak whether an email exists or not
    if (!user) {
      return NextResponse.json({ message: "Reset link handled." });
    }

    // Generate token and 1-hour expiration window
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); 

    // Save token to Neon DB
    await prisma.passwordResetToken.create({
      data: {
        token,
        expires,
        userId: user.id,
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${token}`;

    // 🚀 SEND EMAIL USING YOUR CUSTOM SMTP NODE
    await transporter.sendMail({
      from: `"MOHU Store" <${process.env.SMTP_USER}>`, // Sent directly from your account
      to: email, // This can now be ANY valid email address! No restrictions!
      subject: "Reset Your MOHU Account Password",
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 12px;">
          <h2 style="font-size: 24px; font-weight: 900; tracking-tight: -0.05em; color: #0a0a0a; margin-bottom: 6px;">MOHU</h2>
          <p style="font-size: 14px; color: #666; margin-bottom: 24px;">Password Recovery Request</p>
          
          <p style="font-size: 14px; color: #1a1a1a; line-height: 1.5;">Hello ${user.name || "there"},</p>
          <p style="font-size: 14px; color: #1a1a1a; line-height: 1.5;">We received a request to reset your password. Click the button below to choose a new secure password. This link expires in 1 hour.</p>
          
          <div style="margin: 32px 0;">
            <a href="${resetUrl}" style="background-color: #0a0a0a; color: #ffffff; padding: 12px 24px; font-size: 14px; font-weight: 500; text-decoration: none; border-radius: 8px; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p style="font-size: 12px; color: #999; line-height: 1.5; margin-top: 32px; border-top: 1px solid #f0f0f0; padding-top: 16px;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Reset link handled successfully." });
  } catch (err: any) {
    console.error("CUSTOM_MAILER_CRASH:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process custom email delivery pipeline." }, 
      { status: 500 }
    );
  }
}