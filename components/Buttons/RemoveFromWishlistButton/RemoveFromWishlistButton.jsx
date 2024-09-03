"use client";

import React from "react";
import { IoHeartDislike } from "react-icons/io5";

import { removeFromWishlist } from "@/lib/utils";
import { useRouter } from "next/navigation";

const RemoveFromWishlistButton = ({ itemId }) => {
  // const { removeFromWishlist } = useStateContext();

  const router = useRouter();

  return (
    <button
      className="wishlist-container__item__remove-button"
      onClick={() => removeFromWishlist(itemId, router)}
    >
      <IoHeartDislike />
    </button>
  );
};

export default RemoveFromWishlistButton;
