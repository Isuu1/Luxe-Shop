"use client";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";

const SignoutButton = () => {
  return (
    <button className="signout-button" onClick={() => signOut()}>
      <FaSignOutAlt style={{ fontSize: "1.3rem", color: "#fff" }} />
      <h4>Sign out</h4>
    </button>
  );
};

export default SignoutButton;
