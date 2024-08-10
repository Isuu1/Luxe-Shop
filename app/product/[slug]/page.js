import React from "react";
import { client, urlFor } from "../../../lib/client";
//Sanity library to display rich text fields

import Link from "next/link";

import ToggleSpecification from "../[slug]/ToggleSpecification";
import RelatedProducts from "../[slug]/RelatedProducts";
import ProductImages from "../[slug]/ProductImages";
import addToCart from "../[slug]/AddToCart";

//Icons
import { FaRegHeart } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";

import getProducts, {
  fetchWishlist,
  getProduct,
  isItemInWishList,
} from "../../../lib/utils";
import Reviews from "../../../components/Reviews/Reviews";
import Footer from "../../../components/Footer/Footer";
import BackButton from "@/components/BackButton/BackButton";
import AddToCart from "@/components/AddToCartButton/AddToCart";
import { getServerSession } from "next-auth";

import WishlistButton from "@/components/Buttons/WishlistButton/WishlistButton";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    slug: product.slug.current,
  }));
}

export default async function Page({ params }) {
  const { slug } = params;
  const query = `*[_type == "product" && !(_id in path("drafts.**")) && slug.current == $slug]`;
  const product = await client.fetch(query, { slug });

  const products = await getProducts();

  console.log("Product details SSR test :", product);

  // Find product category that is not 'All'
  const findCategory = product[0].category.find(
    (cat) => cat !== "All"
  );

  console.log("Product category: ", findCategory);

  const session = await getServerSession(options);
  console.log("Server session on product details: ", session);

  const wishlistData = await fetchWishlist(session.user.id);
  const wishlist = wishlistData?.wishlist;

  const itemWishlisted = isItemInWishList(wishlist, product);

  // console.log("Is this item wishlisted? ", itemWishlisted);

  console.log("Product on producty details: ", product);
  console.log("Wishlsit on producty details: ", wishlist);

  return (
    <section className="product-detail-container">
      <BackButton>{findCategory}</BackButton>
      <div style={{ position: "relative" }}>
        <ProductImages product={product} />

        <Reviews
          stars={product[0].stars}
          ratings={product[0].ratings}
          // cardSmall={true}
        />

        <WishlistButton
          product={product[0]}
          wishlist={wishlist}
          itemWishlisted={itemWishlisted}
        />
      </div>
      <div className="product-detail-container__details">
        <h2 className="product-detail-container__details__name">
          {product[0].name}
        </h2>
        <AddToCart product={product} />
        <div
          className="product-detail-container__details__desc"
          id="desc"
        >
          <p>{product[0].details}</p>
          <ToggleSpecification product={product} />
        </div>
      </div>
      <div className="product-detail-container__related">
        <h2 className="product-detail-container__related__headline">
          You may also like
        </h2>
        <div className="product-detail-container__related__slider">
          <RelatedProducts products={products} />
        </div>
      </div>
      <Footer />
    </section>
  );
}
