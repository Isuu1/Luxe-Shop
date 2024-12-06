"use client";

import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";

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

  const { formPending, setFormPending, formErrors, setFormErrors } =
    useAuthFormContext();

  useEffect(() => {
    const handleFormState = async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      if (state.errors !== null) {
        await delay(1000);
        setFormErrors((prev) => ({ ...prev, signup: state.errors }));
      }
    };
    handleFormState();
    return () => {
      setFormErrors({ login: null, signup: null }); // Runs when component unmounts
    };
  }, [setFormErrors, state.errors]);

  console.log("Form errors: ", formErrors);

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
      {formErrors?.signup?.email && (
        <p style={{ color: "red" }}>{formErrors.signup.email}</p>
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
      {formErrors?.signup?.confirmPassword && (
        <p style={{ color: "red" }}>{formErrors.signup.confirmPassword}</p>
      )}
      {formErrors?.signup?.password && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {formErrors.signup.password.map((item) => (
            <p key={item.length} style={{ color: "red" }}>
              {item}
            </p>
          ))}
        </div>
      )}

      <LoginButton state={state}>Register</LoginButton>

      {formErrors?.signup?.email === "Email already exists in database" ? (
        <p className="auth-form__signin-msg">
          Looks like you already have an account.{" "}
          <Link href="/auth/signin">
            <strong>Sign in</strong>
          </Link>
        </p>
      ) : (
        <p className="auth-form__signin-msg">
          Have an account?{" "}
          <Link href="/auth/signin">
            <strong> Sign in</strong>
          </Link>
        </p>
      )}
    </form>
  ) : (
    <FormSuccess state={state} />
  );
};

export default SignupForm;
