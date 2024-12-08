import React from "react";
import { headers } from "next/headers";
import Image from "next/image";

//Functions
import getProducts, { fetchWishlist } from "@/lib/utils";

//Components
import BackButton from "@/components/Buttons/BackButton/BackButton";
import RemoveFromWishlistButton from "@/components/Buttons/RemoveFromWishlistButton/RemoveFromWishlistButton";

//Authentication
import { auth } from "@/auth";

//Icons
import { FaStar } from "react-icons/fa";
import { urlFor } from "@/lib/client";

//Styles
import "./wishlist.scss";
import Link from "next/link";

export default async function page() {
  const session = await auth();
  const products = await getProducts();

  const wishlistData = await fetchWishlist(session.user.id);

  const wishlist = wishlistData.wishlist || [];

  const findLink = (id) => {
    const product = products.find((product) => product._id === id);
    return `/product/${product.slug.current}`;
  };

  return (
    <div className="page user-page">
      <BackButton>Wishlist</BackButton>

      <div className="wishlist-container">
        {wishlist.length > 0 ? (
          wishlist.map((item) => {
            const linkUrl = findLink(item.sanityId);
            return (
              <Link href={linkUrl} key={item.id}>
                <div className="wishlist-container__item" key={item.id}>
                  <Image
                    className="wishlist-container__item__image"
                    src={urlFor(item.productImage).toString()}
                    width={140}
                    height={140}
                    alt=""
                  />
                  <div className="wishlist-container__item__details">
                    <p className="wishlist-container__item__details__name">
                      {item.productName}
                    </p>
                    <div className="flex-center-space-between">
                      <p className="wishlist-container__item__details__price">
                        £{item.productPrice}
                      </p>
                      <div className="flex-center">
                        <FaStar color="#fcf003" fontSize={"1.1rem"} />
                        <p className="wishlist-container__item__details__stars">
                          {item.productStars}
                        </p>
                      </div>
                    </div>
                  </div>
                  <RemoveFromWishlistButton
                    userId={session.user.id}
                    itemId={item.sanityId}
                  />
                </div>
              </Link>
            );
          })
        ) : (
          <h2 className="wishlist-container__wishlist-empty">
            Your wishlist is empty
          </h2>
        )}
      </div>
    </div>
  );
}
