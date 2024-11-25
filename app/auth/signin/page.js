import React from "react";

//Components
import LoginForm from "@/components/AuthForms/LoginForm/LoginForm";
import BackButton from "@/components/Buttons/BackButton/BackButton";

//Styles
import "../authStyles.scss";

function SigninPage() {
  return (
    <>
      <BackButton>Login</BackButton>
      <div className="auth-form-container" id="login-container">
        <h1 className="auth-form-container__logo">luxe.</h1>
        <p className="auth-form-container__headline">
          Please log in to continue
        </p>
        <LoginForm />
      </div>
    </>
  );
}

export default SigninPage;
