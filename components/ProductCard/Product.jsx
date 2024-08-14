import React from "react";
import { urlFor } from "../../lib/client";

import Image from "next/image";
import Link from "next/link";

//Components

//Icons
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import { FaBagShopping } from "react-icons/fa6";

import { FaStar } from "react-icons/fa";

//Animations

import { useSession } from "next-auth/react";
import {
  addToWishList,
  isItemInWishList,
  removeFromWishlist,
} from "@/lib/utils";

import WishlistButton from "@/components/Buttons/WishlistButton/WishlistButton";
import AnimatedProduct from "@/components/AnimatedProduct/AnimateProduct";

//Forwarding ref to first JSX element to make popLayout animation working properly
const Product = ({
  product,
  smallCard,
  userId,
  wishlist,
  router,
}) => {
  // const { addToCart, qty } = useStateContext();

  // const buyNow = (e) => {
  //   e.preventDefault();
  //   addToCart(product, qty);
  // };

  const itemWishlisted = isItemInWishList(wishlist, product);

  console.log("product wishlsited: ", itemWishlisted);

  // const handleWishList = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (itemWishlisted) {
  //     console.log("Testing removing from wishlist case" + product.id);
  //     removeFromWishlist(product._id, router);
  //   } else {
  //     console.log("Testing add to wishlist case");
  //     addToWishList(userId, product, router);
  //   }
  // };

  return (
    <Link href={`/product/${product.slug.current}`}>
      <div className={`product-card ${smallCard && "small-card"}`}>
        <div style={{ position: "relative" }}>
          <button
            className="product-card__buy-now"
            //onClick={buyNow}
          >
            <FaBagShopping
              fontSize={smallCard ? "1.3rem" : "1.7rem"}
              color="#333"
            />
          </button>
          <Image
            src={urlFor(product.image && product.image[0]).toString()}
            fill
            className={`product-card__image ${
              smallCard && "small-card__image"
            }`}
            alt=""
            // might delete below later, just testing
            priority={true}
            // placeholder="empty"
          />
          <WishlistButton
            itemWishlisted={itemWishlisted}
            userId={userId}
            product={product}
          />
          {/* <button
          className="product-card__add-to-wishlist"
          // onClick={handleWishList}
        >
          {itemWishlisted ? (
            <FaHeart
              fontSize={smallCard ? "1.3rem" : "1.8rem"}
              style={{ fill: "red" }}
            />
          ) : (
            <FaRegHeart fontSize={smallCard ? "1.3rem" : "1.8rem"} />
          )}
        </button> */}
        </div>
        <div className="flex-center">
          <h3 className="product-card__price">£{product.price}</h3>
          <div className="product-card__reviews flex-center">
            <FaStar
              color="#fcf003"
              fontSize={smallCard ? "1rem" : "1.1rem"}
            />
            <p className="product-card__reviews__stars">
              {product.stars}
            </p>
          </div>
        </div>
        <p className="product-card__title">{product.name}</p>
      </div>
    </Link>
  );
};

export default Product;
