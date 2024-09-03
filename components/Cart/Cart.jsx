"use client";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useCartContext } from "@/context/CartContext";
import CartItem from "../CartItem/CartItem";
import getStripe from "../../lib/getStripe";

//Icons
import { IoIosClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";

//Animations
import { AnimatePresence, motion } from "framer-motion";
import { cartSlide } from "../../styles/animations";

const Cart = ({ user }) => {
  const cartRef = useRef();
  const { cartItems, totalPrice, setShowCart, showCart } =
    useCartContext();

  // Close cart when user click anywhere else

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(e.target) &&
        //This checks if the click event target is the button (or any child of it). If so, the modal won't close.
        !e.target.closest(".cart-container")
      ) {
        setShowCart(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowCart]);

  const userEmail = user && user.email;

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const res = await fetch("/api/stripe_checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //Passing user email and products to request
        userEmail: userEmail && userEmail,
        products: cartItems,
      }),
    });
    if (!res) {
      console.error("Failed to fetch data:", res.statusText);
      return;
    }
    const session = await res.json();
    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: session.sessionId });
  };

  return (
    <motion.div
      className="cart-container"
      ref={cartRef}
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={cartSlide}
    >
      <div className="cart-container__header">
        <h2 className="cart-container__header__headline">
          Your cart
        </h2>
        <button
          className="cart-container__header__close-button"
          onClick={() => setShowCart(!showCart)}
        >
          <IoIosClose />
        </button>
      </div>
      <div className="cart-container__products_wrapper">
        <AnimatePresence>
          {cartItems.length > 0 ? (
            cartItems?.map((item, index) => (
              <CartItem key={item._id} item={item} />
            ))
          ) : (
            <div className="cart-container__empty-basket-msg">
              <h2>No items yet</h2>
            </div>
          )}
        </AnimatePresence>
      </div>
      <div className="cart-container__footer">
        <h2 className="cart-container__footer__total-price">
          Total:{" "}
        </h2>
        <h2>£{totalPrice}</h2>
        <button
          className="cart-container__footer__pay-btn"
          onClick={handleCheckout}
        >
          Proceed to checkout
          <IoSend style={{ fontSize: "1.2rem" }} />
        </button>
      </div>
    </motion.div>
  );
};

export default Cart;
