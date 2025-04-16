// import React, { createContext, useState, useContext } from "react";

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const exists = prev.find((item) => item.productId === product.productId);
//       //   if (exists) {
//       //     // optional: increase quantity instead
//       //     return prev;
//       //   }
//       if (exists) {
//         // If it exists, increase quantity
//         return prev.map((item) =>
//           item.productId === product.productId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prev) => prev.filter((item) => item.productId !== productId));
//   };
//   const updateQuantity = (productId, change) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.productId === productId
//           ? { ...item, quantity: Math.max(1, item.quantity + change) }
//           : item
//       )
//     );
//   };
//   const clearCart = () => setCartItems([]);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         updateQuantity,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getItem,
  deleteItem,
  updateItem,
  addToCart as apiAddToCart,
} from "../api/CartAPI"; // adjust this path if needed

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

  // Load cart on app start
  useEffect(() => {
    fetchCart();
  }, []);

  // Add or update item in cart via backend
  const addToCart = async (productId, quantity = 1) => {
    try {
      await apiAddToCart(productId, quantity); // uses your smart logic (create or update)
      await fetchCart(); // update local state
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
    // Optional: delete all items from backend too if needed
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
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
