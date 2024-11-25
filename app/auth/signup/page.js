//Components
import SignupForm from "@/components/AuthForms/SignupForm/SignupForm";
import BackButton from "@/components/Buttons/BackButton/BackButton";

//Styles
import "../authStyles.scss";

export default function signUp() {
  return (
    <>
      <BackButton>Register</BackButton>
      <div className="auth-form-container" id="login-container">
        <h1 className="auth-form-container__logo">luxe.</h1>
        <p className="auth-form-container__headline">
          Please register to continue
        </p>
        <SignupForm />
      </div>
    </>
  );
}
