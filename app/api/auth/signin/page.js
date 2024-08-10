"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";

//Icons
import { IoSend } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";

//Animations

import { AnimatePresence, motion } from "framer-motion";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

function SignupPage() {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [loginModal, setLoginModal] = useState(false);

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
        router.push("/");
      }

      if (res.status == 401) {
        setError("Make sure email and password are correct");
        return;
      }

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      // router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginModal = () => {
    setLoginModal(!loginModal);
    setError("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container" id="login-container">
      {/* <div className="login-container__bg-shape"></div> */}

      <Image
        className="login-container__image"
        src="/images/login-img.png"
        alt=""
        width={300}
        height={300}
      />

      <h1 className="login-container__headline">Welcome to Luxe</h1>
      <p className="login-container__sec-headline">
        Please log in to continue
      </p>
      <div style={{ flexGrow: 1, transition: "all 0.2s" }}></div>
      <AnimatePresence>
        {!loginModal && (
          <motion.button
            initial={{ opacity: 0, y: "100px" }}
            animate={{
              opacity: 1,
              y: "0",
              transition: {
                delay: 0.4,
              },
            }}
            exit={{
              opacity: 0,
              y: "100px",
              transition: { duration: 0.2 },
              // transition: { delay: 0.4 },
            }}
            className="login-container__login-btn"
            onClick={() => handleLoginModal()}
          >
            <span>Login with email</span>
            <IoSend style={{ width: "30px", height: "30px" }} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loginModal && (
          <motion.div
            className="login-container__form-wrapper"
            id="login-container__form-wrapper"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                delay: 0.2,
                duration: 0.4,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0,
              transition: {
                duration: 0.4,
              },
            }}
          >
            <button
              className="login-container__form-wrapper__close-btn"
              onClick={() => setLoginModal(!loginModal)}
            >
              X
            </button>
            <h2 className="login-container__form-wrapper__form-title">
              Login
            </h2>

            <motion.form
              onSubmit={handleSubmit}
              className="login-container__form-wrapper__form"
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1, transition: { delay: 0.4 } }}
              // exit={{ opacity: 0 }}
            >
              <label style={{ position: "relative", width: "100%" }}>
                <FaUser />
                <input
                  className="login-container__form-wrapper__form__input"
                  placeholder="Email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </label>
              <label style={{ position: "relative", width: "100%" }}>
                <FaUnlock />
                <input
                  className="login-container__form-wrapper__form__input"
                  placeholder="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </label>
              {error && (
                <p className="login-container__form-wrapper__error">
                  {error}
                </p>
              )}
              <button
                className="login-container__form-wrapper__form__submit-btn"
                type="submit"
              >
                <span>Login</span>
                <IoSend style={{ width: "30px", height: "30px" }} />
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className="login-container__github-btn"
        onClick={() => signIn("github")}
      >
        <span>Login with GitHub</span>
        <Image
          src="/images/github-icon.png"
          alt=""
          width={30}
          height={30}
        />
      </button>
      <p className="login-container__signup">
        Dont have an account? <strong>Sign in</strong>
      </p>
    </div>
  );
}

export default SignupPage;
