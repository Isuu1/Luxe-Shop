"use server";
import { auth } from "@/auth";
const bcrypt = require("bcrypt");
import { prisma } from "@/lib/prisma";
import { UpdateUserDetailsSchema } from "../definitions/definitions";

export async function updateUser(prev, formData) {
  //Get user session
  const session = await auth();

  try {
    // Fetch the original user data
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    // If the user cancels the update, return early to get rid of errors
    if (formData.cancelled) {
      return {
        success: false,
        errors: "",
        message: "User update cancelled",
      };
    }

    // Get the form data
    const name = formData.get("name") || user.name;
    const email = formData.get("email") || user.email;
    const confirmEmail = formData.get("confirmEmail") || user.email;
    const password = formData.get("password") || user.password;
    const confirmPassword = formData.get("confirmPassword") || user.password;

    if (email !== confirmEmail) {
      return {
        success: false,
        errors: {
          emailsMatching: "Emails do not match",
        },
      };
    }

    if (password !== confirmPassword) {
      return {
        success: false,
        errors: {
          passwordsMatching: "Passwords do not match",
        },
      };
    }

    // Validate the form data
    const validateData = UpdateUserDetailsSchema.safeParse({
      name,
      email,
      confirmEmail,
      password,
      confirmPassword,
    });

    console.log("Validation data: ", validateData);

    // If any form fields are empty, return early
    if (!validateData.success) {
      console.log("Validation data: ", validateData.error);
      return {
        success: false,
        errors: validateData.error.flatten().fieldErrors,
        key: Date.now().toString(),
      };
    }

    //Hash password
    const hashedPassword = bcrypt.hashSync(
      validateData.data.password,
      bcrypt.genSaltSync(10)
    );

    // Update the user data
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name: validateData.data.name,
        email: validateData.data.email,
        // password: validateData.data.password,
      },
    });

    console.log("updated user", updatedUser);

    return {
      message: "Profile updated successfully",
      success: true,
      key: Date.now().toString(),
      data: updatedUser,
      errors: "",
    };
  } catch (error) {
    return {
      success: false,
      errors: "Error updating user: " + error,
    };
  }
}
