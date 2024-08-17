"use client";
import Image from "next/image";
import React, { useState } from "react";
import { urlFor } from "../../../lib/client";

const ProductImages = ({ product, children }) => {
  const { image } = product[0];

  const [imageIndex, setImageIndex] = useState(0);

  return (
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
  );
};

export default ProductImages;
