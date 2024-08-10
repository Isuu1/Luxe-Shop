"use client";
import Image from "next/image";
import React, { useState } from "react";
import { urlFor } from "../../../lib/client";

const ProductImages = ({ product }) => {
  const { image } = product[0];

  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div>
      <Image
        src={urlFor(image[imageIndex]).toString()}
        alt=""
        fill
        className="product-detail-container__image"
      />
      <div className="product-detail-container__slides">
        {image.map((item, index) => (
          <Image
            src={urlFor(item).toString()}
            alt=""
            fill
            className={`product-detail-container__slides__slide ${
              index === imageIndex ? "selected-slide" : ""
            }`}
            onMouseEnter={() => setImageIndex(index)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
