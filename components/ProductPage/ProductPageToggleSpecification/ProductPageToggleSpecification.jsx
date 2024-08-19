"use client";
import React, { useState } from "react";
//Sanity library to display rich text fields
import BlockContent from "@sanity/block-content-to-react";

//Icons
import { TbArrowBigDownLinesFilled } from "react-icons/tb";
import { TbArrowBigUpLinesFilled } from "react-icons/tb";

//Animations
import { AnimatePresence, motion } from "framer-motion";

const ProductPageToggleSpecification = ({ product }) => {
  const [fullSpecificationOpen, setFullSpecificationOpen] =
    useState(false);

  return (
    <>
      <button
        onClick={() =>
          setFullSpecificationOpen(!fullSpecificationOpen)
        }
        className="product-page__show-specification"
      >
        {!fullSpecificationOpen
          ? "Full specification"
          : "Close specification"}
        {!fullSpecificationOpen ? (
          <TbArrowBigDownLinesFilled />
        ) : (
          <TbArrowBigUpLinesFilled />
        )}
      </button>
      <AnimatePresence mode="wait">
        {fullSpecificationOpen && (
          <motion.div
            className="product-page__specification"
            exit={{ maxHeight: 0, opacity: 0 }}
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: "1000px" }}
          >
            <BlockContent blocks={product[0].specification} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductPageToggleSpecification;
