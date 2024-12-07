"use client";
import React, { use, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import toast from "react-hot-toast";

//Styles
import "../authFormStyles.scss";

//Components
import LoginButton from "@/components/AuthForms/Buttons/LoginButton/LoginButton";
import FormItem from "@/components/AuthForms/FormElements/FormItem";
import FormProviders from "@/components/AuthForms/FormElements/FormProviders";

//Authentication
import { signin } from "@/lib/actions/auth";

//Context
import { useAuthFormContext } from "@/context/AuthFormContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [state, formAction] = useFormState(signin, {
    message: "Initial state",
    errors: null,
  });

  const { formErrors, setFormErrors } = useAuthFormContext();

  const router = useRouter();

  //Handling form status
  useEffect(() => {
    const handleFormState = async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      if (state.errors !== null) {
        await delay(1000);
        setFormErrors((prev) => ({ ...prev, login: state.errors }));
      }
    };
    handleFormState();
    return () => {
      setFormErrors({ login: null, signup: null }); // Runs when component unmounts
    };
  }, [setFormErrors, state.errors]);

  useEffect(() => {
    if (state.success) {
      toast.success("Login successful", { style: { marginTop: "50px" } });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [state.success, router]);

  console.log("Form state: ", state);

  return (
    <>
      <form className="auth-form" action={formAction}>
        <>
          <FormItem
            placeholder="Email"
            name="email"
            type="email"
            label="Email"
            id="email"
            required={true}
          />
          {formErrors?.login?.email && (
            <p style={{ color: "red" }}>{formErrors.login.email}</p>
          )}
          <FormItem
            placeholder="Password"
            name="password"
            type="password"
            label="Password"
            id="password"
            required={true}
          />
          {formErrors?.login?.password && (
            <p style={{ color: "red" }}>{formErrors.login.password}</p>
          )}
          <p className="auth-form__forgot-password bold">
            Forgot your password?
          </p>
        </>

        <LoginButton state={state}>Sign in</LoginButton>
      </form>
      <FormProviders />
      <p className="auth-form__signup-msg">
        Dont have an account?{" "}
        <strong>
          <Link href="/auth/signup">Sign up</Link>
        </strong>
      </p>
    </>
  );
}
