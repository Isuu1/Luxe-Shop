"use client";
import { addToWishList, removeFromWishlist } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

//Icons
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

//Context
import { useStateContext } from "@/context/StateContext";

//Styles
import "./wishListButton.scss";

const WishlistButton = ({
  product,
  itemWishlisted,
  onProductPage,
  userId,
}) => {
  const router = useRouter();

  const { setLoginPropmptOpen } = useStateContext();

  const handleWishList = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    //Open login modal when user is not logged in
    if (!userId) {
      setLoginPropmptOpen(true);
      return;
    }
    if (itemWishlisted) {
      await removeFromWishlist(product._id, router);
    } else {
      await addToWishList(userId, product, router);
    }
  };

  return (
    <>
      <button
        className={`add-to-wishlist ${
          onProductPage
            ? "product-detail-container__wishlist-button"
            : ""
        }`}
        onClick={handleWishList}
      >
        {itemWishlisted ? (
          <FaHeart fontSize="1.8rem" style={{ fill: "red" }} />
        ) : (
          <FaRegHeart fontSize="1.8rem" />
        )}
      </button>
    </>
  );
};

export default WishlistButton;
