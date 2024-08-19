import React, { Suspense } from "react";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";

//Components
import CategorySelector from "../components/CategorySelector/CategorySelector";
import Footer from "../components/Footer/Footer";
import BestsellersFeed from "../components/BestsellersFeed/BestsellersFeed";
import ProductsFeed from "../components/ProductsFeed/ProductsFeed";
import ProductFeed from "../components/ProductFeed/ProductFeed";
import Test from "@/components/Test";

//Functions
import getProducts, {
  // fetchWishlist,
  isMobileDevice,
} from "../lib/utils";
import { fetchWishlist } from "../lib/utils";

import { urlFor } from "@/lib/client";

//Icons
import { IoIosArrowForward } from "react-icons/io";
import { BiSolidSend } from "react-icons/bi";

import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Product from "@/components/ProductCard/Product";

export default async function Index() {
  const products = await getProducts();

  const session = await getServerSession(options);

  const mobile = isMobileDevice(headers());

  const wishlistData = await fetchWishlist(session.user.id);
  const wishlist = wishlistData?.wishlist;

  const matchingProducts = products.filter(
    (product) => product.stars >= 4
  );

  return (
    <div className="page" id="home-container">
      <div className="home-container__banner">
        <div className="home-container__banner__text">
          <h2 className="home-container__banner__text__title">
            Headphones on sale!
          </h2>
          <p className="home-container__banner__text__desc">
            Discount 50% for the first transaction
          </p>
          <button className="home-container__banner__text__button">
            Shop now <BiSolidSend />
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
      <BestsellersFeed>
        {matchingProducts?.map((product, index) => (
          <div className="embla__slide" key={index}>
            <Product
              product={product}
              userId={session.user.id}
              wishlist={wishlist}
            />
          </div>
        ))}
      </BestsellersFeed>

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
      <ProductsFeed
        products={products}
        userId={session.user.id}
        wishlist={wishlist}
      />
    </div>
  );
}
