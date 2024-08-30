"use client";
import React, { useEffect, useRef, useState } from "react";

//Animations
import { motion } from "framer-motion";
import {
  loginModalAnimation,
  loginModalBackgroundAnimation,
} from "@/styles/animations";

//Icons
import { IoSend } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { useStateContext } from "@/context/StateContext";
import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { IoIosCloseCircle } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

const LoginModal = () => {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const [formStatus, setFormStatus] = useState("Login");

  const { loginPromptOpen, setLoginPropmptOpen } = useStateContext();

  const loginModalRef = useRef(null);

  const router = useRouter();

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
      if (res.ok) {
        // Set form status to Logging in
        setFormStatus("Logging in");
        // Set form status to Logged in after 5 seconds
        setTimeout(() => {
          setFormStatus("Logged in");
          // Close modal and refresh page after another 5 seconds
          setTimeout(() => {
            setLoginPropmptOpen(false);
            router.refresh();
          }, 3000);
        }, 3000);
      }
      if (res.status == 401) {
        setError("Make sure email and password are correct");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Stop scrolling page when login modal is open
  useEffect(() => {
    if (loginPromptOpen) {
      document.body.classList.add("login-modal-open");
      //Avoid layout shifting when applying overflow: hidden and scrollbar dissapears
      document.body.style.paddingRight = "15px";
    } else {
      document.body.classList.remove("login-modal-open");
      //Bring body padding back to 0
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.classList.remove("login-modal-open");
      document.body.style.paddingRight = "";
    };
  }, [loginPromptOpen]);

  //Behavior on last form stage 'Logged in'
  const handleCloseAfterLogin = () => {
    setLoginPropmptOpen(false);
    router.refresh();
  };

  //Close login modal when user clicks outside of it
  useEffect(() => {
    //Disable modal closing when user is logging in
    if (formStatus === "Logging in" || formStatus === "Logged in") {
      return;
    }
    const handleClickOutside = (e) => {
      if (
        loginModalRef.current &&
        !loginModalRef.current.contains(e.target) &&
        //This checks if the click event target is the button (or any child of it). If so, the modal won't close.
        !e.target.closest(".open-modal")
      ) {
        setLoginPropmptOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [loginModalRef, setLoginPropmptOpen, formStatus]);

  console.log(formStatus);

  const session = useSession();
  console.log(session);

  return (
    <motion.div
      className="login-modal-background"
      variants={loginModalBackgroundAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="login-modal"
        ref={loginModalRef}
        variants={loginModalAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="navbar-top__left__logo">luxe.</h1>

        {formStatus === "Login" && (
          <>
            <button
              className="login-modal__close-btn"
              onClick={() => setLoginPropmptOpen(false)}
            >
              <IoIosCloseCircle />
            </button>
            <h2 className="login-modal__headline">Login</h2>
            <form
              onSubmit={handleSubmit}
              className="login-modal__form"
            >
              <label className="login-modal__form__item">
                <FaUser className="login-modal__form__item__icon" />
                <input
                  className="login-modal__form__item__input"
                  placeholder="Email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </label>
              <label className="login-modal__form__item">
                <FaUnlock className="login-modal__form__item__icon" />
                <input
                  className="login-modal__form__item__input"
                  placeholder="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </label>
              <p className="bold">Forgot your password?</p>
              {error && <p className="login-modal__error">{error}</p>}
              <button
                className="login-modal__form__submit-button"
                type="submit"
              >
                <span>{formStatus}</span>
                <IoSend className="login-modal__form__submit-button__icon" />
              </button>
            </form>
            <div className="login-modal__providers">
              <p>or</p>
              <button
                className="login-modal__providers__github-button"
                onClick={() => signIn("github")}
              >
                <span>Login with GitHub</span>
                <FaGithub className="login-modal__providers__github-button__icon" />
              </button>
            </div>
            <p className="login-modal__signup">
              Dont have an account? <strong>Sign in</strong>
            </p>
          </>
        )}
        {formStatus === "Logging in" && (
          <div className="login-modal__logging-in">
            <div className="loading-page__spin"></div>
            <h2>Please wait</h2>
            <p>Logging in</p>
          </div>
        )}
        {formStatus === "Logged in" && (
          <div className="login-modal__logging-in">
            <Image
              className="login-modal__logging-in__avatar"
              src={session.data.user.userImage}
              fill
              alt=""
            />
            <p>
              Welcome, <strong>{session.data.user.name}</strong>
            </p>
            <p>You`re now logged in!</p>
            <button onClick={handleCloseAfterLogin}>
              <strong>Close</strong>
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;
