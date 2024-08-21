"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { userModalAnimation } from "../../styles/animations";
import { FaSignOutAlt } from "react-icons/fa";
import getProducts from "@/lib/utils";
import { useStateContext } from "@/context/StateContext";

//Icons
import { IoIosArrowForward } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { RiArrowDropRightLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";

import { MdEditDocument } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import SignoutButton from "../SignoutButton/SignoutButton";

const UserModal = ({ user }) => {
  const userModalRef = useRef(null);

  const { userModal, setUserModal } = useStateContext();
  console.log(userModal);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        userModalRef.current &&
        !userModalRef.current.contains(e.target) &&
        //This checks if the click event target is the button (or any child of it). If so, the modal won't close.
        !e.target.closest(".open-modal")
      ) {
        setUserModal(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userModalRef]);

  return (
    <motion.div
      className="user-modal"
      variants={userModalAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
      ref={userModalRef}
    >
      <div className="user-modal__bg"></div>
      <div className="user-modal__header">
        <Image
          className="user-modal__header__avatar-img"
          src={user.userImage}
          alt=""
          width={60}
          height={60}
        />
        <p>{user.name}</p>
        <em style={{ fontSize: "0.9rem" }}>{user.email}</em>
      </div>
      <nav className="user-modal__menu">
        <Link href="/">
          <div className="user-modal__menu__item">
            <FaUser className="user-modal__menu__item__icon" />
            <p>Edit account</p>
            <IoIosArrowForward className="user-modal__menu__item__icon" />
          </div>
        </Link>
        <Link href="/user/wishlist">
          <div className="user-modal__menu__item">
            <IoHeart className="user-modal__menu__item__icon" />
            <p>Wishlist</p>
            <IoIosArrowForward className="user-modal__menu__item__icon" />
          </div>
        </Link>
        <Link href="/user/orders">
          <div className="user-modal__menu__item">
            <IoWallet className="user-modal__menu__item__icon" />
            <p>Orders</p>
            <IoIosArrowForward className="user-modal__menu__item__icon" />
          </div>
        </Link>
        <SignoutButton />
      </nav>
    </motion.div>
  );
};

export default UserModal;
