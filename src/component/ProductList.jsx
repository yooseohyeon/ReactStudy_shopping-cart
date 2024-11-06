import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const { products } = useContext(CartContext);

  return (
    <ul>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} /> // product 객체를 props로 전달
      ))}
    </ul>
  );
}
