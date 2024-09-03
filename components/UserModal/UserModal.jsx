"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

//Animations
import { motion } from "framer-motion";
import { userModalAnimation } from "../../styles/animations";

//Context
import { useStateContext } from "@/context/StateContext";

//Icons
import { IoIosArrowForward } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";

//Components
import SignoutButton from "../Buttons/SignoutButton/SignoutButton";

const UserModal = ({ user }) => {
  const userModalRef = useRef(null);

  const { setUserModal } = useStateContext();

  const pathname = usePathname();

  const [initialPathname, setInitialPathname] = useState(pathname);

  //Close modal when user clicks outside of it
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
  }, [userModalRef, setUserModal]);

  // Close modal when pathname changes, but ignore the initial mount
  useEffect(() => {
    if (pathname !== initialPathname) {
      setUserModal(false); // Close modal on route change
    }
  }, [pathname, initialPathname, setUserModal]);

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
          src={`${user ? user.userImage : "/images/user2.png"}`}
          alt=""
          width={60}
          height={60}
        />
        <p>{user ? user.name : ""}</p>
        <em style={{ fontSize: "0.9rem" }}>{user && user.email}</em>
      </div>

      <nav className="user-modal__menu">
        {user ? (
          <>
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
          </>
        ) : (
          <p>
            Please{" "}
            <span className="bold">
              <Link href="/user">log in</Link>
            </span>{" "}
            to see this page
          </p>
        )}
      </nav>
    </motion.div>
  );
};

export default UserModal;
