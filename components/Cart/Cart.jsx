"use client";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useStateContext } from "../../context/StateContext";
import CartItem from "../CartItem/CartItem";
import getStripe from "../../lib/getStripe";

//Icons
import { IoIosClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";

//Animations
import { AnimatePresence, motion } from "framer-motion";
import { cartSlide } from "../../styles/animations";

const Cart = ({ mobile, user }) => {
  const cartRef = useRef();
  const {
    cartItems,
    totalPrice,
    totalQuantities,
    setShowCart,
    showCart,
  } = useStateContext();

  const userEmail = user.email;

  console.log("Shopping cart user data: ", user);
  console.log("Shopping cart items: ", JSON.stringify(cartItems));

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const res = await fetch("/api/stripe_checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //Passing user email and products to request
        userEmail: userEmail,
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
      className={`cart-container ${
        mobile === false ? "desktop__cart-container" : ""
      }`}
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
