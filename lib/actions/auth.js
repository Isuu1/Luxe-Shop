"use server";

import { signIn } from "@/auth";
const bcrypt = require("bcrypt");
import {
  SigninFormSchema,
  SignupFormSchema,
} from "@/lib/definitions/definitions";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  console.log("User", user);

  if (!user) {
    return {
      success: false,
      errors: {
        email: "User email not found in database",
      },
    };
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

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
  const email = formData.get("email");

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
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

  //Hash password
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  //Default user image
  const userImage = "/images/user-avatar.jpg";

  try {
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

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
    return {
      success: true,
      user: user,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "error",
    };
  }
}
