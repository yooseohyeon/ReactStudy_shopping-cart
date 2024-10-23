import React from "react";
import CartProduct from "./ProductItem";
import ProductItem from "./ProductItem";

export default function ProductList({ productsData, updateTotalPrice, isCheckedList, onCheckboxChange }) {
  return (
    <ul>
        <li>
            {productsData.map((product, index) => (
                <ProductItem
                    key={product.id}
                    productId={product.id} // ProductItem에 전달
                    shop={product.shop}
                    name={product.name}
                    initialPrice={product.price}
                    imgUrl={product.imgUrl}
                    updateTotalPrice={updateTotalPrice}
                    isChecked={isCheckedList[index]} // 개별 체크 상태 전달
                    onCheckboxChange={onCheckboxChange} // 체크박스 상태 변경 처리
                />
            ))}
        </li>
    </ul>
  );
}