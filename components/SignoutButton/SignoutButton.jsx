"use client";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";

const SignoutButton = () => {
  return (
    <button className="signout-button" onClick={() => signOut()}>
      <FaSignOutAlt style={{ fontSize: "1.1rem", color: "#000" }} />
      <p>Sign out</p>
    </button>
  );
};

export default SignoutButton;
