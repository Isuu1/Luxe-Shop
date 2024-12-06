"use client";

import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import toast from "react-hot-toast";

//Authentication
import { signup } from "@/lib/actions/auth";

//Styles
import "../authFormStyles.scss";

//Components
import LoginButton from "../Buttons/LoginButton/LoginButton";
import FormItem from "@/components/AuthForms/FormElements/FormItem";
import FormSuccess from "@/components/AuthForms/FormElements/FormSuccess";

//Context
import { useAuthFormContext } from "@/context/AuthFormContext";

const SignupForm = () => {
  const [state, formAction] = useFormState(signup, {
    message: "Initial state",
    errors: null,
  });

  const { formPending, setFormPending } = useAuthFormContext();

  // useEffect(() => {
  //   if (state.success) {
  //     toast.success("Account created successfully", {
  //       style: { marginTop: "50px" },
  //     });
  //   }
  // }, [state.success]);

  return !state.success ? (
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
      <FormItem
        placeholder="Confirm password"
        name="confirmPassword"
        type="password"
        label="Confirm password"
        id="confirmPassword"
        required={true}
      />
      {state?.errors?.confirmPassword && (
        <p style={{ color: "red" }}>{state.errors.confirmPassword}</p>
      )}
      {state?.errors?.password && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {state.errors.password.map((item) => (
            <p key={item.length} style={{ color: "red" }}>
              {item}
            </p>
          ))}
        </div>
      )}

      <LoginButton state={state}>Register</LoginButton>
      {!state.errors && (
        <p className="auth-form__signin-msg">
          Have an account?{" "}
          <Link href="/auth/signin">
            <strong> Sign in</strong>
          </Link>
        </p>
      )}
      {state?.errors?.email === "Email already exists in database" && (
        <p className="auth-form__signin-msg">
          Looks like you already have an account.{" "}
          <Link href="/auth/signin">
            <strong>Sign in</strong>
          </Link>
        </p>
      )}
    </form>
  ) : (
    <FormSuccess state={state} />
  );
};

export default SignupForm;
