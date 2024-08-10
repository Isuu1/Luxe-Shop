import React from "react";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";

//Components
import CategorySelector from "../components/CategorySelector/CategorySelector";
import Footer from "../components/Footer/Footer";
import BestsellersFeed from "../components/BestsellersFeed/BestsellersFeed";
import ProductsFeed from "../components/ProductsFeed/ProductsFeed";

//Functions
import getProducts, {
  // fetchWishlist,
  isMobileDevice,
} from "../lib/utils";
import { fetchWishlist } from "../lib/utils";

import { urlFor } from "@/lib/client";

//Icons
import { IoIosArrowForward } from "react-icons/io";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Product from "@/components/ProductCard/Product";

export default async function Index() {
  const products = await getProducts();

  const session = await getServerSession(options);

  const mobile = isMobileDevice(headers());

  const wishlistData = await fetchWishlist(session.user.id);
  const wishlist = wishlistData?.wishlist;

  console.log("Main page: ", wishlist);

  const matchingProducts = products.filter(
    (product) => product.stars >= 4
  );

  return (
    <div
      className={`page ${!mobile && "desktop__home-container"}`}
      id="home-container"
    >
      <div className="home-container__banner">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <h2 className="home-container__banner__title">
            Headphones on sale!
          </h2>
          <p className="home-container__banner__desc">
            Discount 50% for the first transaction
          </p>
          <button className="home-container__banner__button">
            Shop now
          </button>
        </div>
        <Image
          src={urlFor(
            products[0].image && products[0].image[0]
          ).toString()}
          fill
          className="home-container__banner__image"
          alt=""
        />
      </div>
      <h2 className="home-container__headline">Bestsellers</h2>
      {/* <BestsellersFeed
        products={products}
        userId={session.user.id}
        wishlist={wishlist}
      /> */}
      <div className="home-container__bestsellers">
        {matchingProducts?.map((product, index) => (
          <div
            className="home-container__bestsellers__item"
            key={index}
          >
            <Product
              product={product}
              userId={session.user.id}
              wishlist={wishlist}
              // isInWishlist={isInWishlist(product.id)}
            />
          </div>
        ))}
      </div>

      <div className="flex-center">
        <h2 className="home-container__headline">Products</h2>
        <Link
          href="/products"
          className="home-container__headline__link"
        >
          <p>All</p>
          <IoIosArrowForward className="icon" />
        </Link>
      </div>
      <CategorySelector />
      {/* <ProductsFeed
        products={products}
        userId={session.user.id}
        wishlist={wishlist}
      /> */}
      <Footer />
    </div>
  );
}
