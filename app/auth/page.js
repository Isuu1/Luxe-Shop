import Image from "next/image";
import React from "react";

//Components
import LoginForm from "@/components/LoginForm/LoginForm";
import BackButton from "@/components/Buttons/BackButton/BackButton";

function SigninPage() {
  return (
    <>
      <BackButton>Login</BackButton>
      <div className="login-container" id="login-container">
        <h1 className="login-container__logo">luxe.</h1>
        <p className="login-container__headline">
          Please log in to continue
        </p>
        <LoginForm />
      </div>
    </>
  );
}

export default SigninPage;
