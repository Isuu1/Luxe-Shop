"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const SaveButton = () => {
  //Disable the button when the form is pending
  const { pending } = useFormStatus();

  return (
    <button
      className="user-details-form-item__edit-button"
      key="save"
      type="submit"
      disabled={pending}
    >
      Save
    </button>
  );
};

export default SaveButton;
