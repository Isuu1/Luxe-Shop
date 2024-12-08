"use client";

import React from "react";

//Context
import { useFormContext } from "@/context/FormContext";

const EditButton = ({ id, userId }) => {
  const { isEditing, setIsEditing } = useFormContext();

  const handleEdit = (e) => {
    e.preventDefault();
    if (userId === 105) {
      return alert(
        "Editing details is disabled. Use your own account to edit details."
      );
    }
    if (id === "password") {
      return alert(
        "Password cannot be edited right now. Please contact support for assistance"
      );
    }
    if (Object.values(isEditing).some((obj) => obj === true)) {
      return alert("Please save or cancel the current edit before proceeding");
    }
    setIsEditing((prevState) => ({ ...prevState, [id]: true }));
  };

  return (
    <button
      className="user-details-form-item__edit-button"
      onClick={(e) => handleEdit(e)}
      key="edit"
    >
      Edit
    </button>
  );
};

export default EditButton;
