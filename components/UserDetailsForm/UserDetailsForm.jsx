"use client";

import React, { useEffect } from "react";

//Components
import NameField from "./Fields/NameField/NameField";
import EmailField from "./Fields/EmailField/EmailField";
import PasswordField from "./Fields/PasswordField/PasswordField";
import ImageField from "./Fields/ImageField/ImageField";

//Styles
import "./userDetailsForm.scss";

//Authentication
import { useSession } from "next-auth/react";

const UserDetailsForm = () => {
  //Get user session
  const { status, data } = useSession();

  //Session is null on initial load so need to refresh the page
  useEffect(() => {
    if (data === null) {
      window.location.reload();
    }
  });

  const session = data;

  if (status === "loading" || !session) {
    return (
      <div style={{ minHeight: "400px" }} className="flex-center ">
        <div className="loading-page__spin"></div>
      </div>
    );
  }

  return (
    <div className="user-details-form">
      <ImageField id="image" />
      <div className="user-details-form__details">
        <>
          {session.user.id === 105 && (
            <div className="user-details-form__admin">
              <h1>This is testing account</h1>
              <p>Editing details is disabled.</p>
              <p>Use your own account to edit details.</p>
            </div>
          )}
          <NameField
            id="name"
            field={session?.user?.name}
            label="Name: "
            session={session}
          />
          <EmailField
            id="email"
            field={session?.user?.email}
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
