"use client";

import Image from "next/image";
import React from "react";

//Components
import NameField from "./Fields/NameField/NameField";
import EmailField from "./Fields/EmailField/EmailField";
import PasswordField from "./Fields/PasswordField/PasswordField";
import ImageField from "./Fields/ImageField/ImageField";

//Styles
import "./userDetailsForm.scss";

//Authentication
import { useSession } from "next-auth/react";

const UserDetailsForm = ({ session }) => {
  const { status, data } = useSession();

  if (status === "loading") {
    return (
      <div style={{ minHeight: "400px" }} className="flex-center ">
        <div className="loading-page__spin"></div>
      </div>
    );
  }

  // const session = data;

  console.log("Session in NameField: ", session);

  return (
    <div className="user-details-form">
      <ImageField id="image" />
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
            id="password"
            field="********"
            label="Password: "
            session={session}
          />
        </>
      </div>
    </div>
  );
};

export default UserDetailsForm;
