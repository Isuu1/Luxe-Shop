import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useStateContext } from "@/context/StateContext";
import { usePathname, useRouter } from "next/navigation";

const LoginPrompt = () => {
  const [sliderWidth, setSliderWidth] = useState(100);
  const duration = 3000; // Total animation time
  const steps = 100; // Steps from 100 to 0
  const intervalTime = duration / steps; // Time between updates

  const { setLoginPropmptOpen } = useStateContext();

  const pathname = usePathname();

  const router = useRouter();

  const [initialPathname, setInitialPathname] = useState(pathname);

  // Change width of slider to indicate time left for prompt to stay open
  useEffect(() => {
    if (initialPathname !== pathname) {
      setLoginPropmptOpen(false);
      return;
    }
    if (sliderWidth > 0) {
      const intervalId = setInterval(() => {
        setSliderWidth((prevCount) => prevCount - 1);
      }, intervalTime);
      setTimeout(() => {
        setLoginPropmptOpen(false);
      }, 3000);
      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [intervalTime, sliderWidth]);

  // Close modal when user navigates to another page
  //   useEffect(() => {
  //     if (pathname !== initialPathname) {
  //       setLoginPropmptOpen(false);
  //     }
  //   }, [pathname, initialPathname, setLoginPropmptOpen]);

  return (
    <motion.div
      className="login"
      animate={{ scale: 1 }}
      initial={{ scale: 0 }}
      exit={{ scale: 0 }}
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
