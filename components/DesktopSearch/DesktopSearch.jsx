"use client";
import React, { useEffect, useState } from "react";

//Icons
import { RiSearchLine } from "react-icons/ri";

//Functions
import getProducts from "../../lib/utils";

//Context
import { useStateContext } from "../../context/StateContext";

//Animations
import { AnimatePresence, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import {
  searchBlur,
  searchListAppear,
} from "../../styles/animations";

//Styles
import "./desktopSearch.scss";

//Components
import SearchItem from "../SearchItem/SearchItem";

const Search = () => {
  const [products, setProducts] = useState([]);

  const { desktopSearchBarOpen, setDesktopSearchBarOpen } =
    useStateContext();

  const [matchingProducts, setMatchingProducts] = useState([]);

  const [searchQuery, setSearchQuery] = useState(null);

  //Get scroll position
  const { scrollY } = useScroll();

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
    //Don't close search bar if user is at the top of the page

    const handleWindowClick = (event) => {
      if (scrollY.current < 65) {
        setMatchingProducts([]);
        input.value = null;
        setSearchQuery(null);
      }
      if (
        desktopSearchBarOpen &&
        !event.target.closest(".search-field") &&
        scrollY.current > 65
      ) {
        setDesktopSearchBarOpen(false);
        // setMatchingProducts([]);
        // setSearchQuery(null);
        // input.value = null;
      }
    };
    if (!desktopSearchBarOpen) {
      setMatchingProducts([]);
      input.value = null;
      setSearchQuery(null);
      input.disabled = true;
    } else {
      input.disabled = false;
    }
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [desktopSearchBarOpen, setDesktopSearchBarOpen, scrollY]);

  //Handling matching products whenever input is changed
  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchQuery(inputValue);
    const filteredProducts = products.filter((product) => {
      const productWords = product.name.toLowerCase().split(" ");
      console.log("Product words: ", productWords);
      const queryWords = inputValue.split(" ");

      return queryWords.every((queryWord, index) => {
        return (
          productWords[index] &&
          productWords[index].startsWith(queryWord)
        );
      });
    });

    console.log("Product name: ", filteredProducts);
    setMatchingProducts(filteredProducts);
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
  const handleSearchBar = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent immediate closing
    setDesktopSearchBarOpen(true);
  };

  //Open search bar when user clicks on search icon and add class to display full width
  // useEffect(() => {
  //   const formContainer = document.getElementById("search-form");
  //   if (desktopSearchBarOpen) {
  //     formContainer.classList.add("search-form-full-width");
  //   } else {
  //     formContainer.classList.remove("search-form-full-width");
  //   }
  // }, [desktopSearchBarOpen]);

  //Prevent form submitting
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  console.log("Desktop search bar open: ", desktopSearchBarOpen);

  return (
    <>
      {/* <AnimatePresence mode="wait">
        {desktopSearchBarOpen && (
          <motion.div
            className="blur"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={searchBlur}
          ></motion.div>
        )}
      </AnimatePresence> */}
      <div className="desktop-search" onClick={handleSearchBar}>
        <form
          className="desktop-search__form"
          id="search-form"
          onSubmit={handleFormSubmit}
          autoComplete="off"
        >
          <label className="desktop-search__form__label">
            <RiSearchLine
              className="desktop-search__form__label__icon"
              style={{
                color: desktopSearchBarOpen
                  ? "rgba(70, 7, 133, 1)"
                  : "#333",
              }}
            />
            <input
              id="search-input"
              type="input"
              className={`desktop-search__form__label__input-field ${
                !desktopSearchBarOpen ? "search-input-transition" : ""
              }`}
              placeholder="Search"
              onChange={handleInputChange}
            />
          </label>
        </form>
        <AnimatePresence mode="wait">
          {matchingProducts.length === 0 && searchQuery && (
            <p className="desktop-search__results">
              Not matching any products. Please try a different
              search.
            </p>
          )}
          {matchingProducts.length > 0 && (
            <motion.ul
              key="search-bar"
              className="desktop-search__results"
              variants={searchListAppear}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {matchingProducts.map((item) => (
                <SearchItem item={item} key={item._id} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Search;
