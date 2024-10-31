"use client";
import React from "react";

//Styles
import "./searchBarButton.scss";

//Icons
import { IoSearch } from "react-icons/io5";

//Context
import { useStateContext } from "@/context/StateContext";

const SearchBarButton = () => {
  const { setSearchOpen } = useStateContext();

  const openSearchBar = () => {
    setSearchOpen(true);
  };

  return (
    <button className="search-button" onClick={openSearchBar}>
      <IoSearch />
    </button>
  );
};

export default SearchBarButton;
