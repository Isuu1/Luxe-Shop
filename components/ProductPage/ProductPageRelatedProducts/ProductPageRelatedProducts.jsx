"use client";
import React from "react";

//Styles
import "./productPageRelatedProducts.scss";

//Components
import Product from "../../ProductCard/Product";
import EmblaCarouselContainer from "@/components/EmblaCarouselContainer/EmblaCarouselContainer";

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
