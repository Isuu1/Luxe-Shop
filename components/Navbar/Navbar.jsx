"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

//Context
import { useStateContext } from "../../context/StateContext";

//Animations
import {
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

//Styles
import "./navbar.scss";

//Components
import Menu from "../Menu/Menu";
import Search from "../Search/Search";
import ShoppingCartButton from "@/components/Buttons/ShoppingCartButton/ShoppingCartButton";
import OpenModalButton from "@/components/Buttons/OpenModalButton/OpenModalButton";
import UserModal from "../UserModal/UserModal";
import LoginPrompt from "../LoginPrompt/LoginPrompt";

//Icons
import { TiThMenu } from "react-icons/ti";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { HiMiniHome } from "react-icons/hi2";

const Navbar = ({ user }) => {
  const {
    showMenu,
    setShowMenu,
    searchBarOpen,
    userModal,
    loginPromptOpen,
  } = useStateContext();

  const [navbarTopFullWidth, setNavbarTopFullWidth] = useState(true);

  // Get current path
  const pathname = usePathname();

  // Hide navbar bottom when user is on product page
  const showNavbarBottom = !pathname.startsWith("/product");

  // Handling navbar top animation
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const navbarTopRight = document.querySelector(
      ".navbar-top__right"
    );
    const navbarTopLeft = document.querySelector(".navbar-top__left");
    if (searchBarOpen) {
      return;
    }
    if (latest >= 100) {
      navbarTopRight.classList.add("navbar-top-right-transition");
      navbarTopLeft.classList.add("navbar-top-left-transition");
      setNavbarTopFullWidth(false);
    } else {
      navbarTopRight.classList.remove("navbar-top-right-transition");
      navbarTopLeft.classList.remove("navbar-top-left-transition");

      setNavbarTopFullWidth(true);
    }
  });

  const handleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loginPromptOpen && <LoginPrompt />}
      </AnimatePresence>
      <div className="navbar-top">
        <div className="navbar-top__left">
          <h1 className="navbar-top__left__logo">luxe.</h1>

          <nav className="navbar-top__left__menu">
            <Link
              className={`navbar-top__left__menu__item link ${
                pathname === "/" ? "active" : ""
              }`}
              href="/"
            >
              <GoHomeFill />
              Home
            </Link>
            <Link
              className={`navbar-top__left__menu__item link ${
                pathname === "/products" ? "active" : ""
              }`}
              href="/products"
            >
              <BiSolidCategoryAlt />
              Products
            </Link>
          </nav>
        </div>
        <div
          className={`navbar-top__right ${
            searchBarOpen ? "navbar-full-width" : ""
          }`}
        >
          <Search navbarTopFullWidth={navbarTopFullWidth} />
          <AnimatePresence mode="wait">
            {userModal && <UserModal user={user} />}
          </AnimatePresence>
          <OpenModalButton user={user} />

          <ShoppingCartButton user={user} />
        </div>
      </div>
      {showNavbarBottom && (
        <div className="navbar-bottom">
          <Link href="/user">
            <button className="navbar-bottom__icon">
              <FaUser />
            </button>
          </Link>

          <Link href="/">
            <button className="navbar-bottom__icon menu-item-active">
              <HiMiniHome style={{ fontSize: "2rem" }} />
            </button>
          </Link>
          <button
            className="navbar-bottom__icon"
            onClick={handleMenu}
          >
            <TiThMenu />
          </button>

          <AnimatePresence mode="wait">
            {showMenu && <Menu key={"menu"} user={user} />}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default Navbar;
