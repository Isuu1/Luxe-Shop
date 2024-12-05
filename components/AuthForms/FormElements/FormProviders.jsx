import React from "react";

//Icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

//Authentication
import { signIn } from "next-auth/react";

const FormProviders = () => {
  return (
    <div className="auth-form__providers">
      <p>or</p>
      <button
        className="auth-form__providers__button"
        onClick={() => signIn("github")}
      >
        <span>Login with GitHub</span>
        <FaGithub className="auth-form__providers__button__icon" />
      </button>
      <button
        className="auth-form__providers__button"
        onClick={() => signIn("google")}
      >
        <span>Login with Google</span>
        <FcGoogle className="auth-form__providers__button__icon" />
      </button>
    </div>
  );
};

export default FormProviders;
