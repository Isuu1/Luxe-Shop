"use server";
import { auth } from "@/auth";
import z from "zod";

export async function updateUser(prev, formData) {
  //Get user session
  const session = await auth();

  // Define the schema
  const schema = z.object({
    name: z
      .string("Name must be at least 3 letters long")
      .min(3, "Name must be at least 3 characters long")
      .max(20)
      .regex(/^[a-zA-Z0-9]+$/, "Only letters and numbers are allowed")
      .regex(/.*\d.*/, "Name must contain at least one number"),
    email: z.string().email(),
    confirmEmail: z.string().email(),
    password: z.string(),
  });
  try {
    // Fetch the original user data
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    console.log("User found:", user);
    console.log("Form data: ", formData);

    // Get the form data
    const name = formData.get("name") || user.name;
    const email = formData.get("email") || user.email;
    const confirmEmail = formData.get("confirmEmail") || user.email;
    const password = formData.get("password") || user.password;

    if (email !== confirmEmail) {
      return {
        success: false,
        errors: {
          confirmEmail: "Emails do not match",
        },
      };
    }

    // Validate the form data
    const validateData = schema.safeParse({
      name,
      email,
      confirmEmail,
      password,
    });

    console.log("Validation data: ", validateData);

    // If any form fields are empty, return early
    if (!validateData.success) {
      console.log("Validation data: ", validateData.error);
      return {
        success: false,
        errors: validateData.error.flatten().fieldErrors,
        resetKey: Date.now().toString(),
      };
    }

    // Update the user data
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name: validateData.data.name,
        email: validateData.data.email,
        password: validateData.data.password,
      },
    });

    console.log("updated user", updatedUser);

    return {
      message: "Profile updated successfully",
      success: true,
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
