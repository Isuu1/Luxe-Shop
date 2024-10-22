import Image from "next/image";
import Link from "next/link";
import React from "react";

//Animations
import { motion } from "framer-motion";
import { opacityAnimation } from "@/styles/animations";

//Components
import BuyNowButton from "@/components/Buttons/BuyNowButton/BuyNowButton";

//Functions
import { urlFor } from "@/lib/client";

//Styles
import "./searchItem.scss";

const SearchItem = ({ item }) => {
  return (
    <motion.li
      key={item._id}
      variants={opacityAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Link href={`/product/${item.slug.current}`} className="item">
        <Image
          src={urlFor(item.image[0]).toString()}
          className="item__thumbnail"
          alt=""
          fill
        />
        <div className="item__details">
          <h3 className="item__details__title">
            {/* {highlightMatch(item.name, searchQuery)} */}
            {item.name}
          </h3>
          <p className="item__details__price">£{item.price}</p>
        </div>
        <div className="item__details__buttons">
          <BuyNowButton product={item} />
        </div>
      </Link>
    </motion.li>
  );
};

export default SearchItem;
