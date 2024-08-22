import React from "react";
import getProducts, { fetchWishlist } from "../../lib/utils";

import CategorySelector from "../../components/CategorySelector/CategorySelector";

import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import BackButton from "@/components/BackButton/BackButton";

export default async function Page() {
  const products = await getProducts();

  const session = await getServerSession(options);

  const wishlistData = await fetchWishlist(session.user.id);
  const wishlist = wishlistData?.wishlist;

  return (
    <>
      <div className="page products-page-container">
        <BackButton>Products</BackButton>

        <CategorySelector />

        <div className="products-page-container__products">
          <ProductsFeed
            products={products}
            userId={session.user.id}
            wishlist={wishlist}
          />
        </div>
      </div>
    </>
  );
}
