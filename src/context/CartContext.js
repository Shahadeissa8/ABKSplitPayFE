import React, { createContext, useState, useContext } from "react";
import {
  getItem,
  deleteItem,
  updateItem,
  addToCart as apiAddToCart,
} from "../api/CartAPI";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch the cart from backend
  const fetchCart = async () => {
    try {
      const items = await getItem();
      setCartItems(items);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  // Add or update item in cart via backend
  const addToCart = async (productId, quantity = 1) => {
    try {
      await apiAddToCart(productId, quantity);
      await fetchCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // Remove item from cart via backend
  const removeFromCart = async (productId) => {
    try {
      const itemToDelete = cartItems.find((item) => item.productId === productId);
      if (itemToDelete) {
        await deleteItem(itemToDelete.cartItemId);
        await fetchCart();
      }
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  // Update quantity via backend
  const updateQuantity = async (productId, change) => {
    try {
      const item = cartItems.find((item) => item.productId === productId);
      if (item) {
        const newQuantity = Math.max(1, item.quantity + change);
        await updateItem(item.cartItemId, {
          ...item,
          quantity: newQuantity,
        });
        await fetchCart();
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        fetchCart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};