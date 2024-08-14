import React from "react";
import { useCategory } from "../ProductsFeed/ProductsFeed";

const Products = ({ matchingCategory }) => {
  console.log(matchingCategory);
  return (
    <div>
      {matchingCategory.map((item) => {
        return <h1 key={item._id}>{item.name}</h1>;
      })}
    </div>
  );
};

export default Products;
