// src/components/ProductCard.jsx
import React from "react";
import { addToCart } from "../CartComponents/ProductCard";

const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      await addToCart(product.productId, 1); // You can change the quantity if needed
      alert("Added to cart!");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="product-card">
      <img src={product.pictureUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} USD</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
