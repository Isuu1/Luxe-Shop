"use client";
import React from "react";

//Styles
import "./categorySelector.scss";

//Context
import { useStateContext } from "../../context/StateContext";

//Icons
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaHeadphones } from "react-icons/fa";
import { MdOutlineSmartphone } from "react-icons/md";
import { IoMdWatch } from "react-icons/io";
import { FaSliders } from "react-icons/fa6";

const CategorySelector = () => {
  const { category, setCategory, sortingOptions, setSortingOptions } =
    useStateContext();

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handleSorting = (e) => {
    setSortingOptions(e.target.value);
  };

  return (
    <>
      <div className="category-selector" id="category-selector">
        <label>
          <FaSliders style={{ fontSize: "1.3rem" }} />

          <select
            className="category-selector__sort"
            onChange={handleSorting}
          >
            <option value="Relevance">Relevance</option>
            <option value="PriceLowToHigh">
              Price - low to high
            </option>
            <option value="PriceHighToLow">
              Price - high to low
            </option>
            <option value="RatingLowToHigh">
              Rating - low to high
            </option>
            <option value="RatingHighToLow">
              Rating - high to low
            </option>
          </select>
        </label>
        <button
          className={`category-selector__button ${
            category === "All" ? "selected-cat" : ""
          }`}
          onClick={() => handleCategoryChange("All")}
        >
          <div className="flex-center">
            <BiSolidCategoryAlt style={{ fontSize: "1.3rem" }} />
            All
          </div>
        </button>
        <button
          className={`category-selector__button ${
            category === "Headphones" ? "selected-cat" : ""
          }`}
          onClick={() => handleCategoryChange("Headphones")}
        >
          <div className="flex-center">
            <FaHeadphones style={{ fontSize: "1.3rem" }} />
            Headphones
          </div>
        </button>
        <button
          className={`category-selector__button ${
            category === "Smartphones" ? "selected-cat" : ""
          }`}
          onClick={() => handleCategoryChange("Smartphones")}
        >
          <div className="flex-center">
            <MdOutlineSmartphone style={{ fontSize: "1.3rem" }} />
            Smartphones
          </div>
        </button>
        <button
          className={`category-selector__button ${
            category === "Smartwatches" ? "selected-cat" : ""
          }`}
          onClick={() => handleCategoryChange("Smartwatches")}
        >
          <div className="flex-center">
            <IoMdWatch style={{ fontSize: "1.3rem" }} />
            Smartwatches
          </div>
        </button>
      </div>
    </>
  );
};

export default CategorySelector;
