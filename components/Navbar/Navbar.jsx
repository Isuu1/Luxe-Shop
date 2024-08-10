"use client";
import React, { forwardRef, useEffect, useState } from "react";
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
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { HiMiniHome } from "react-icons/hi2";

const Navbar = forwardRef(({ mobile, user }, ref) => {
  Navbar.displayName = "Navbar";
  const {
    showMenu,
    setShowMenu,
    searchBar,
    userModal,
    setUserModal,
    showCart,
    fetchWishList,
    wishlist,
  } = useStateContext();

  const [navbarTopVisible, setNavbarTopVisible] = useState(true);

  // console.log("fetchWishList", fetchWishList);

  // useEffect(() => {
  //   const getWishlistData = async () => {
  //     const data = await fetchWishList(user.id);
  //     return data;
  //   };
  //   getWishlistData();
  // }, [wishlist]);

  // Get current path
  const pathname = usePathname();
  // Hide navbar bottom when user is on product page
  const showNavbarBottom = !pathname.startsWith("/product");
  // const searchBarOnUserPage = pathname.startsWith("/user");
  // console.log(searchBarOnUserPage);

  // useEffect(() => {
  //   const navbarTop = document.getElementById("navbar-top");
  //   if (searchBarOnUserPage) {
  //     navbarTop.classList.add("navbar-transition");
  //   } else {
  //     navbarTop.classList.remove("navbar-transition");
  //   }
  // }, [searchBarOnUserPage]);

  // Handling navbar top animation
  const { scrollY } = useScroll(
    mobile === false && { container: ref }
  );
  useMotionValueEvent(scrollY, "change", (latest) => {
    const navbarTop = document.getElementById("navbar-top");
    if (searchBar) {
      return;
    }
    if (latest >= 100) {
      navbarTop.classList.add("navbar-transition");
      setNavbarTopVisible(false);
    } else {
      navbarTop.classList.remove("navbar-transition");
      setNavbarTopVisible(true);
    }
  });

  return (
    <>
      <div
        id="navbar-top"
        className={`navbar-top ${
          mobile === false ? "desktop__navbar-top" : ""
        } ${searchBar ? "navbar-full-width" : ""}`}
      >
        <Search mobile={mobile} navbarTopVisible={navbarTopVisible} />
        <ShoppingCartIcon user={user} />
      </div>
      {showNavbarBottom && (
        <div
          className={`navbar-bottom ${
            mobile === false ? "desktop__navbar-bottom" : ""
          }`}
        >
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
});

export default Navbar;
