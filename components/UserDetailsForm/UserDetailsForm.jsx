"use client";

import Image from "next/image";
import React from "react";

//Components
import NameField from "./Fields/NameField/NameField";
import EmailField from "./Fields/EmailField/EmailField";
import PasswordField from "./Fields/PasswordField/PasswordField";

//Styles
import "./userDetailsForm.scss";

//Authentication
import { useSession } from "next-auth/react";

const UserDetailsForm = () => {
  const { status, data } = useSession();

  if (status === "loading") {
    return (
      <div style={{ minHeight: "400px" }} className="flex-center ">
        <div className="loading-page__spin"></div>
      </div>
    );
  }

  const session = data;

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
      <div className="user-details-form__details">
        <>
          <NameField
            id="name"
            field={session.user?.name}
            label="Name: "
            session={session}
          />
          <EmailField
            id="email"
            field={session.user?.email}
            label="Email: "
            session={session}
          />
          <PasswordField
            id="email"
            field={session.user?.password}
            label="Password: "
            session={session}
          />
        </>
      </div>
    </div>
  );
};

export default UserDetailsForm;
