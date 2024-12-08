"use client";
import React, { useEffect } from "react";
import Link from "next/link";

//Context
import { useCartContext } from "../../context/CartContext";

//Styles
import "./success.scss";

const Succsess = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useCartContext();

  useEffect(() => {
    localStorage.clear();
    // setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  });

  return (
    <div className="page success-page">
      <h1>Payment successful</h1>
      <p>Check your email for the receipt.</p>
      <Link href="/">
        <button className="success-page__button">Continue shopping</button>
      </Link>
    </div>
  );
};

export default Succsess;
