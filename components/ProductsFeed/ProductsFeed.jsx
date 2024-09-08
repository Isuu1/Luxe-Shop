"use client";
import { AnimatePresence } from "framer-motion";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Product from "../ProductCard/Product";
import { useStateContext } from "@/context/StateContext";
import { motion } from "framer-motion";
import Products from "@/components/Products/Products";
import { usePathname, useRouter } from "next/navigation";
import AnimatedProduct from "@/components/AnimatedProduct/AnimateProduct";
import { productAnimation } from "@/styles/animations";
import LoginPrompt from "../LoginPrompt/LoginPrompt";

const ProductsFeed = ({ products, userId, wishlist }) => {
  const {
    category,
    sortingOptions,
    currentMaxPrice,
    currentMinPrice,
    selectedRating,
    setSelectedRating,
  } = useStateContext();

  const pathname = usePathname();

  const [filteredAndSortedProducts, setFilteredAndSortedProducts] =
    useState([]);

  // useEffect(() => {
  //   // Filter products by category
  //   let filteredProducts = products.filter(
  //     (product) =>
  //       product.category.includes(category) || category === "All"
  //   );

  //   // Filter products by price range
  //   filteredProducts = filteredProducts.filter(
  //     (product) =>
  //       product.price >= currentMinPrice &&
  //       product.price <= currentMaxPrice
  //   );

  //   // Filter products by rating
  //   filteredProducts = filteredProducts.filter((product) =>
  //     selectedRating.length > 0
  //       ? selectedRating.includes(Math.floor(product.stars))
  //       : true
  //   );

  //   // Sort products based on sortingOptions
  //   switch (sortingOptions) {
  //     case "Price - low to high":
  //       filteredProducts.sort((a, b) => a.price - b.price);
  //       break;
  //     case "Price - high to low":
  //       filteredProducts.sort((a, b) => b.price - a.price);
  //       break;
  //     case "Rating - low to high":
  //       filteredProducts.sort((a, b) => a.stars - b.stars);
  //       break;
  //     case "Rating - high to low":
  //       filteredProducts.sort((a, b) => b.stars - a.stars);
  //       break;
  //     default:
  //       // Default sorting: relevance or as is
  //       break;
  //   }

  //   // Update the state with filtered and sorted products
  //   setFilteredAndSortedProducts(filteredProducts);
  // }, [
  //   products,
  //   category,
  //   currentMinPrice,
  //   currentMaxPrice,
  //   selectedRating,
  //   sortingOptions,
  // ]);

  // console.log(
  //   "filteredAndSortedProducts: ",
  //   filteredAndSortedProducts
  // );

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
