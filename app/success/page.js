"use client";
import React, { useEffect } from "react";
import Link from "next/link";

//Context
import { useStateContext } from "../../context/StateContext";

//Styles
import "./success.scss";

const Succsess = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } =
    useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  });

  return (
    <div className="success-page">
      <h3>Payment successful</h3>
      <p>Check your email for the receipt.</p>
      <Link href="/">
        <button className="success-page__button">
          Continue shopping
        </button>
      </Link>
    </div>
  );
};

export default Succsess;
