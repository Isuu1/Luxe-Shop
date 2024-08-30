"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  loginModalAnimation,
  loginModalBackgroundAnimation,
} from "@/styles/animations";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/context/StateContext";

//Icons
import { IoIosCloseCircle } from "react-icons/io";

const LoginModalContainer = ({ children }) => {
  const loginModalRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const { loginPromptOpen, setLoginPropmptOpen } = useStateContext();

  // Stop scrolling page when login modal is open
  useEffect(() => {
    if (pathname === "/auth") {
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
  }, [pathname]);

  //Close login modal when user clicks outside of it
  useEffect(() => {
    //Disable modal closing when user is logging in
    // if (formStatus === "Logging in" || formStatus === "Logged in") {
    //   return;
    // }
    const handleClickOutside = (e) => {
      if (
        loginModalRef.current &&
        !loginModalRef.current.contains(e.target) &&
        //This checks if the click event target is the button (or any child of it). If so, the modal won't close.
        !e.target.closest(".open-modal")
      ) {
        setLoginPropmptOpen(false);
        // router.back();
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [loginModalRef, setLoginPropmptOpen]);

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
        <button
          className="login-modal__close-btn"
          onClick={() => setLoginPropmptOpen(false)}
        >
          <IoIosCloseCircle />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default LoginModalContainer;
