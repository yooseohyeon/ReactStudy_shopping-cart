import React from "react";
import ProductItem from "./ProductItem";

export default function ProductList({ isCheckedList, setIsCheckedList, updateTotalPrice, onCheckboxChange, onQuantityChange }) {
  const handleDeleteProduct = (productId) => {
    const updatedProducts = isCheckedList.filter(product => product.id !== productId);
    setIsCheckedList(updatedProducts);
  };

  return (
    <ul>
      <li>
        {isCheckedList.map((product) => (
          <ProductItem
            key={product.id}
            productId={product.id}
            shop={product.shop}
            name={product.name}
            initialPrice={product.price}
            imgUrl={product.imgUrl}
            quantity={product.quantity} 
            updateTotalPrice={updateTotalPrice}
            isChecked={product.checked} 
            onCheckboxChange={(isChecked) => onCheckboxChange(product.id, isChecked)} 
            onDeleteProduct={() => handleDeleteProduct(product.id)} 
            onQuantityChange={onQuantityChange} 
          />
        ))}
      </li>
    </ul>
  );
}
