"use server";

import { signIn } from "@/auth";

export async function signin(formData) {
  console.log("Signin form data: ", formData);
  try {
    const res = await signIn("credentials", formData);
    console.log(res);
    return {
      message: "Message from action",
    };
  } catch (err) {
    console.log(err);
    return {
      message: "error",
    };
  }
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
