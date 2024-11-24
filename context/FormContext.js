"use client";

import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const FormContext = ({ children }) => {
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    password: false,
  });

  return (
    <Context.Provider value={{ isEditing, setIsEditing }}>
      {children}
    </Context.Provider>
  );
};

export const useFormContext = () => useContext(Context);
