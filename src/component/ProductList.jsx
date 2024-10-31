import React from "react";
import ProductItem from "./ProductItem";

export default function ProductList({ isCheckedList, setIsCheckedList, updateTotalPrice, onCheckboxChange, onQuantityChange }) {
  const handleDeleteProduct = (productId) => {
    const updatedProducts = isCheckedList.filter(product => product.id !== productId);
    setIsCheckedList(updatedProducts); // 상태 업데이트
  };

  return (
    <ul>
      {isCheckedList.map((product) => (
        <ProductItem
          key={product.id}
          productId={product.id}
          shop={product.shop}
          name={product.name}
          initialPrice={product.price}
          imgUrl={product.imgUrl}
          updateTotalPrice={updateTotalPrice}
          isChecked={product.checked} // 체크 상태
          onCheckboxChange={(isChecked) => onCheckboxChange(product.id, isChecked)} // productId 전달
          onDeleteProduct={() => handleDeleteProduct(product.id)} // productId 전달
          quantity={product.quantity} // 수량 전달
          onQuantityChange={onQuantityChange} // 수량 변경 핸들러 전달
        />
      ))}
    </ul>
  );
}
