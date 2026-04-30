import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve("auth-service/.env"),
});


export const sendVerificationEmail = async (email, token,fullName) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

await transporter
  .verify()
  .then(() => console.log("SMTP READY ✅"))
  .catch((err) => console.log("SMTP ERROR ❌", err));

  const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

await transporter.sendMail({
  to: email,
  subject: "Welcome! Verify your email 🚀",
  html: `
  <div style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">

    <div style="max-width:520px; margin:30px auto; background:#ffffff; border-radius:12px; padding:30px; box-shadow:0 8px 20px rgba(0,0,0,0.06);">

      <!-- 🔷 Logo -->
      <div style="text-align:center; margin-bottom:20px;">
        <img src="https://broomcab.com/logo.png" alt="Logo" width="120" />
      </div>

      <!-- 👋 Greeting -->
      <h2 style="color:#111; text-align:center; margin-bottom:10px;">
        Hi ${fullName || "there"} 👋
      </h2>

      <!-- 📌 Heading -->
      <h3 style="color:#333; text-align:center; margin-bottom:20px;">
        Welcome to BroomCab 🚀
      </h3>

      <!-- 📄 Message -->
      <p style="color:#555; font-size:14px; text-align:center; line-height:1.6;">
        Thanks for signing up! Please verify your email address to activate your account and get started.
      </p>

      <!-- 🔘 CTA Button -->
      <div style="text-align:center; margin:30px 0;">
        <a href="${verifyLink}"
           style="background:linear-gradient(135deg,#2563eb,#1d4ed8); color:#fff; padding:14px 24px; border-radius:8px; text-decoration:none; font-weight:600; display:inline-block;">
          Verify Email
        </a>
      </div>

      <!-- ⏳ Expiry -->
      <p style="color:#777; font-size:12px; text-align:center;">
        ⏳ This link will expire in 1 hour.
      </p>

      <!-- Divider -->
      <hr style="margin:25px 0; border:none; border-top:1px solid #eee;" />

      <!-- 🔗 Fallback -->
      <p style="font-size:12px; color:#999; text-align:center;">
        If the button doesn’t work, copy and paste this link into your browser:
      </p>

      <p style="word-break:break-all; font-size:12px; color:#2563eb; text-align:center;">
        ${verifyLink}
      </p>

      <!-- ⚠️ Safety -->
      <p style="font-size:11px; color:#aaa; text-align:center; margin-top:20px;">
        If you didn’t create this account, you can safely ignore this email.
      </p>

    </div>

    <!-- Footer -->
    <p style="text-align:center; font-size:11px; color:#aaa;">
      © ${new Date().getFullYear()} BroomCab. All rights reserved.
    </p>

  </div>
  `,
});
};
