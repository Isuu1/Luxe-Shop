import Image from "next/image";
import React from "react";
import { getProviders, signIn, useSession } from "next-auth/react";

//Icons
import { IoSend } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";

//Animations

import { AnimatePresence, motion } from "framer-motion";
import { redirect } from "next/dist/server/api-utils";

import LoginForm from "@/components/LoginForm/LoginForm";
import BackButton from "@/components/BackButton/BackButton";

function SigninPage() {
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

  return (
    <>
      <BackButton>Login</BackButton>
      <div className="login-container" id="login-container">
        {/* <div className="login-container__bg-shape"></div> */}
        {/* <h1>This is paraller route</h1>
      <Image
        className="login-container__image"
        src="/images/login-img.png"
        alt=""
        width={300}
        height={300}
      /> */}

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
