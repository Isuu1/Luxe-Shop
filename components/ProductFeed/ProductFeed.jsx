"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ProductFeed = ({ children, userId, wishlist, product }) => {
  // const router = useRouter();

  // // router.refresh();

  console.log(product, children, userId, wishlist);
  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          product,
          userId,
          wishlist,
        })
      )}
    </div>
  );
};

export default ProductFeed;
