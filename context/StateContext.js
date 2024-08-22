"use client";
import {
  fetchWishlist,
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/lib/utils";
import { useSession } from "next-auth/react";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import toast from "react-hot-toast";

const Context = createContext();

// const CategoryContext = createContext();

// export const useCategory = () => useContext(CategoryContext);

export const StateContext = ({ children }) => {
  // User shopping cart
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  // Searchbar visibility
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  // Current item category
  const [category, setCategory] = useState("All");

  // User wishlist in database
  const [wishlist, setWishlist] = useState([]);
  const [userModal, setUserModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Get user session

  const session = useSession();

  //Handling shopping bag in local storage
  useEffect(() => {
    // Get items from local storage providing default value if items are not there
    const initialCartItems = getLocalStorageItem("shoppingBag", []);
    const initialTotalQuantities = getLocalStorageItem("totalQty", 0);
    const initialTotalPrice = getLocalStorageItem("totalPrice", 0);

    // If the items exist in local storage assign them to current cartItems state
    if (initialCartItems.length !== 0) {
      setCartItems(initialCartItems);
      setTotalQuantities(initialTotalQuantities);
      setTotalPrice(initialTotalPrice);
    }
  }, []);

  useEffect(() => {
    if (cartItems.length !== 0) {
      setLocalStorageItem("shoppingBag", cartItems);
      setLocalStorageItem("totalQty", totalQuantities);
      setLocalStorageItem("totalPrice", totalPrice);
    }
  }, [cartItems]);

  // Adding item to cart taking product and it's quantity

  const addToCart = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    setTotalQuantities((prevQuantity) => prevQuantity + quantity);

    if (checkProductInCart) {
      //If you have product in cart and you choose to add the same product
      //this will just increase the quantiy and total price insetad
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === product._id)
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          };
        return cartItem;
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} x ${product.name} added to cart`, {
      position: "top-center",
      duration: 2000,
      style: { marginTop: "4rem" },
    });
    setQty(1);
  };

  // Removing cart item

  const removeItem = (product) => {
    let matchingProduct = cartItems.find(
      (item) => item._id === product._id
    );

    const newCardItems = cartItems.filter(
      (item) => item._id !== product._id
    );

    //New card items in remove function

    setTotalPrice(
      (prev) =>
        prev - matchingProduct.price * matchingProduct.quantity
    );
    setTotalQuantities((prev) => prev - matchingProduct.quantity);
    // localStorage.removeItem("shoppingBag", matchingProduct);
    setCartItems(newCardItems);
    localStorage.removeItem("shoppingBag", matchingProduct);
  };

  // Updating cart item quantity when you add item to cart that already exists

  const updateCartItemQuantity = (id, value) => {
    const matchingProductIndex = cartItems.findIndex(
      (product) => product._id === id
    );

    if (matchingProductIndex !== -1) {
      const updatedCartItems = [...cartItems];
      const matchingProduct = {
        ...updatedCartItems[matchingProductIndex],
      };

      if (value === "increment") {
        matchingProduct.quantity++;
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice + matchingProduct.price
        );
        setTotalQuantities((prev) => prev + 1);
      } else if (
        value === "decrement" &&
        matchingProduct.quantity > 1
      ) {
        matchingProduct.quantity--;
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice - matchingProduct.price
        );
        setTotalQuantities((prev) => prev - 1);
      }

      updatedCartItems[matchingProductIndex] = matchingProduct;
      setCartItems(updatedCartItems);
    }
  };

  const increaseQty = (e) => {
    e.stopPropagation();
    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQty = (e) => {
    e.stopPropagation();
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  // Handling wishlist logic

  // Fetching wishlist from database using userId
  // useEffect(() => {
  //   if (session.status !== "loading") {
  //     const wishListData = async () => {
  //       const data = await fetchWishlist(session.data.user.id);
  //       console.log("Fetching wishlist");
  //       setWishlist(data.wishlist);
  //       return wishListData;
  //     };
  //     wishListData();
  //   }
  // }, [session.status]);

  console.log("Wishlist: ", wishlist);

  // const addToWishList = async (userId, product) => {
  //   try {
  //     const response = await fetch("api/wishlist/add", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userId,
  //         sanityId: product._id,
  //         productName: product.name,
  //         productImage: product.image[0].asset._ref,
  //         productDescription: product.name,
  //         productPrice: product.price,
  //         productRatings: product.ratings,
  //         productStars: product.stars,
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log("Data from state context addToWishlist: ", data);
  //     // This is to get refreshed data from GET request // SSR does not re-render component when data changes
  //     router.refresh();
  //     // setWishlist([...wishlist, data.wishlistItem]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const router = useRouter();

  // const removeFromWishlist = async (id) => {
  //   try {
  //     await fetch(`/api/wishlist/remove/${id}`, {
  //       method: "DELETE",
  //     });
  //     // This is to get refreshed data from GET request // SSR does not re-render component when data changes
  //     router.refresh();
  //     // setWishlist(wishlist.filter((item) => item.sanityId !== id));
  //   } catch (error) {
  //     console.error("Error removing from wishlist:", error);
  //   }
  // };

  // const isInWishlist = (productName) => {
  //   const matchingItem = wishlist.some(
  //     (item) => item.name === productName
  //   );
  //   return matchingItem;
  // };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        showMenu,
        setShowMenu,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        increaseQty,
        decreaseQty,
        addToCart,
        updateCartItemQuantity,
        removeItem,
        searchBarOpen,
        setSearchBarOpen,
        category,
        setCategory,
        userModal,
        setUserModal,
        // fetchWishlist,
        // addToWishList,
        // removeFromWishlist,
        wishlist,
        // isInWishlist,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
