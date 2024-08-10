"use client";
import React from "react";
import { useStateContext } from "../../context/StateContext";
import { useMotionValueEvent, useScroll } from "framer-motion";

//Icons
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaHeadphones } from "react-icons/fa";
import { MdOutlineSmartphone } from "react-icons/md";
import { IoMdWatch } from "react-icons/io";

const CategorySelector = () => {
  const { category, setCategory } = useStateContext();

  // //Handling navbar top animation
  // const { scrollY } = useScroll();
  // // mobile === false && { container: ref }
  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   const navbarTop = document.getElementById("category-selector");
  //   console.log(latest);

  //   if (latest >= 100) {
  //     navbarTop.classList.add("category-bar-transition");
  //   }
  //   // else {
  //   //   navbarTop.classList.remove(" ");
  //   // }
  // });

  return (
    <div className="category-selector" id="category-selector">
      <button
        className={`category-selector__button ${
          category === "All" ? "selected-cat" : ""
        }`}
        onClick={() => setCategory("All")}
      >
        <div className="flex-center">
          <BiSolidCategoryAlt style={{ fontSize: "1.5rem" }} />
          All
        </div>
      </button>
      <button
        className={`category-selector__button ${
          category === "Headphones" ? "selected-cat" : ""
        }`}
        onClick={() => setCategory("Headphones")}
      >
        <div className="flex-center">
          <FaHeadphones style={{ fontSize: "1.5rem" }} />
          Headphones
        </div>
      </button>
      <button
        className={`category-selector__button ${
          category === "Smartphones" ? "selected-cat" : ""
        }`}
        onClick={() => setCategory("Smartphones")}
      >
        <div className="flex-center">
          <MdOutlineSmartphone style={{ fontSize: "1.5rem" }} />
          Smartphones
        </div>
      </button>
      <button
        className={`category-selector__button ${
          category === "Smartwatches" ? "selected-cat" : ""
        }`}
        onClick={() => setCategory("Smartwatches")}
      >
        <div className="flex-center">
          <IoMdWatch style={{ fontSize: "1.5rem" }} />
          Smartwatches
        </div>
      </button>
    </div>
  );
};

export default CategorySelector;
