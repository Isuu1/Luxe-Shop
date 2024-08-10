"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { userModalAppear } from "../../styles/animations";
import { FaSignOutAlt } from "react-icons/fa";
import getProducts from "@/lib/utils";
import { useStateContext } from "@/context/StateContext";

const UserModal = ({ user }) => {
  const [wishListActive, setWishListActive] = useState(false);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = getProducts();
    data.then((products) => setProducts(products));
  }, []);

  return (
    <>
      {/* {wishListActive && <div className="wishlist-container"></div>} */}

      <motion.div
        className="user-modal"
        variants={userModalAppear}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="user-modal__header">
          <Image
            className="user-modal__header__avatar-img"
            src="/images/user-avatar.png"
            alt=""
            width={60}
            height={60}
          />
          <h4>
            Welcome, <br /> {user.name}
          </h4>
        </div>
        <div className="user-modal__account">
          <h4>Account </h4>
          <p>
            Name <br /> {user.name}
          </p>
          <p>
            Email <br /> {user.email}
          </p>
        </div>
        <div className="user-modal__wishlist">
          <button onClick={() => setWishListActive(true)}>
            Wishlist
          </button>
        </div>

        <button
          className="user-modal__signout-btn"
          onClick={() => signOut()}
        >
          <FaSignOutAlt style={{ fontSize: "1.3rem" }} />
          <h4>Sign out</h4>
        </button>
      </motion.div>
    </>
  );
};

export default UserModal;
