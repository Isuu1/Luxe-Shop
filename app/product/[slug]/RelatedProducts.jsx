"use client";
import React from "react";

import Product from "../../../components/ProductCard/Product";

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

const RelatedProducts = ({ products }) => {
  return (
    <swiper-container
      slides-per-view="2"
      autoplay="true"
      css-mode="true"
      loop="true"
      space-between="10"
    >
      {products.map((item) => (
        <swiper-slide key={item._id}>
          <Product key={item._id} product={item} cardSmall={true} />
        </swiper-slide>
      ))}
    </swiper-container>
  );
};

export default RelatedProducts;
