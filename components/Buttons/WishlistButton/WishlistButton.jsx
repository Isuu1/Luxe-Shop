"use client";
import { addToWishList, removeFromWishlist } from "@/lib/utils";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

//Icons
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

//Components
import LoginPrompt from "@/components/LoginPrompt/LoginPrompt";
import { useStateContext } from "@/context/StateContext";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

const WishlistButton = ({
  product,
  itemWishlisted,
  onProductPage,
  userId,
}) => {
  const router = useRouter();

  const pathname = usePathname();

  const { loginPromptOpen, setLoginPropmptOpen } = useStateContext();

  const handleWishList = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    //Disable modal on mobile devices and redirect to login page instead
    // if (!userId && window.innerWidth < 768) {
    //   router.push("/user");
    //   return;
    // }
    //Open login modal when user is not logged in
    if (!userId) {
      // router.push("/user", { scroll: false });
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
