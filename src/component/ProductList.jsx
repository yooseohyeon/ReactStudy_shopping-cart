import React from "react";
import ProductItem from "./ProductItem";

export default function ProductList({ productsData, updateTotalPrice, isCheckedList, onCheckboxChange, onDeleteProduct }) {
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
                    isChecked={isCheckedList[index].checked} // 개별 체크 상태 전달
                    onCheckboxChange={(isChecked) => onCheckboxChange(index, isChecked)} 
                    onDeleteProduct={onDeleteProduct} // 삭제 함수 전달
                />
            ))}
        </li>
    </ul>
  );
}