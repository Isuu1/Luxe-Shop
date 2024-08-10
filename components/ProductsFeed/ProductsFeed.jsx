"use client";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import Product from "../ProductCard/Product";
import { useStateContext } from "@/context/StateContext";
import { motion } from "framer-motion";

const ProductsFeed = ({ products, userId, wishlist }) => {
  const { category } = useStateContext();
  // console.log(products);

  // useEffect(() => {
  //   const container = document.getElementById("products-container");
  //   const matchingProducts = products.filter((item) =>
  //     item.category.find((cat) => cat === category)
  //   );
  //   console.log(matchingProducts);
  //   console.log("Matching products length", matchingProducts.length);
  //   if (matchingProducts.length > 2) {
  //     container.classList.add("products-container--transition");
  //   } else {
  //     console.log("Removing transition classname");
  //     container.classList.remove("products-container--transition");
  //   }
  // }, [category]);

  const matchingCategory = products.filter((product) =>
    product.category.find((cat) => cat === category)
  );

  return (
    <motion.div
      className="home-container__products"
      id="products-container"
    >
      <swiper-container
        key="products-swiper"
        slides-per-view="2"
        space-between="20"
        grid="true"
        grid-fill="row"
        grid-rows="2"
      >
        <AnimatePresence mode="popLayout">
          {matchingCategory.map((product) => (
            <swiper-slide key={product._id}>
              <Product
                product={product}
                smallCard={true}
                userId={userId}
                wishlist={wishlist}
              />
            </swiper-slide>
          ))}
        </AnimatePresence>
      </swiper-container>
    </motion.div>
  );
};

export default ProductsFeed;
