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

export default function LoginForm() {
  const [state, formAction] = useFormState(signin, {
    errors: null,
  });

  const { formPending, setFormPending, formErrors, setFormErrors } =
    useAuthFormContext();

  useEffect(() => {
    if (state.errors) {
      setFormErrors(state.errors);
    }
  }, [state.errors, setFormErrors]);

  console.log("Form errors:", formErrors);

  // console.log("State:", state);

  // const [formPending, setFormPending] = useState(false);

  // const [errors, setErrors] = useState(null);

  // useEffect(() => {
  //   if (state.errors) {
  //     setTimeout(() => {
  //       setErrors(state.errors);
  //     }, 5000);
  //   }
  // }, [state.errors]);

  // console.log("Errors:", errors);

  // useEffect(() => {
  //   //Set delay between toasters to make it look like a loading process
  //   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  //   const handleFormState = async () => {
  //     if (formPending) {
  //       const loadingToast = toast.loading("Please wait. Logging in...", {
  //         style: { marginTop: "50px" },
  //       });
  //       await delay(1000);
  //       toast.dismiss(loadingToast);
  //     }
  //     if (state.success) {
  //       toast.success("Logged in successfully. Redirecting...", {
  //         style: { marginTop: "50px" },
  //       });
  //       await delay(2000);
  //     }
  //   };
  //   handleFormState();
  // }, [formPending, state.success]);

  console.log("Form pending:", formPending);

  return (
    <>
      <form className="auth-form" action={formAction}>
        <FormItem
          placeholder="Email"
          name="email"
          type="email"
          label="Email"
          id="email"
          required={true}
        />
        {state?.errors?.email && (
          <p style={{ color: "red" }}>{state.errors.email}</p>
        )}
        <FormItem
          placeholder="Password"
          name="password"
          type="password"
          label="Password"
          id="password"
          required={true}
        />
        {state?.errors?.password && (
          <p style={{ color: "red" }}>{state.errors.password}</p>
        )}
        <p className="auth-form__forgot-password bold">Forgot your password?</p>
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
