"use client";

import React, { useTransition, useState, useEffect, use } from "react";
import { useFormState } from "react-dom";

//Authentication
import { signup } from "@/lib/actions/auth";

//Styles
import "../authFormStyles.scss";

//Components
import LoginButton from "../Buttons/LoginButton/LoginButton";

//Icons
import { FaUser } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SignupForm = () => {
  const [state, formAction] = useFormState(signup, {
    message: "Initial state",
    errors: null,
  });

  const router = useRouter();

  console.log("State in SignupForm: ", state);

  // useEffect(() => {
  //   if (state.success) {
  //     toast.success("Account created successfully", {
  //       style: { marginTop: "50px" },
  //     });
  //     setTimeout(() => {
  //       router.push("/");
  //     }, 1000);
  //   }
  // }, [state.success, router]);

  return !state.success ? (
    <form className="auth-form" action={formAction}>
      <div className="auth-form__item">
        <label className="auth-form__item__hidden" htmlFor="email">
          Email
        </label>
        <FaUser className="auth-form__item__icon" />
        <input
          className="auth-form__item__input"
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          required
        />
      </div>
      {state?.errors?.email && (
        <p style={{ color: "red" }}>{state.errors.email}</p>
      )}
      <div className="auth-form__item">
        <label className="auth-form__item__hidden" htmlFor="email">
          Password
        </label>
        <FaUnlock className="auth-form__item__icon" />
        <input
          className="auth-form__item__input"
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          required
        />
      </div>
      <div className="auth-form__item">
        <label className="auth-form__item__hidden" htmlFor="email">
          Confirm password
        </label>
        <FaUnlock className="auth-form__item__icon" />
        <input
          className="auth-form__item__input"
          placeholder="Confirm password"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
        />
      </div>
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
    <div className="signup-success">
      <Image
        className="signup-success__image"
        src="/images/success.png"
        alt="checked"
        width={90}
        height={90}
      ></Image>
      <p>Your account has been created.</p>
      <p>Check your email to verify your account.</p>
      <div className="signup-success__buttons">
        <button>Resend email</button>
        <button className="signup-success__buttons--purple">
          <Link href="https://mail.google.com/mail/u/0/#inbox">
            Go to mailbox
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
