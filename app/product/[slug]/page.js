import React from "react";

//Components
import ProductPageImages from "@/components/ProductPage/ProductPageImages/ProductPageImages";
import ProductPageToggleSpecification from "../../../components/ProductPage/ProductPageToggleSpecification/ProductPageToggleSpecification";
import ProductPageRelatedProducts from "../../../components/ProductPage/ProductPageRelatedProducts/ProductPageRelatedProducts";
import Reviews from "../../../components/Reviews/Reviews";
import BackButton from "@/components/BackButton/BackButton";
import AddToCartButton from "@/components/Buttons/AddToCartButton/AddToCartButton";
import WishlistButton from "@/components/Buttons/WishlistButton/WishlistButton";

//Utils
import getProducts, {
  fetchWishlist,
  getProduct,
  isItemInWishList,
} from "../../../lib/utils";

//Authentication
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { auth } from "@/auth";

//Create params with product category
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug.current,
  }));
}

export default async function Page({ params }) {
  //Get product category from params
  const { slug } = params;

  const product = await getProduct(slug);

  const products = await getProducts();

  // Find product category that is not 'All'
  const findCategory = product[0].category.find(
    (cat) => cat !== "All"
  );

  const session = await auth();

  const wishlistData = session
    ? await fetchWishlist(session?.user.id)
    : [];
  const wishlist = wishlistData?.wishlist;

  const itemWishlisted = isItemInWishList(wishlist, product[0]);

  return (
    <section className="page product-detail-container">
      <BackButton>{findCategory}</BackButton>
      <div className="product-detail-container__wrapper">
        <ProductPageImages product={product}>
          <WishlistButton
            product={product[0]}
            itemWishlisted={itemWishlisted}
            userId={session?.user.id}
            onProductPage={true}
          />
        </ProductPageImages>

        <div className="product-detail-container__details">
          <h2 className="product-detail-container__details__name">
            {product[0].name}
          </h2>
          <h2 className="product-detail-container__details__price">
            £{product[0].price}
          </h2>
          <div className="product-detail-container__details__reviews-wrapper">
            <Reviews
              stars={product[0].stars}
              ratings={product[0].ratings}
            />
          </div>
          <div
            className="product-detail-container__details__desc"
            id="desc"
          >
            <p>{product[0].details}</p>
          </div>
          <div className="product-detail-container__details__add-to-cart-wrapper">
            <AddToCartButton product={product} />
            <WishlistButton
              product={product[0]}
              itemWishlisted={itemWishlisted}
              userId={session?.user.id}
              onProductPage={true}
            />
          </div>
        </div>
      </div>
      <ProductPageToggleSpecification product={product} />
      <ProductPageRelatedProducts products={products} />

      {/* <Footer /> */}
    </section>
  );
}
