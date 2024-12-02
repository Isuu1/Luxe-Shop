"use client";
import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import "./signoutButton.scss";
import toast from "react-hot-toast";

const SignoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    //Set delay between toasters to make it look like a loading process
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    setLoading(true);
    const loadingToast = toast.loading("Signing out...");
    try {
      await delay(2000);
      toast.dismiss(loadingToast);
      toast.success("Signed out successfully", {
        style: { marginTop: "50px" },
      });
      await delay(2000);
      await signOut();
      setLoading(false);
    } catch (error) {
      toast.error("Error signing out", {
        style: { marginTop: "50px" },
      });
    }
  };

  return (
    <button
      className="signout-button"
      onClick={handleSignOut}
      disabled={loading}
      aria-disabled={loading}
    >
      <FaSignOutAlt className="signout-button__icon" />
      <p className="signout-button__text">Sign out</p>
    </button>
  );
};

export default SignoutButton;
