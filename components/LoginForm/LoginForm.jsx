"use client";
import React from "react";
import { useFormState } from "react-dom";
import Link from "next/link";

//Utils
import { signin } from "@/app/actions/auth";

//Components
import LoginButton from "@/components/Buttons/LoginButton/LoginButton";

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
      <form className="login-form" action={formAction}>
        <label className="login-form__item">
          <FaUser className="login-form__item__icon" />
          <input
            className="login-form__item__input"
            placeholder="Email"
            name="email"
            id="email"
          />
        </label>
        {state?.errors?.email && (
          <p style={{ color: "red" }}>{state.errors.email}</p>
        )}
        <label className="login-form__item">
          <FaUnlock className="login-form__item__icon" />
          <input
            className="login-form__item__input"
            placeholder="Password"
            name="password"
            id="password"
            type="password"
          />
        </label>
        {state?.errors?.password && (
          <p style={{ color: "red" }}>{state.errors.password}</p>
        )}
        <p className="login-form__forgot-password bold">
          Forgot your password?
        </p>
        <LoginButton />
      </form>
      <div className="login-form__providers">
        <p>or</p>
        <button
          className="login-form__providers__github-button"
          // onClick={() => signIn("github")}
        >
          <span>Login with GitHub</span>
          <FaGithub className="login-form__providers__github-button__icon" />
        </button>
      </div>
      <p className="login-form__signup">
        Dont have an account?{" "}
        <strong>
          <Link href="/auth/signup">Sign up</Link>
        </strong>
      </p>
    </>
  );
}
