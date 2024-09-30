import React from "react";
import Image from "next/image";
import Link from "next/link";

//Components
import BuyNowButton from "@/components/Buttons/BuyNowButton/BuyNowButton";
import WishlistButton from "@/components/Buttons/WishlistButton/WishlistButton";

//Icons
import { FaStar } from "react-icons/fa";

//Utils
import { isItemInWishList } from "@/lib/utils";
import { urlFor } from "@/lib/client";

//Styles
import "./product.scss";

const Product = ({ product, smallCard, userId, wishlist }) => {
  const itemWishlisted = isItemInWishList(wishlist, product);

  return (
    <Link href={`/product/${product.slug.current}`}>
      <div className={`product-card ${smallCard && "small-card"}`}>
        <div style={{ position: "relative" }}>
          <BuyNowButton smallCard={smallCard} product={product} />
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
