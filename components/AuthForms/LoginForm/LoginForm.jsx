"use client";
import React from "react";
import { useFormState } from "react-dom";
import Link from "next/link";

//Styles
import "../authFormStyles.scss";

//Utils
import { signin } from "@/lib/actions/auth";

//Components
import LoginButton from "@/components/AuthForms/Buttons/LoginButton/LoginButton";

//Icons
import { FaGithub } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";

export default function LoginForm() {
  const [state, formAction] = useFormState(signin, {
    errors: null,
  });

  return (
    <>
      <form className="auth-form" action={formAction}>
        <label className="auth-form__item">
          <FaUser className="auth-form__item__icon" />
          <input
            className="auth-form__item__input"
            placeholder="Email"
            name="email"
            id="email"
            required
          />
        </label>
        {state?.errors?.email && (
          <p style={{ color: "red" }}>{state.errors.email}</p>
        )}
        <label className="auth-form__item">
          <FaUnlock className="auth-form__item__icon" />
          <input
            className="auth-form__item__input"
            placeholder="Password"
            name="password"
            id="password"
            type="password"
            required
          />
        </label>
        {state?.errors?.password && (
          <p style={{ color: "red" }}>{state.errors.password}</p>
        )}
        <p className="auth-form__forgot-password bold">Forgot your password?</p>
        <LoginButton>Sign in</LoginButton>
      </form>
      <div className="auth-form__providers">
        <p>or</p>
        <button
          className="auth-form__providers__github-button"
          // onClick={() => signIn("github")}
        >
          <span>Login with GitHub</span>
          <FaGithub className="auth-form__providers__github-button__icon" />
        </button>
      </div>
      <p className="auth-form__signup">
        Dont have an account?{" "}
        <strong>
          <Link href="/auth/signup">Sign up</Link>
        </strong>
      </p>
    </>
  );
}
