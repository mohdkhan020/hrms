import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve("auth-service/.env"),
});


export const sendVerificationEmail = async (email, token) => {
  console.log("process==",process.env.EMAIL_USER)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // app password
    },
  });

  const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Verify your email",
    html: `<p>Click below to verify:</p>
           <a href="${verifyLink}">Verify Email</a>`,
  });
};
