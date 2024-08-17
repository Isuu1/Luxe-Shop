"use client";
import { addToWishList, removeFromWishlist } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

//Icons
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const WishlistButton = ({ userId, product, itemWishlisted }) => {
  const router = useRouter();

  const handleWishList = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (itemWishlisted) {
      console.log("Testing removing from wishlist case" + product.id);
      removeFromWishlist(product._id, router);
    } else {
      console.log("Testing add to wishlist case");
      addToWishList(userId, product, router);
    }
  };

  return (
    <button className="add-to-wishlist" onClick={handleWishList}>
      {itemWishlisted ? (
        <FaHeart fontSize="1.8rem" style={{ fill: "red" }} />
      ) : (
        <FaRegHeart fontSize="1.8rem" />
      )}
    </button>
  );
};

export default WishlistButton;
