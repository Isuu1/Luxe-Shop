import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import { headers } from "next/headers";
import { fetchWishlist, isMobileDevice } from "@/lib/utils";
import BackButton from "@/components/Buttons/BackButton/BackButton";
import RemoveFromWishlistButton from "@/components/Buttons/RemoveFromWishlistButton/RemoveFromWishlistButton";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { auth } from "@/auth";

//Icons
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoHeartDislike } from "react-icons/io5";
import { urlFor } from "@/lib/client";

export default async function page() {
  const mobile = isMobileDevice(headers());

  const session = await auth();

  const wishlistData = await fetchWishlist(session.user.id);
  const wishlist = wishlistData.wishlist || [];

  return (
    <div
      className={`page user-page ${!mobile && "desktop__user-page"}`}
    >
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
