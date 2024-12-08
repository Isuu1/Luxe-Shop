import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

//Icons
import { HiHome } from "react-icons/hi";
import { BiSolidCategory } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaListCheck } from "react-icons/fa6";
import { TiHeartFullOutline } from "react-icons/ti";
import { MdMiscellaneousServices } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

//Styles
import "./menu.scss";

//Animations
import { motion } from "framer-motion";
import { menuContainerVariants } from "../../styles/animations";

//Context
import { useStateContext } from "../../context/StateContext";

//Components
import SignoutButton from "../Buttons/SignoutButton/SignoutButton";
import MenuItem from "../MenuItem/MenuItem";

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
    <motion.ul
      className="menu-container"
      ref={menuRef}
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={menuContainerVariants}
    >
      <MenuItem key="home">
        <Link href="/"></Link>
        <HiHome />
        Home
      </MenuItem>

      <MenuItem key="products">
        <Link href="/products"></Link>
        <BiSolidCategory />
        Products
      </MenuItem>
      <MenuItem key="about">
        <Link href="/about"></Link>
        <BsFillPeopleFill />
        About us
      </MenuItem>
      <MenuItem key="about">
        <Link href="/support"></Link>
        <BiSupport />
        Support
      </MenuItem>
      <MenuItem key="account">
        <Link href="/user"></Link>
        <FaUser />
        My account
      </MenuItem>
      <MenuItem key="wishlist">
        <Link href="/user/wishlist"></Link>
        <TiHeartFullOutline />
        Wishlist
      </MenuItem>
      <MenuItem key="orders">
        <Link href="/user/orders"></Link>
        <FaListCheck />
        Orders
      </MenuItem>
      {user && (
        <MenuItem key="signout">
          <SignoutButton />
        </MenuItem>
      )}
    </motion.ul>
  );
};

export default Menu;

{
  /* <div className="menu-container__avatar">
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
      </div> */
}
