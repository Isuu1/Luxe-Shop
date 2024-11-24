import Image from "next/image";
import React from "react";

const ImageField = () => {
  return (
    <div className="user-details-form__image-container">
      <Image
        className="user-details-form__image-container__image"
        src="/images/user-avatar.jpg"
        alt=""
        width={120}
        height={120}
      />
      <button className="user-details-form__image-container__edit-button">
        Edit
      </button>
    </div>
  );
};

export default ImageField;
