"use client";
import { addToWishList, removeFromWishlist } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

//Icons
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const WishlistButton = ({
  product,
  itemWishlisted,
  onProductPage,
  userId,
}) => {
  const router = useRouter();

  const handleWishList = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (itemWishlisted) {
      await removeFromWishlist(product._id, router);
    } else {
      await addToWishList(userId, product, router);
    }
  };

  return (
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
  );
};

export default WishlistButton;
