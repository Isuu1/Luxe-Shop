"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import "./backButton.scss";

const BackButton = ({ children }) => {
  const router = useRouter();

  return (
    <div className="back-button">
      <button
        className="back-button__button"
        onClick={() => router.back()}
      >
        <MdKeyboardArrowLeft />
      </button>

      <h2 className="back-button__title">{children}</h2>
    </div>
  );
};

export default BackButton;
