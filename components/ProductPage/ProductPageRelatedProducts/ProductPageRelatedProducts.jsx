"use client";
import React from "react";

import Product from "../../ProductCard/Product";

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

const ProductPageRelatedProducts = ({ products }) => {
  return (
    <div className="related">
      <h2 className="related__headline">You may also like</h2>
      <div className="related__slider">
        <swiper-container
          slides-per-view="2"
          autoplay="true"
          css-mode="true"
          loop="true"
          space-between="10"
        >
          {products.map((item) => (
            <swiper-slide key={item._id}>
              <Product
                key={item._id}
                product={item}
                cardSmall={true}
              />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </div>
  );
};

export default ProductPageRelatedProducts;
