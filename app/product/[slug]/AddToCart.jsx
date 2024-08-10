"use client";
import React from "react";

//Icons
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { TbSquareRoundedMinusFilled } from "react-icons/tb";
import { FaBagShopping } from "react-icons/fa6";

import { useStateContext } from "../../../context/StateContext";

const AddToCart = ({ product }) => {
  const { addToCart, increaseQty, decreaseQty, qty, showCart } =
    useStateContext();

  return (
    !showCart && (
      <div className="product-detail-container__details__buying-options">
        <h3 className="product-detail-container__details__buying-options__price">
          £{product[0].price}
        </h3>
        <div>
          <button
            type="button"
            className="product-detail-container__details__buying-options__add-to-cart"
            onClick={() => addToCart(product[0], qty)}
          >
            <span className="product-detail-container__details__buying-options__qty">
              <TbSquareRoundedMinusFilled
                onClick={decreaseQty}
                style={{ fontSize: "2.2rem" }}
                className={`product-detail-container__details__buying-options__qty__button ${
                  qty === 1 ? "btn-not-allowed" : ""
                }`}
              />
              <p className="product-detail-container__details__buying-options__qty__value">
                {qty}
              </p>
              <TbSquareRoundedPlusFilled
                onClick={increaseQty}
                style={{ fontSize: "2.2rem" }}
                className={`product-detail-container__details__buying-options__qty__button`}
              />
            </span>
            <h3>Add to cart</h3>
            <FaBagShopping style={{ fontSize: "1.4rem" }} />
          </button>
        </div>
      </div>
    )
  );
};

export default AddToCart;
