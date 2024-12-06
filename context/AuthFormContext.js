"use client";

import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const AuthFormContext = ({ children }) => {
  const [formPending, setFormPending] = useState(false);

  const [formErrors, setFormErrors] = useState(null);

  return (
    <Context.Provider
      value={{ formPending, setFormPending, formErrors, setFormErrors }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuthFormContext = () => useContext(Context);
