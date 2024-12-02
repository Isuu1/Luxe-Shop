import React from "react";
import { headers } from "next/headers";
import Image from "next/image";

//Functions
import { fetchWishlist, isMobileDevice } from "@/lib/utils";

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

export default async function page() {
  const session = await auth();

  const wishlistData = await fetchWishlist(session.user.id);

  const wishlist = wishlistData.wishlist || [];

  return (
    <div className="page user-page">
      <BackButton>Wishlist</BackButton>

      <div className="wishlist-container">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
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
              <RemoveFromWishlistButton itemId={item.sanityId} />
            </div>
          ))
        ) : (
          <h2 className="wishlist-container__wishlist-empty">
            Your wishlist is empty
          </h2>
        )}
      </div>
    </div>
  );
}
