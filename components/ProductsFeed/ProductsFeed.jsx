"use client";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

//Animations
import { productAnimation } from "@/styles/animations";

//Context
import { useStateContext } from "@/context/StateContext";

//Components
import Product from "../ProductCard/Product";

//Styles
import "./productsFeed.scss";

const ProductsFeed = ({ products, userId, wishlist }) => {
  const {
    category,
    sortingOptions,
    currentMaxPrice,
    currentMinPrice,
    selectedRating,
  } = useStateContext();

  const pathname = usePathname();

  //Sort products by category
  const matchingCategory = products.filter((product) =>
    product.category.find((cat) => cat === category)
  );

  //Sort products by price
  const filteredByPrice = matchingCategory.filter((product) => {
    return (
      product.price >= currentMinPrice &&
      product.price <= currentMaxPrice
    );
  });

  const filteredByRating = filteredByPrice.filter((product) => {
    // Check if rating is in selected ratings array // all includes by default
    return selectedRating.includes(product.stars); // Check if product.stars matches any selected rating
  });

  //Sorted products by price and rating
  const sortedProducts =
    //Ignore price filtering on home page
    pathname === "/products"
      ? //Products page array with filters
        [...filteredByRating].sort((min, max) => {
          switch (sortingOptions) {
            case "PriceLowToHigh":
              return min.price - max.price;
            case "PriceHighToLow":
              return max.price - min.price;
            case "RatingLowToHigh":
              return min.stars - max.stars;
            case "RatingHighToLow":
              return max.stars - min.stars;
            default:
              "Relevance";
              break;
          }
        })
      : //Home page without filters
        [...matchingCategory].sort((min, max) => {
          switch (sortingOptions) {
            case "PriceLowToHigh":
              return min.price - max.price;
            case "PriceHighToLow":
              return max.price - min.price;
            case "RatingLowToHigh":
              return min.stars - max.stars;
            case "RatingHighToLow":
              return max.stars - min.stars;
            default:
              "Relevance";
              break;
          }
        });

  return (
    <>
      {filteredByRating.length === 0 &&
        // When no products in filteredByRating array
        pathname === "/products" && (
          <div className="products-container__no-matching">
            <h1>No products matching this criteraia</h1>
          </div>
        )}
      <motion.div
        className="products-container"
        id="products-container"
      >
        <AnimatePresence mode="popLayout">
          {sortedProducts.map((product) => (
            <motion.div
              key={product._id}
              variants={productAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Product
                product={product}
                smallCard={true}
                userId={userId}
                wishlist={wishlist}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default ProductsFeed;
