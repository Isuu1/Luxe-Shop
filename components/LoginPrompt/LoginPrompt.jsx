import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useStateContext } from "@/context/StateContext";
import { usePathname, useRouter } from "next/navigation";

const LoginPrompt = () => {
  const [sliderWidth, setSliderWidth] = useState(100);
  const duration = 3000; // Total animation time
  const steps = 100; // Steps from 100 to 0
  const intervalTime = duration / steps; // Time between updates

  const { loginPromptOpen, setLoginPropmptOpen } = useStateContext();

  const pathname = usePathname();

  const router = useRouter();

  const loginPromptref = useRef(null);

  //Close modal when user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        loginPromptref.current &&
        !loginPromptref.current.contains(e.target) &&
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
  }, [setLoginPropmptOpen]);

  // Change width of slider to indicate time left for prompt to stay open
  useEffect(() => {
    if (sliderWidth > 0) {
      const intervalId = setInterval(() => {
        setSliderWidth((prevCount) => prevCount - 1);
      }, intervalTime);
      // setTimeout(() => {
      //   setLoginPropmptOpen(false);
      // }, 3000);
      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
    if (sliderWidth === 0) {
      setLoginPropmptOpen(false);
    }
  }, [intervalTime, sliderWidth, setLoginPropmptOpen]);

  const [initialPathname, setInitialPathname] = useState(pathname);

  // Close prompt on route change
  useEffect(() => {
    if (loginPromptOpen && pathname !== initialPathname) {
      setLoginPropmptOpen(false);
      return;
    }
  }, [
    pathname,
    setLoginPropmptOpen,
    loginPromptOpen,
    initialPathname,
  ]);

  return (
    <motion.div
      className="login"
      animate={{ scale: 1 }}
      initial={{ scale: 0 }}
      exit={{ scale: 0 }}
      ref={loginPromptref}
    >
      <p>
        <span className="bold">
          <Link href="/user" scroll={true}>
            Sign in
          </Link>
        </span>
        {` or `}
        <span className="bold">
          <Link href="/user" scroll={true}>
            Register{" "}
          </Link>
        </span>
        to save items in your Wishlist.
      </p>
      <div
        className="login__slider"
        style={{
          width: `${sliderWidth}%`,
        }}
      ></div>
    </motion.div>
  );
};

export default LoginPrompt;
