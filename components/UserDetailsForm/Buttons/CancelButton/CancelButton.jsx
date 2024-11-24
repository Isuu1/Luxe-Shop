"use client";

import React from "react";
import toast from "react-hot-toast";

//Context
import { useFormContext } from "@/context/FormContext";

const CancelButton = ({ id, formAction }) => {
  const { setIsEditing } = useFormContext();

  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditing((prevState) => ({ ...prevState, [id]: false }));
    //Change form state to cancelled
    formAction({ cancelled: true });
    //Display notification to user
    toast("User update cancelled", {
      icon: "🚫",
      style: { marginTop: "50px" },
    });
  };

  return (
    <button
      className="user-details-form-item__cancel-button"
      onClick={handleCancel}
      key="cancel"
    >
      Cancel
    </button>
  );
};

export default CancelButton;
