"use client";

import React from "react";
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

const SignupForm = () => {
  const [state, formAction] = useFormState(signup, {
    errors: null,
  });

  console.log("State", state);

  return (
    <form className="auth-form" action={formAction}>
      <label className="auth-form__item">
        <FaUser className="auth-form__item__icon" />
        <input
          className="auth-form__item__input"
          placeholder="Email"
          type="email"
          name="email"
          id="email"
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
          type="password"
          name="password"
          id="password"
        />
      </label>
      {state?.errors?.password && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {state.errors.password.map((item) => (
            <p key={item.length} style={{ color: "red" }}>
              {item}
            </p>
          ))}
        </div>
      )}
      <LoginButton>Register</LoginButton>
    </form>
  );
};

export default SignupForm;
