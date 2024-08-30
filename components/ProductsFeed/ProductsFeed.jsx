"use client";
import { AnimatePresence } from "framer-motion";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Product from "../ProductCard/Product";
import { useStateContext } from "@/context/StateContext";
import { motion } from "framer-motion";
import Products from "@/components/Products/Products";
import { useRouter } from "next/navigation";
import AnimatedProduct from "@/components/AnimatedProduct/AnimateProduct";
import { productAnimation } from "@/styles/animations";
import LoginPrompt from "../LoginPrompt/LoginPrompt";
import LoginModal from "@/components/LoginModal/LoginModal";

const ProductsFeed = ({ products, userId, wishlist }) => {
  const { category } = useStateContext();

  const matchingCategory = products.filter((product) =>
    product.category.find((cat) => cat === category)
  );

  return (
    <>
      <motion.div
        className="home-container__products"
        id="products-container"
      >
        <AnimatePresence mode="popLayout">
          {matchingCategory.map((product) => (
            // <AnimatedProduct key={product._id} smallCard={true}>
            <motion.div
              key={product._id}
              variants={productAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              // ref={ref}
            >
              <Product
                product={product}
                smallCard={true}
                userId={userId}
                wishlist={wishlist}
              />
            </motion.div>
            // </AnimatedProduct>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default ProductsFeed;
