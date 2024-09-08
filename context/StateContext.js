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

  //Login Prompt is used on WishlistButton and Product Page
  const [loginPromptOpen, setLoginPropmptOpen] = useState(false);

  //Sorting options for products page
  const [sortingOptions, setSortingOptions] = useState("Relevance");

  console.log("Testing main state context rendering");

  const [currentMaxPrice, setCurrentMaxPrice] = useState(10000);

  const [currentMinPrice, setCurrentMinPrice] = useState(0);

  // All ratings visible by default
  const [selectedRating, setSelectedRating] = useState([
    5, 4, 3, 2, 1,
  ]);

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
        loginPromptOpen,
        setLoginPropmptOpen,
        sortingOptions,
        setSortingOptions,
        currentMaxPrice,
        setCurrentMaxPrice,
        currentMinPrice,
        setCurrentMinPrice,
        selectedRating,
        setSelectedRating,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
