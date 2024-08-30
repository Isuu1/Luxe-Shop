import React from "react";

//Icons
import { IoSend } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";

import { signIn, useSession } from "next-auth/react";

import { IoIosCloseCircle } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

export default function LoginPage() {
  // State variables for email and password
  // const [email, setEmail] = useState("");
  // const [error, setError] = useState("");
  // const [password, setPassword] = useState("");

  // const [formStatus, setFormStatus] = useState("Login");

  // const { loginPromptOpen, setLoginPropmptOpen } = useStateContext();

  // Event handler for email input
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Event handler for password input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(res);
      // if (res.ok) {
      //   // Set form status to Logging in
      //   setFormStatus("Logging in");
      //   // Set form status to Logged in after 5 seconds
      //   setTimeout(() => {
      //     setFormStatus("Logged in");
      //     // Close modal and refresh page after another 5 seconds
      //     setTimeout(() => {
      //       setLoginPropmptOpen(false);
      //       router.refresh();
      //     }, 3000);
      //   }, 3000);
      // }
      if (res.status == 401) {
        setError("Make sure email and password are correct");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Behavior on last form stage 'Logged in'
  // const handleCloseAfterLogin = () => {
  //   // setLoginPropmptOpen(false);
  //   router.refresh();
  // };

  return (
    <>
      <h1 className="navbar-top__left__logo">luxe.</h1>

      <button
        className="login-modal__close-btn"
        // onClick={() => setLoginPropmptOpen(false)}
      >
        <IoIosCloseCircle />
      </button>
      <h2 className="login-modal__headline">Login</h2>
      <form //onSubmit={handleSubmit}
        className="login-modal__form"
      >
        <label className="login-modal__form__item">
          <FaUser className="login-modal__form__item__icon" />
          <input
            className="login-modal__form__item__input"
            placeholder="Email"
            type="email"
            id="email"
            // value={email}
            // onChange={handleEmailChange}
          />
        </label>
        <label className="login-modal__form__item">
          <FaUnlock className="login-modal__form__item__icon" />
          <input
            className="login-modal__form__item__input"
            placeholder="Password"
            type="password"
            id="password"
            // value={password}
            // onChange={handlePasswordChange}
          />
        </label>
        <p className="bold">Forgot your password?</p>
        {/* {error && <p className="login-modal__error">{error}</p>} */}
        <button
          className="login-modal__form__submit-button"
          type="submit"
        >
          {/* <span>{formStatus}</span> */}
          <IoSend className="login-modal__form__submit-button__icon" />
        </button>
      </form>
      <div className="login-modal__providers">
        <p>or</p>
        <button
          className="login-modal__providers__github-button"
          // onClick={() => signIn("github")}
        >
          <span>Login with GitHub</span>
          <FaGithub className="login-modal__providers__github-button__icon" />
        </button>
      </div>
      <p className="login-modal__signup">
        Dont have an account? <strong>Sign in</strong>
      </p>
    </>

    // {formStatus === "Logging in" && (
    //   <div className="login-modal__logging-in">
    //     <div className="loading-page__spin"></div>
    //     <h2>Please wait</h2>
    //     <p>Logging in</p>
    //   </div>
    // )}
    // {formStatus === "Logged in" && (
    //   <div className="login-modal__logging-in">
    //     <Image
    //       className="login-modal__logging-in__avatar"
    //       src={session.data.user.userImage}
    //       fill
    //       alt=""
    //     />
    //     <p>
    //       Welcome, <strong>{session.data.user.name}</strong>
    //     </p>
    //     <p>You`re now logged in!</p>
    //     <button onClick={handleCloseAfterLogin}>
    //       <strong>Close</strong>
    //     </button>
    //   </div>
    // )}
  );
}
