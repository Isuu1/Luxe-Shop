"use server";

import { signIn } from "@/auth";
import bcrypt from "bcrypt"; // Use ES6 import
import {
  SigninFormSchema,
  SignupFormSchema,
} from "@/lib/definitions/definitions";
import { prisma } from "@/lib/prisma";

import crypto from "crypto";

import { sendVerificationEmail } from "../verification/email";

// Prev state checks latest input value before sending form
export async function signin(prevState, formData) {
  const password = formData.get("password");
  const email = formData.get("email");

  // Validate form fields
  const validatedFields = SigninFormSchema.safeParse({
    email: email,
    password: password,
  });

  // Validation failed
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Check if user exists in database
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return {
      success: false,
      errors: {
        email: "User email not found in database",
      },
    };
  }

  //Compare password with hashed password in database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log(password, user.password);
  console.log(isPasswordValid);

  if (!isPasswordValid) {
    return {
      success: false,
      errors: {
        password: "Password incorrect",
      },
    };
  }

  // Sign user in using provided credentials and redirect to home page after
  await signIn("credentials", {
    email: email,
    password: password,
    redirect: true,
    redirectTo: "/",
  });
}

export async function signup(prevState, formData) {
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const email = formData.get("email");

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  });

  // Validation failed
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Check if password and confirm password match
  if (password !== confirmPassword) {
    return {
      success: false,
      errors: {
        confirmPassword: "Passwords do not match",
      },
    };
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

  try {
    //Check if email already exists in database
    const checkDbForEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (checkDbForEmail !== null) {
      return {
        success: false,
        errors: {
          email: "Email already exists in database",
        },
      };
    }

    //Generate verification token
    const verificationToken = crypto.randomBytes(64).toString("hex");

    //Create user in database
    const user = await prisma.user.create({
      data: {
        name: "User",
        email: email,
        password: hashedPassword,
        verificationToken,
        emailVerified: false,
      },
    });

    //Send verification email
    await sendVerificationEmail(email, verificationToken);

    return {
      success: true,
      user: user,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      errors: {
        email: "Server temporary unavailable. Please try again later.",
      },
    };
  }
}
