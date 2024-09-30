"use client";
import React from "react";

//Context
import { useStateContext } from "@/context/StateContext";

//Icons
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const FiltersRatingSelector = ({ fullStars, halfStars, value }) => {
  const { setSelectedRating } = useStateContext();

  //Change rating when user click inputs
  const handleRatingChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedRating((prevRating) => {
      if (prevRating.includes(value)) {
        // Remove it (filter out the existing value)
        return prevRating.filter((rating) => rating !== value);
      } else {
        return [...prevRating, value];
      }
    });
  };

  const renderStars = () => {
    let stars = [];
    //Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar
          key={`Full star${i}`}
          className="filters-container__rating__item__icon"
        />
      );
    }
    //Render half stars
    for (let i = 0; i < halfStars; i++) {
      stars.push(
        <FaRegStar
          key={`Half star${i}`}
          className="filters-container__rating__item__icon"
        />
      );
    }
    return stars;
  };

  return (
    <label className="filters-container__rating__item">
      <input
        type="checkbox"
        value={value}
        defaultChecked
        onClick={handleRatingChange}
      />
      <span className="filters-container__rating__item__checkbox"></span>
      {renderStars()}
    </label>
  );
};

export default FiltersRatingSelector;
