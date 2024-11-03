"use client";

import Image from "next/image";
import React from "react";

//Components
import UserDetailsFormItem from "../UserDetailsFormItem/UserDetailsFormItem";

//Styles
import "./userDetailsForm.scss";

const UserDetailsForm = ({ session }) => {
  return (
    <div className="user-details-form">
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

      <form className="user-details-form__details">
        <UserDetailsFormItem
          id="name"
          field={session.user.name}
          label="Name:"
        />
        <UserDetailsFormItem
          id="email"
          field={session.user.email}
          label="Email:"
        />
        <UserDetailsFormItem
          id="password"
          field="*********"
          label="Password:"
        />
      </form>
    </div>
  );
};

export default UserDetailsForm;
