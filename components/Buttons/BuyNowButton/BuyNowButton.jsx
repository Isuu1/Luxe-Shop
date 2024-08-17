"use client";
import React from "react";
import { useStateContext } from "../../../context/StateContext";

//Icons
import { FaBagShopping } from "react-icons/fa6";

const BuyNowButton = ({ smallCard, product }) => {
  const { addToCart, qty } = useStateContext();

  const buyNow = (e) => {
    e.preventDefault();
    addToCart(product, qty);
  };

  return (
    <button className="buy-now" onClick={buyNow}>
      <FaBagShopping
        fontSize={smallCard ? "1.5rem" : "1.8rem"}
        color="#333"
      />
    </button>
  );
};
export default BuyNowButton;
