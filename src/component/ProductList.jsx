import React from "react";
import ProductItem from "./ProductItem";

export default function ProductList({ products, setProducts, setTotalPrice, onCheckboxChange, onQuantityChange }) {
  return (
    <ul>
      <li>
        {products.map((product) => (
          <ProductItem
            products={products}
            setProducts={setProducts}
            key={product.id}
            productId={product.id}
            shop={product.shop}
            name={product.name}
            initialPrice={product.price}
            imgUrl={product.imgUrl}
            quantity={product.quantity} 
            isChecked={product.checked} 
            setTotalPrice={setTotalPrice}
            onCheckboxChange={(isChecked) => onCheckboxChange(product.id, isChecked)}
            onQuantityChange={onQuantityChange} 
          />
        ))}
      </li>
    </ul>
  );
}
