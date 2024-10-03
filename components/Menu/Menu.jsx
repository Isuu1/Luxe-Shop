import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

//Icons
import { HiHome } from "react-icons/hi";
import { BiSolidCategory } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

import { FaListCheck } from "react-icons/fa6";
import { TiHeartFullOutline } from "react-icons/ti";

//Styles
import "./menu.scss";

//Animations
import { motion } from "framer-motion";
import { menuSlide } from "../../styles/animations";

//Context
import { useStateContext } from "../../context/StateContext";

//Components
import SignoutButton from "../Buttons/SignoutButton/SignoutButton";

const Menu = ({ user }) => {
  const { setShowMenu } = useStateContext();

  const menuRef = useRef(null);

  //Close menu if user click outside od menu container
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        //Don not close menu if user clicks on the icon that opens it
        !e.target.closest(".navbar-bottom__icon")
      ) {
        console.log("Clicked outside, closing menu");
        setShowMenu(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, setShowMenu]);

  return (
    <motion.div
      className="menu-container"
      ref={menuRef}
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={menuSlide}
    >
      <div className="menu-container__avatar">
        <Image
          className="menu-container__avatar__profile-image"
          alt=""
          src={user ? user.userImage : "/images/user2.png"}
          fill
        />
        <div className="menu-container__avatar__credentials">
          <p className="bold menu-container__avatar__credentials__user-account">
            {user ? user.email : "Guest"}
          </p>
          {!user && (
            <p className="menu-container__avatar__credentials__login">
              <span className="bold">
                <Link href="/user">Log in</Link>
              </span>{" "}
              or{" "}
              <span className="bold">
                <Link href="/auth/signup">Sign up</Link>
              </span>
            </p>
          )}
        </div>
      </div>

      <ul className="menu-container__nav">
        <Link href="/">
          <li className="menu-container__nav__item">
            <HiHome />
            Home
          </li>
        </Link>
        <Link href="/products">
          <li className="menu-container__nav__item">
            <BiSolidCategory />
            Products
          </li>
        </Link>
        <Link href="/user">
          <li className="menu-container__nav__item">
            <FaUser />
            My account
          </li>
        </Link>
        <li className="menu-container__nav__item">
          <TiHeartFullOutline />
          Wishlist
        </li>
        <li className="menu-container__nav__item">
          <FaListCheck />
          Orders
        </li>
        <li>{user && <SignoutButton />}</li>
      </ul>
    </motion.div>
  );
};

export default Menu;
