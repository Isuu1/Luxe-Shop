"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

//Icons
import { RiSearchLine } from "react-icons/ri";

//Functions
import { urlFor } from "../../lib/client";
import getProducts from "../../lib/utils";

//Context
import { useStateContext } from "../../context/StateContext";

//Animations
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import {
  searchBlur,
  searchListAppear,
} from "../../styles/animations";

//Styles
import "./desktopSearch.scss";

const Search = ({ navbarTopFullWidth }) => {
  const [products, setProducts] = useState([]);

  const { desktopSearchBarOpen, setDesktopSearchBarOpen } =
    useStateContext();

  const [matchingProducts, setMatchingProducts] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  //Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  console.log("SearchQuery:", searchQuery);
  console.log("Matching products: ", matchingProducts);

  //Close searchbar when user clicks anywhere on the page
  useEffect(() => {
    const input = document.getElementById("search-input");
    const handleWindowClick = (event) => {
      if (
        desktopSearchBarOpen &&
        !event.target.closest(".search-field")
      ) {
        setDesktopSearchBarOpen(false);
        setMatchingProducts([]);
        input.value = null;
      }
    };
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [desktopSearchBarOpen, setDesktopSearchBarOpen]);

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
    }
  };

  //Highlight matching letters
  const highlightMatch = (name, searchTerm) => {
    if (!searchTerm) {
      return null;
    }
    const regex = new RegExp(
      `(${searchTerm.split(" ").join("|")})`,
      "gi"
    );
    const parts = name.split(regex);
    console.log(parts);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  //Open search bar
  const handleSearchBar = (event) => {
    event.stopPropagation(); // Stop event propagation to prevent immediate closing
    setDesktopSearchBarOpen(true);
  };

  //Open search bar when user clicks on search icon and add class to display full width
  useEffect(() => {
    const formContainer = document.getElementById("search-form");
    if (desktopSearchBarOpen) {
      formContainer.classList.add("search-form-full-width");
    } else {
      formContainer.classList.remove("search-form-full-width");
    }
  }, [desktopSearchBarOpen]);

  //Close search bar when user clicks on a list element and clear input field
  const handleListElementClick = () => {
    const input = document.getElementById("search-input");
    setDesktopSearchBarOpen(false);
    setMatchingProducts([]);
    input.value = null;
  };

  //Prevent form submitting
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {desktopSearchBarOpen && (
          <motion.div
            className="blur"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={searchBlur}
          ></motion.div>
        )}
      </AnimatePresence>
      <form
        className="search-form"
        id="search-form"
        onSubmit={handleFormSubmit}
        autoComplete="off"
      >
        <AnimatePresence mode="wait">
          {desktopSearchBarOpen && (
            <motion.ul
              key="search-bar"
              className="search-field"
              variants={searchListAppear}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {matchingProducts.length === 0 && searchQuery && (
                <p>
                  Not matching any products. Please try a different
                  search.
                </p>
              )}
              {matchingProducts.map((item) => (
                <Link
                  href={`/product/${item.slug.current}`}
                  onClick={handleListElementClick}
                  key={item._id}
                >
                  <motion.li
                    className="search-field__item"
                    key={item._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Image
                      src={urlFor(item.image[0]).toString()}
                      className="search-field__item__thumbnail"
                      alt=""
                      fill
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5vh",
                      }}
                    >
                      <h3 className="search-field__item__title">
                        {highlightMatch(item.name, searchQuery)}
                      </h3>
                      <p className="search-field__item__price">
                        £{item.price}
                      </p>
                    </div>
                  </motion.li>
                </Link>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <label className="search-form__label">
          <RiSearchLine
            style={{
              fontSize: "1.7rem",
              transition: "all 0.5s",
              color: desktopSearchBarOpen
                ? "rgba(70, 7, 133, 1)"
                : "#333",
            }}
          />
          <input
            id="search-input"
            type="input"
            className={`search-form__label__input-field ${
              !navbarTopFullWidth && !desktopSearchBarOpen
                ? "search-input-transition"
                : ""
            }`}
            onClick={handleSearchBar}
            placeholder="Search"
            onChange={handleInputChange}
          />
        </label>
      </form>
    </>
  );
};

export default Search;
