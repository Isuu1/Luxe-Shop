import React from "react";
import { client } from "../../../lib/client";
//Sanity library to display rich text fields

//Components
import ProductPageImages from "@/components/ProductPage/ProductPageImages/ProductPageImages";
import ProductPageToggleSpecification from "../../../components/ProductPage/ProductPageToggleSpecification/ProductPageToggleSpecification";
import ProductPageRelatedProducts from "../../../components/ProductPage/ProductPageRelatedProducts/ProductPageRelatedProducts";
import Reviews from "../../../components/Reviews/Reviews";
// import Footer from "../../../components/Footer/Footer";
import BackButton from "@/components/BackButton/BackButton";
import AddToCartButton from "@/components/Buttons/AddToCartButton/AddToCartButton";

//Utils
import getProducts, {
  fetchWishlist,
  getProduct,
  isItemInWishList,
} from "../../../lib/utils";

import { getServerSession } from "next-auth";

import WishlistButton from "@/components/Buttons/WishlistButton/WishlistButton";
import { options } from "@/app/api/auth/[...nextauth]/options";

//Components

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug.current,
  }));
}

export default async function Page({ params }) {
  const { slug } = params;
  const product = await getProduct(slug);

  const products = await getProducts();

  // Find product category that is not 'All'
  const findCategory = product[0].category.find(
    (cat) => cat !== "All"
  );

  const session = await getServerSession(options);

  const wishlistData = await fetchWishlist(session.user.id);
  const wishlist = wishlistData?.wishlist;

  const itemWishlisted = isItemInWishList(wishlist, product[0]);

  return (
    <section className="product-detail-container">
      <BackButton>{findCategory}</BackButton>

      <ProductPageImages product={product}>
        <Reviews
          stars={product[0].stars}
          ratings={product[0].ratings}
        />

        <WishlistButton
          product={product[0]}
          itemWishlisted={itemWishlisted}
          userId={session.user.id}
          onProductPage={true}
        />
      </ProductPageImages>

      <div className="product-detail-container__details">
        <h2 className="product-detail-container__details__name">
          {product[0].name}
        </h2>
        <AddToCartButton product={product} />
        <div
          className="product-detail-container__details__desc"
          id="desc"
        >
          <p>{product[0].details}</p>
          <ProductPageToggleSpecification product={product} />
        </div>
      </div>

      <ProductPageRelatedProducts products={products} />

      {/* <Footer /> */}
    </section>
  );
}
