import { revalidatePath } from "next/cache";
import { client } from "../lib/client";
import { UAParser } from "ua-parser-js";

//Fetch products from Sanity client
export default async function getProducts() {
  const query = '*[_type=="product" && !(_id in path("drafts.**"))]';
  const products = await client.fetch(query);

  return products;
}

//Fetch single product from Sanity client
export async function getProduct(slug) {
  const query = `*[_type == "product" && !(_id in path("drafts.**")) && slug.current == $slug]`;
  const productData = await client.fetch(query, { slug });
  return productData;
}

export const isMobileDevice = (header) => {
  if (typeof process === "undefined") {
    throw new Error(
      "[Server method] you are importing a server-only module outside of server"
    );
  }

  const { get } = header;
  const ua = get("user-agent");

  const device = new UAParser(ua || "").getDevice();

  return device.type === "mobile";
};

export const getLocalStorageItem = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    try {
      return JSON.parse(storedValue);
    } catch (error) {
      console.error(`Error parsing local storage key "${key}":`, error);
      return defaultValue;
    }
  } else {
    return defaultValue;
  }
};

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const fetchWishlist = async (userId) => {
  try {
    // Providing base URL for NextJS because on SSR it does not have access to any URL data
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(
      `${baseUrl}/api/wishlist/get?userId=${userId}`,
      { next: { tags: "wishlist" } }
    );
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error while getting data: ", error);
  }
};

export const removeFromWishlist = async (userId, product_id, router) => {
  try {
    await fetch(`/api/wishlist/remove/${product_id}?userId=${userId}`, {
      method: "DELETE",
    });
    // This is to get refreshed data from GET request // SSR does not re-render component when data changes
    router.refresh();
  } catch (error) {
    console.error("Error removing from wishlist:", error);
  }
};

export const addToWishList = async (userId, product, router) => {
  console.log("Add to wishlist product test: ", product);
  try {
    const response = await fetch("/api/wishlist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        sanityId: product._id,
        productName: product.name,
        productImage: product.image[0].asset._ref,
        productDescription: product.name,
        productPrice: product.price,
        productRatings: product.ratings,
        productStars: product.stars,
      }),
    });
    console.log(response);

    // Check if response is OK
    if (!response.ok) {
      console.error(`Error: ${response.statusText}`);
      return;
    }
    const data = await response.json();
    console.log("Data from state context addToWishlist: ", data);
    // This is to get refreshed data from GET request // SSR does not re-render component when data changes
    router.refresh();
  } catch (error) {
    console.log(error);
  }
};

// Check if item is wishlisted to determine icon on product card
export const isItemInWishList = (wishlist, product) => {
  if (wishlist === "undefined") {
    return;
  }
  if (wishlist?.length > 0) {
    const matchingItem = wishlist.some(
      (item) => item.productName === product.name
    );
    return matchingItem;
  }
  return false; // Default return value if wishlist is empty
};

export const checkWindowWidth = (setter) => {
  const handleResize = () => {
    setter(window.innerWidth);
  };
  //Set initial window width
  handleResize();
  //Listen for window resize
  window.addEventListener("resize", handleResize);
  //Clean up effect
  return () => {
    window.removeEventListener("resize", handleResize);
  };
};

export const handleSessionUpdate = async (state, trigger, session) => {
  console.log("State in form: ", state);
  try {
    if (state.success) {
      await trigger({
        ...session,
        user: {
          ...session.user,
          name: state?.data.name,
          email: state?.data.email,
        },
      });
    }
  } catch (error) {
    console.log("Error in handleSessionUpdate: ", error);
  }
};
