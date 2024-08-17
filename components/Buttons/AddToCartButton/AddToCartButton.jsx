"use client";
import React from "react";

//Icons
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { TbSquareRoundedMinusFilled } from "react-icons/tb";
import { FaBagShopping } from "react-icons/fa6";

import { useStateContext } from "@/context/StateContext";

const AddToCart = ({ product }) => {
  const { addToCart, increaseQty, decreaseQty, qty, showCart } =
    useStateContext();

  return (
    !showCart && (
      <div className="add-to-cart">
        <div className="add-to-cart__price">
          {/* <h4>Price</h4> */}
          <h4>£{product[0].price}</h4>
          <div className="test"></div>
        </div>

        <button
          type="button"
          className="add-to-cart__add-to-cart"
          onClick={() => addToCart(product[0], qty)}
        >
          <span className="add-to-cart__qty">
            <TbSquareRoundedMinusFilled
              onClick={decreaseQty}
              style={{ fontSize: "2rem" }}
              className={`add-to-cart__qty__button ${
                qty === 1 ? "btn-not-allowed" : ""
              }`}
            />
            <p className="add-to-cart__qty__value">{qty}</p>
            <TbSquareRoundedPlusFilled
              onClick={increaseQty}
              style={{ fontSize: "2rem" }}
              className={`add-to-cart__qty__button`}
            />
          </span>
          <h3>Add to cart</h3>
          <FaBagShopping style={{ fontSize: "1.6rem" }} />
        </button>
      </div>
    )
  );
};

export default AddToCart;
