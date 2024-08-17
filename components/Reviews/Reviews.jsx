"use client";
import React, { useState } from "react";

//Icons
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const Reviews = ({ stars, ratings }) => {
  const roundedRating = Math.round(stars * 2) / 2;

  // Determine the integer and half-star part
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  const starsElements = Array.from({ length: 5 }, (_, index) => {
    if (index < fullStars) {
      console.log("Full star to render!");
      return (
        <span key={index} className="reviews-container__star">
          <FaStar color="#f27012" fontSize="1.7rem" />
        </span>
      ); // Render an filled star
    } else if (index === fullStars && hasHalfStar) {
      console.log("Half star to render!");
      return (
        <span key={index} className="reviews-container__star">
          <FaStarHalfAlt color="#f27012" fontSize="1.7rem" />
        </span>
      ); // Render a half-filled star
    } else {
      return (
        <span key={index} className="reviews-container__star">
          <FaRegStar fontSize="1.7rem" color="#f27012" />
        </span>
      ); // Render an empty star
    }
  });

  return (
    <div className="reviews-container">
      {starsElements}
      <span className="reviews-container__qty">{ratings}</span>
    </div>
  );
};

export default Reviews;
