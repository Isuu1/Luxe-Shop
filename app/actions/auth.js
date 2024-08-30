"use server";

import { SigninFormSchema } from "@/lib/definitions/definitions";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

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

  await signIn("credentials", formData);

  redirect("/");
  // return {
  //   errors: null,
  //   success: true,
  //   message: "Succesfully logged in",
  //   redirect: true,
  // };
}

export async function signup(formData) {
  try {
    const userImage = "/images/user-avatar.jpg";
    console.log(formData);

    const user = await prisma.user.create({
      data: {
        email: formData.get("email"),
        password: formData.get("password"),
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
