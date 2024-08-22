"use client";
import {
  fetchWishlist,
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/lib/utils";
import { useSession } from "next-auth/react";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import toast from "react-hot-toast";

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
