"use client";
import React, { useEffect, useState } from "react";
import Product from "../ProductCard/Product";
// Import Swiper styles
import "swiper/css";
import "swiper/scss/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import { useStateContext } from "@/context/StateContext";
import { fetchWishlist } from "@/lib/utils";
// register Swiper custom elements
register();

const Bestsellers = ({ products, userId, wishlist }) => {
  const [activeSlide, setActiveSlide] = useState(2);

  const matchingProducts = products.filter(
    (product) => product.stars >= 4
  );

  return (
    // <swiper-container
    //   key="bestsellers-swiper"
    //   // autoplay="true"
    //   slides-per-view="1"
    //   space-between="0.5rem"
    //   pagination="true"
    //   style={{
    //     "--swiper-pagination-color": "#600fb0",
    //     "--swiper-pagination-bullet-inactive-color": "#333",
    //     "--swiper-pagination-bullet-inactive-opacity": "1",
    //     "--swiper-pagination-bullet-size": "16px",
    //     "--swiper-pagination-bullet-horizontal-gap": "6px",
    //   }}
    // >
    //   {matchingProducts?.map((product, index) => (
    //     <swiper-slide key={index}>
    //       <Product product={product} />
    //     </swiper-slide>
    //   ))}
    // </swiper-container>
    <div className="home-container__bestsellers">
      {matchingProducts?.map((product, index) => (
        <div
          className="home-container__bestsellers__item"
          key={index}
        >
          <Product
            product={product}
            userId={userId}
            wishlist={wishlist}
            // isInWishlist={isInWishlist(product.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Bestsellers;
