"use client";

import Image from "next/image";
import React, { useRef } from "react";

const ImageField = () => {
  const inputRef = useRef(null);

  return (
    <div className="user-details-form__image-container">
      <Image
        className="user-details-form__image-container__image"
        src="/images/user-avatar.jpg"
        alt=""
        width={120}
        height={120}
      />
      <button
        className="user-details-form__image-container__edit-button"
        onClick={() => inputRef.current.click()}
        disabled
      >
        Edit
      </button>
      <input type="file" hidden ref={inputRef} />
    </div>
  );
};

export default ImageField;
