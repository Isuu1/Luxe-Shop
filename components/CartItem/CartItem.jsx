import React from "react";
import { urlFor } from "../../lib/client";

//Icons
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";

import { useStateContext } from "../../context/StateContext";

//Animations
import { motion } from "framer-motion";
import Image from "next/image";
import { cartProductAnimation } from "../../styles/animations";

const CartItem = ({ item }) => {
  const { updateCartItemQuantity, removeItem } = useStateContext();

  return (
    <motion.div
      className="cart-container__product"
      variants={cartProductAnimation}
      initial="visible"
      exit="exit"
    >
      <Image
        fill
        src={urlFor(item.image[0]).toString()}
        alt=""
        className="cart-container__product__image"
      />
      <div className="cart-container__product__desc">
        <h3 className="cart-container__product__desc__name">
          {item?.name}
        </h3>
        <p className="cart-container__product__desc__price">
          £{item?.price}
        </p>
        <div className="cart-container__product__desc__qty">
          <button
            onClick={() =>
              updateCartItemQuantity(item._id, "decrement")
            }
            className={`cart-container__product__desc__qty__button ${
              item.quantity <= 1 && "btn-inactive"
            }`}
          >
            <FaMinusSquare />
          </button>
          <p className="cart-container__product__desc__qty__value">
            {item?.quantity}
          </p>
          <button
            onClick={() =>
              updateCartItemQuantity(item._id, "increment")
            }
            className="cart-container__product__desc__qty__button"
          >
            <FaPlusSquare />
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={() => removeItem(item)}
        className="cart-container__product__delete-btn"
      >
        <MdRemoveShoppingCart
          style={{ fontSize: "2rem", color: "#333" }}
        />
      </button>
    </motion.div>
  );
};

export default CartItem;
