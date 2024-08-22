"use client";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/lib/utils";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

const Context = createContext();

export const CartContext = ({ children }) => {
  // User shopping cart
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

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

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCartContext = () => useContext(Context);
