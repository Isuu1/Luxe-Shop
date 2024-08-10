"use client";
import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../Navbar/Navbar";
import ShoppingCartIcon from "../ShoppingCartIcon/ShoppingCartIcon";
import UserModal from "../UserModal/UserModal";
import Search from "../Search/Search";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const DesktopLayout = ({ children, user }) => {
  //This is to perform a check if user is on login page to disable Cart, Searchform and Navbar
  const pathname = usePathname();
  const loginPageActive = pathname.startsWith("/api");

  //This is a reference to inner wrapper to keep searchbar animation logic
  const [innerWrapperReference, setInnerWrapperReference] =
    useState(null);
  const innerWrapperRef = useRef(null);
  useEffect(() => {
    if (innerWrapperRef !== null) {
      setInnerWrapperReference(innerWrapperRef);
    }
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        background: "#c2c2c2",
      }}
    >
      <div className="desktop-layout" id="desktop-layout">
        <div className="desktop-layout__outer-wrapper">
          {!loginPageActive && (
            <>
              <Toaster />
              <Navbar
                user={user}
                mobile={false}
                ref={innerWrapperReference}
              />
              <ShoppingCartIcon />
            </>
          )}

          <div
            className="desktop-layout__inner-wrapper"
            ref={innerWrapperRef}
          >
            <Image
              src="/images/notch.png"
              alt=""
              width={113}
              height={30}
              style={{
                zIndex: "99",
                position: "absolute",
                left: "50%",
                top: "20px",
                transform: "translate(-50%)",
              }}
            />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;
