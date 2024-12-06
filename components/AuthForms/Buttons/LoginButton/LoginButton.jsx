"use client";
import React, { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { IoSend } from "react-icons/io5";
import "../../authFormStyles.scss";
import toast from "react-hot-toast";
import { useAuthFormContext } from "@/context/AuthFormContext";

const LoginButton = ({ children, state }) => {
  const status = useFormStatus();

  const { formPending, setFormPending, formErrors, setFormErrors } =
    useAuthFormContext();

  useEffect(() => {
    const handleFormState = async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      if (status.pending) {
        setFormPending(true);
      } else {
        await delay(1000);
        setFormPending(false);
      }
    };
    handleFormState();
  }, [status.pending, setFormPending]);

  return (
    <button
      className="login-button"
      type="submit"
      aria-disabled={formPending}
      disabled={formPending}
    >
      {formPending ? "Submitting" : `${children}`}

      {formPending ? (
        <div className="loading-button-icon"></div>
      ) : (
        <IoSend className="login-button__icon" />
      )}
    </button>
  );
};

export default LoginButton;
