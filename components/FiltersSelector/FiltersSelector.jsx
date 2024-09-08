"use client";
import React, { useEffect, useState } from "react";

import { useStateContext } from "@/context/StateContext";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

//Components
import FiltersRatingSelector from "@/components/FiltersRatingSelector/FiltersRatingSelector";

const FiltersSelector = ({ highestPrice, lowestPrice }) => {
  const {
    currentMaxPrice,
    setCurrentMaxPrice,
    currentMinPrice,
    setCurrentMinPrice,
  } = useStateContext();

  const [showFilters, setShowFilters] = useState(false);

  const [windowWidth, setWindowWidth] = useState(null);

  //After component is rendered set prices to avoid undefined values
  useEffect(() => {
    setCurrentMaxPrice(highestPrice);
    setCurrentMinPrice(lowestPrice);
  }, [
    highestPrice,
    lowestPrice,
    setCurrentMaxPrice,
    setCurrentMinPrice,
  ]);

  //Change price on slider indicator move
  const handlePriceChange = ([min, max]) => {
    setCurrentMinPrice(min);
    setCurrentMaxPrice(max);
  };

  //Reset price to default values
  const resetPriceFilter = () => {
    setCurrentMinPrice(lowestPrice);
    setCurrentMaxPrice(highestPrice);
  };

  //Update window with state while window width is changed
  useEffect(() => {
    const handleWindowWidth = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowWidth);
    return () =>
      window.removeEventListener("resize", handleWindowWidth);
  }, [windowWidth]);

  const mobileDevice = windowWidth < 768;

  useEffect(() => {
    if (!mobileDevice) {
      setShowFilters(true);
    } else {
      setShowFilters(false);
    }
  }, [mobileDevice]);

  console.log("Show filters? ", showFilters);
  console.log("Is it mobile? ", mobileDevice);

  const handleFilters = () => {
    setShowFilters(!showFilters);
  };

  // useEffect(() => {
  //   const filtersContainer = document.querySelector(
  //     ".filters-container"
  //   );
  //   console.log(filtersContainer);
  //   if (showFilters && mobileDevice) {
  //     filtersContainer.classList.add("position-absolute");
  //   } else {
  //     filtersContainer.classList.remove("position-absolute");
  //   }
  // }, [showFilters, mobileDevice]);

  return (
    <div className="filters-container">
      {!showFilters ? (
        <button
          className="filters-container__open-filters-button"
          onClick={handleFilters}
        >
          <p>Show filters</p>
        </button>
      ) : (
        <>
          {mobileDevice && (
            <button
              className="filters-container__open-filters-button"
              onClick={handleFilters}
            >
              <p>Hide filters</p>
            </button>
          )}

          <p className="bold filters-container__title">Filters</p>
          <div className="filters-container__price">
            <p className="bold">Price</p>
            <div className="filters-container__price__indicators">
              <p>£{currentMinPrice}</p>

              <p>£{currentMaxPrice}</p>
            </div>
            <Slider
              allowCross={false}
              range
              min={lowestPrice}
              max={highestPrice}
              onChange={handlePriceChange}
              value={[currentMinPrice, currentMaxPrice]}
            />
          </div>
          <button
            className="filters-container__clear-button"
            onClick={resetPriceFilter}
          >
            Reset price
          </button>
          <div className="filters-container__rating">
            <p className="bold">Rating</p>
            <FiltersRatingSelector
              value={5}
              fullStars={5}
              halfStars={0}
            />
            <FiltersRatingSelector
              value={4}
              fullStars={4}
              halfStars={1}
            />
            <FiltersRatingSelector
              value={3}
              fullStars={3}
              halfStars={2}
            />
            <FiltersRatingSelector
              value={2}
              fullStars={2}
              halfStars={3}
            />
            <FiltersRatingSelector
              value={1}
              fullStars={1}
              halfStars={4}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FiltersSelector;
