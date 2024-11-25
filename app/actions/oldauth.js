"use server";

import { SigninFormSchema } from "@/lib/definitions/definitions";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const bcrypt = require("bcrypt");

// Prev state checks latest input value before sending form
export async function signin(prevState, formData) {
  // Validate form fields
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are empty, return early
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: formData.get("email"),
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

  const isPasswordValid = formData.get("password") === user.password;

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
    email: formData.get("email"),
    password: formData.get("password"),
    redirect: true,
    redirectTo: "/",
  });
}

export async function signup(prevState, formData) {
  const password = formData.get("password");
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  console.log("Testing");
  console.log(
    "This is how password looks like before sending it to db: ",
    hashedPassword
  );

  try {
    // const user = await prisma.user.create({
    //   data: {
    //     email: formData.get("email"),
    //     hashedPassword,
    //   },
    // });

    const user = await prisma.user.upsert({
      where: { email: formData.get("email") },
      update: {},
      create: {
        email: formData.get("email"),
        name: "Test User",
        password: hashedPassword,
        userImage,
      },
    });
    console.log({ user });
  } catch (err) {
    console.log(err);
    return {
      message: "error",
    };
  }
}
