import nodemailer from "nodemailer";
import { prisma } from "../prisma";

//Create transporter for email
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    //Make sure port is an integer
    port: parseInt(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });
};

//Send verification email
export const sendVerificationEmail = async (email, token) => {
  const transporter = createTransporter();
  const verificationLink = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${token}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      text: `Click on the link below to verify your email:\n${verificationLink}`,
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

//Find user with the same token in database
export const verifyEmailToken = async (token) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
      },
    });

    if (!user) {
      return false;
    }

    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        emailVerified: true,
        verificationToken: null,
      },
    });

    return true;
  } catch (error) {
    console.error("Error verifying email token:", error);
  }
};
