import React from "react";

//Functions
import getProducts, { fetchWishlist } from "../../lib/utils";

//Authentication
import { auth } from "@/auth";

//Components
import FiltersSelector from "@/components/FiltersSelector/FiltersSelector";
import BackButton from "@/components/Buttons/BackButton/BackButton";
import CategorySelector from "../../components/CategorySelector/CategorySelector";
import ProductsFeed from "@/components/ProductsFeed/ProductsFeed";

//Styles
import "./products.scss";

export default async function Page() {
  const products = await getProducts();

  const session = await auth();

  const wishlistData =
    session && (await fetchWishlist(session?.user.id));
  const wishlist = wishlistData?.wishlist;

  const highestPrice = products.reduce((max, product) => {
    return product.price > max ? product.price : max;
  }, 0);

  const lowestPrice = products.reduce((min, product) => {
    return product.price < min ? product.price : min;
  }, products[0].price);

  return (
    <>
      <div className="page products-page-container">
        <BackButton>Products</BackButton>
        <div className="products-page-container__inner-wrapper">
          <FiltersSelector
            highestPrice={highestPrice}
            lowestPrice={lowestPrice}
          />
          <div>
            <CategorySelector />
            <div className="products-page-container__products">
              <ProductsFeed
                products={products}
                userId={session?.user.id}
                wishlist={wishlist}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
