"use client";

import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const FormContext = ({ children }) => {
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    password: "",
  });

  return (
    <Context.Provider
      value={{ isEditing, setIsEditing, inputValue, setInputValue }}
    >
      {children}
    </Context.Provider>
  );
};

export const useFormContext = () => useContext(Context);
