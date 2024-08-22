"use client";
import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  // Searchbar is used in both Search component and Navbar
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  // Category is used in CategorySelector and ProductsFeed
  const [category, setCategory] = useState("All");

  //User modal is used in UserModal and OpenModalButton
  const [userModal, setUserModal] = useState(false);

  // Menu is used in Menu and Navbar
  const [showMenu, setShowMenu] = useState(false);

  console.log("Testing main state context rendering");

  return (
    <Context.Provider
      value={{
        showMenu,
        setShowMenu,
        searchBarOpen,
        setSearchBarOpen,
        category,
        setCategory,
        userModal,
        setUserModal,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
