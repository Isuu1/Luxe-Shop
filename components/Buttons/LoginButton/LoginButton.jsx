"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { IoSend } from "react-icons/io5";

const LoginButton = () => {
  const status = useFormStatus();
  console.log(status);
  return (
    <button
      className="login-button"
      type="submit"
      aria-disabled={status.pending}
      disabled={status.pending}
    >
      {status.pending ? "Submitting" : "Log in"}

      <IoSend className="login-button__icon" />
    </button>
  );
};

export default LoginButton;
