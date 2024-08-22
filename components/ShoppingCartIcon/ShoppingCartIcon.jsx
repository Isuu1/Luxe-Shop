"use client";
import React, { useEffect, useState } from "react";
import { LuShoppingBasket } from "react-icons/lu";

import { useCartContext } from "../../context/CartContext";
import { AnimatePresence } from "framer-motion";
import Cart from "../Cart/Cart";

const ShoppingCartIcon = ({ user }) => {
  //Check is user using mobile device or desktop to define layout
  const [windowWidth, setWindowWidth] = useState("");

  const { totalQuantities, showCart, setShowCart } = useCartContext();

  // useEffect(() => {
  //   if (typeof window != "undefined") {
  //     const windowWidth = window.innerWidth;
  //     setWindowWidth(windowWidth);
  //   }
  // }, [windowWidth]);
  // const mobile = windowWidth < 500;

  return (
    <>
      <AnimatePresence mode="wait">
        {showCart && <Cart key="shopping-cart" user={user} />}
      </AnimatePresence>
      {!showCart && (
        <button
          className="shopping-cart-icon "
          onClick={() => setShowCart(!showCart)}
        >
          <LuShoppingBasket style={{ fontSize: "1.7rem" }} />

          <span className="shopping-cart-icon__qty">
            {totalQuantities}
          </span>
        </button>
      )}
    </>
  );
};

export default ShoppingCartIcon;
