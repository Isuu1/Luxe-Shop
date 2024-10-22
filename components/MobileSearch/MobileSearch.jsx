"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

//Context
import { useStateContext } from "@/context/StateContext";

//Styles
import "./mobileSearch.scss";

//Animations
import { AnimatePresence, motion } from "framer-motion";
import {
  mobileSearchBarAnimation,
  opacityAnimation,
  searchBlur,
} from "@/styles/animations";

//Functions
import getProducts from "@/lib/utils";
import { urlFor } from "@/lib/client";

//Components
import WishlistButton from "../Buttons/WishlistButton/WishlistButton";

//Icons
import { RiSearchLine } from "react-icons/ri";
import BuyNowButton from "../Buttons/BuyNowButton/BuyNowButton";

const MobileSearch = () => {
  const { mobileSearchBarOpen, setMobileSearchBarOpen } =
    useStateContext();

  const [matchingProducts, setMatchingProducts] = useState([]);

  const [searchQuery, setSearchQuery] = useState(null);

  const [products, setProducts] = useState([]);

  //Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  //Close search bar
  const closeSearch = (e) => {
    e.preventDefault();
    setMatchingProducts([]);
    setSearchQuery(null);
    setMobileSearchBarOpen(false);
  };

  const clearInput = (e) => {
    e.stopPropagation();
    const input = document.getElementById(
      "mobile-search__form__input"
    );
    input.value = null;
    setSearchQuery(null);
    setMatchingProducts([]);
    input.focus();
  };

  //Focus on input when search bar is opened
  useEffect(() => {
    const input = document.getElementById(
      "mobile-search__form__input"
    );
    if (input) {
      input.focus();
    }
  }, []);

  //Handling matching products whenever input is changed
  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchQuery(inputValue);
    const productName = products.filter((product) => {
      return product.name.toLowerCase().includes(inputValue);
    });
    console.log("Product name: ", productName);
    setMatchingProducts(productName);
    if (!inputValue) {
      setMatchingProducts([]);
      setSearchQuery(null);
    }
  };

  //Close searchbar when user clicks anywhere on the page
  useEffect(() => {
    const input = document.getElementById(
      "mobile-search__form__input"
    );
    const handleWindowClick = (e) => {
      if (
        //if mobile search bar is open and user clicks outside of mobile-search
        mobileSearchBarOpen &&
        !e.target.closest(".mobile-search")
      ) {
        setMatchingProducts([]);
        setSearchQuery(null);
        setMobileSearchBarOpen(false);
        input.value = null;
      }
    };
    //Do not add event listener immediately to avoid closing search bar immediately
    const timeoutId = setTimeout(() => {
      window.addEventListener("click", handleWindowClick);
    }, 100);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("click", handleWindowClick);
    };
  }, [mobileSearchBarOpen, setMobileSearchBarOpen]);

  console.log("searchQuery:", searchQuery);
  console.log("matchingProducts:", matchingProducts);
  console.log("mobileSearchBarOpen:", mobileSearchBarOpen);

  return (
    <>
      <AnimatePresence mode="wait">
        {mobileSearchBarOpen && (
          <motion.div
            className="blur"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={searchBlur}
          ></motion.div>
        )}
      </AnimatePresence>
      <motion.div
        id="mobile-search"
        className="mobile-search"
        variants={mobileSearchBarAnimation}
        animate="visible"
        initial="hidden"
        exit="exit"
      >
        <form className="mobile-search__form">
          <RiSearchLine className="mobile-search__form__icon" />
          <label>
            <input
              type="text"
              placeholder="Search..."
              className="mobile-search__form__input"
              id="mobile-search__form__input"
              onChange={handleInputChange}
              autoComplete="off"
            />
          </label>
          <div>
            {searchQuery && (
              <button onClick={clearInput}>Clear</button>
            )}
            <button
              className="mobile-search__form__button"
              onClick={closeSearch}
            >
              X
            </button>
          </div>
        </form>
        {searchQuery && (
          <p className="mobile-search__results-count">
            {`${matchingProducts.length} results for `}
            <span className="bold">{searchQuery}</span>
          </p>
        )}

        {matchingProducts.length === 0 && searchQuery && (
          <motion.p
            className="mobile-search__not-found"
            variants={opacityAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            Could not find products matching your search criteria
          </motion.p>
        )}
        {matchingProducts.length !== 0 && (
          <ul className="mobile-search__results">
            {matchingProducts.map((item) => (
              <motion.li
                key={item._id}
                variants={opacityAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Link
                  href={`/product/${item.slug.current}`}
                  className="mobile-search__results__item"
                >
                  <Image
                    src={urlFor(item.image[0]).toString()}
                    className="mobile-search__results__item__thumbnail"
                    alt=""
                    fill
                  />
                  <div className="mobile-search__results__item__details">
                    <h3 className="mobile-search__results__item__details__title">
                      {/* {highlightMatch(item.name, searchQuery)} */}
                      {item.name}
                    </h3>
                    <p className="mobile-search__results__item__details__price">
                      £{item.price}
                    </p>
                  </div>
                  <div className="mobile-search__results__item__details__buttons">
                    <BuyNowButton product={item} />
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </>
  );
};

export default MobileSearch;
