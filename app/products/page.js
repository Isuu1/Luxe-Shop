"use client";
import React, { useEffect, useState } from "react";
import getProducts from "../../lib/utils";
import { AnimatePresence } from "framer-motion";
import Product from "../../components/ProductCard/Product";
import CategorySelector from "../../components/CategorySelector/CategorySelector";
import { useStateContext } from "../../context/StateContext";
import "swiper/swiper-bundle.css"; // Import the Swiper styles

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import Footer from "../../components/Footer/Footer";

export default function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const { category } = useStateContext();

  return (
    <>
      <div className="products-page-container">
        <h1>Products</h1>

        <CategorySelector />

        <div className="products-page-container__products">
          <swiper-container
            slides-per-view="2"
            space-between="20"
            grid="true"
            grid-fill="row"
            grid-rows="2"
          >
            <AnimatePresence>
              {products.map(
                (product) =>
                  product.category.find(
                    (cat) => cat === category
                  ) && (
                    <swiper-slide key={product._id}>
                      <Product
                        product={product}
                        key={product._id}
                        cardSmall={true}
                      />
                    </swiper-slide>
                  )
              )}
            </AnimatePresence>
          </swiper-container>
        </div>
        <Footer />
      </div>
    </>
  );
}
