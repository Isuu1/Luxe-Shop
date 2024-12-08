"use client";

import React from "react";
import { IoHeartDislike } from "react-icons/io5";

import { removeFromWishlist } from "@/lib/utils";
import { useRouter } from "next/navigation";
import "./removeFromWishlistButton.scss";
import toast from "react-hot-toast";

const RemoveFromWishlistButton = ({ itemId, userId }) => {
  const router = useRouter();

  const handleRemoveFromWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromWishlist(userId, itemId, router);
    toast.success("Item removed from wishlist", {
      style: { marginTop: "100px" },
    });
  };

  return (
    <button
      className="wishlist-container__item__remove-button"
      onClick={handleRemoveFromWishlist}
    >
      <IoHeartDislike />
    </button>
  );
};

export default RemoveFromWishlistButton;
