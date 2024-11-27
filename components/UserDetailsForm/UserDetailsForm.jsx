"use client";

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
import { useRouter } from "next/navigation";

const UserDetailsForm = () => {
  //Get user session
  const { status, data } = useSession();

  const router = useRouter();

  //Session is null on initial load so need to refresh the page
  if (!data) {
    console.log(data);
    router.refresh();
  }

  const session = data;

  console.log("Session in UserDetailsForm: ", session);

  if (status === "loading") {
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
