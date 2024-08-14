"use client";
import React from "react";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { productAnimation } from "@/styles/animations";

const AnimateProduct = forwardRef(function AnimateProduct(
  { children, smallCard },
  ref
) {
  return (
    <motion.div
      // className={`product-card ${smallCard && "small-card"}`}
      variants={productAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
      ref={ref}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { smallCard })
      )}
    </motion.div>
  );
});

export default AnimateProduct;
