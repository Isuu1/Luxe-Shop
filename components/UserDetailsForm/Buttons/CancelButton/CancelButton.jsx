"use client";

import React from "react";

//Context
import { useFormContext } from "@/context/FormContext";
import { useRouter } from "next/navigation";

const CancelButton = ({ id, field, state, formRef }) => {
  const { setIsEditing, setInputValue } = useFormContext();

  const router = useRouter();

  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditing((prevState) => ({ ...prevState, [id]: false }));
    setInputValue((prevState) => ({ ...prevState, [id]: field }));

    // router.refresh();
    // if (!state.success) {
    //   console.log(formRef);
    //   console.log(Date.now().toString());
    //   formRef.current.reset();
    // }
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
