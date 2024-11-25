"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { IoSend } from "react-icons/io5";
import "./loginButton.scss";

const LoginButton = ({ children }) => {
  const status = useFormStatus();
  console.log(status);
  return (
    <button
      className="login-button"
      type="submit"
      aria-disabled={status.pending}
      disabled={status.pending}
    >
      {status.pending ? "Submitting" : `${children}`}

      <IoSend className="login-button__icon" />
    </button>
  );
};

export default LoginButton;
