"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStateContext } from "../../context/StateContext";

//Animations
import {
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

//Components
import Menu from "../Menu/Menu";
import Search from "../Search/Search";
import ShoppingCartIcon from "../ShoppingCartIcon/ShoppingCartIcon";

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
    setUserModal,
    showCart,
  } = useStateContext();

  const [navbarTopFullWidth, setNavbarTopFullWidth] = useState(true);

  //Get current window width to display/hide menu
  const [windowWidth, setWindowWidth] = useState(null);

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

  //Get current winow width to handle menu show/hide
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
  }, [windowWidth]);

  return (
    <>
      <div className="navbar-top">
        <div className="navbar-top__left">
          <h1 className="navbar-top__left__logo">luxe.</h1>
          {windowWidth > 768 ? (
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
                className={`navbar-top__left__menu__item link link ${
                  pathname === "/user" ? "active" : ""
                }`}
                href="/user"
              >
                <FaUser />
                Account
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
          ) : null}
        </div>
        <div
          className={`navbar-top__right ${
            searchBarOpen ? "navbar-full-width" : ""
          }`}
        >
          <Search navbarTopFullWidth={navbarTopFullWidth} />
          <ShoppingCartIcon user={user} />
        </div>
      </div>
      {showNavbarBottom && windowWidth < 768 && (
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
            onClick={() => setShowMenu(!showMenu)}
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
