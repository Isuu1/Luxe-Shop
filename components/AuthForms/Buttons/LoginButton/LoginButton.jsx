"use client";
import React, { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { IoSend } from "react-icons/io5";
import "../../authFormStyles.scss";
import toast from "react-hot-toast";

const LoginButton = ({ children, formPending, setFormPending, state }) => {
  const status = useFormStatus();

  //Set form pending state
  useEffect(() => {
    if (status.pending) {
      setFormPending(true);
      const loadingToaster = toast.loading("Please wait. Logging in...", {
        style: { marginTop: "50px" },
      });
      setTimeout(() => {
        toast.dismiss(loadingToaster);
        setFormPending(false);
      }, 5000);
      if (state.success) {
        toast.success("Logged in successfully. Redirecting...", {
          style: { marginTop: "50px" },
        });
      }
    }
  }, [status.pending, setFormPending, state.success]);

  return (
    <button
      className="login-button"
      type="submit"
      aria-disabled={formPending}
      disabled={formPending}
    >
      {formPending ? "Submitting" : `${children}`}

      <IoSend className="login-button__icon" />
    </button>
  );
};

export default LoginButton;
