"use client";
import Image from "next/image";
import React, { useState } from "react";
import { urlFor } from "../../../lib/client";
import { AnimatePresence } from "framer-motion";
import LoginPrompt from "@/components/LoginPrompt/LoginPrompt";
import { useStateContext } from "@/context/StateContext";

const ProductPageImages = ({ product, children }) => {
  const { image } = product[0];

  const { loginPromptOpen } = useStateContext();

  const [imageIndex, setImageIndex] = useState(0);

  return (
    <>
      <AnimatePresence mode="wait">
        {loginPromptOpen && <LoginPrompt />}
      </AnimatePresence>

      <div className="product-page-images">
        <Image
          src={urlFor(image[imageIndex]).toString()}
          alt=""
          fill
          className="product-page-images__main-image"
        />
        <div className="product-page-images__slides">
          {image.map((item, index) => (
            <Image
              src={urlFor(item).toString()}
              alt=""
              fill
              className={`product-page-images__slides__slide ${
                index === imageIndex ? "selected-slide" : ""
              }`}
              onMouseEnter={() => setImageIndex(index)}
              key={index}
            />
          ))}
        </div>
        {children}
      </div>
    </>
  );
};

export default ProductPageImages;
