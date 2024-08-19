"use client";
import React from "react";

import Product from "../../ProductCard/Product";

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import EmblaCarouselContainer from "@/components/EmblaCarouselContainer/EmblaCarouselContainer";
// register Swiper custom elements
register();

const ProductPageRelatedProducts = ({ products }) => {
  return (
    <div className="related">
      <h2 className="related__headline">You may also like</h2>
      <div className="related__slider">
        <EmblaCarouselContainer>
          {products.map((item) => (
            <div
              className="embla_slide related__slider__slide"
              key={item._id}
            >
              <Product product={item} smallCard={true} />
            </div>
          ))}
        </EmblaCarouselContainer>
      </div>
    </div>
  );
};

export default ProductPageRelatedProducts;
