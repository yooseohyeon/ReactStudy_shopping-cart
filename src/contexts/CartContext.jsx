import React, { createContext, useState } from 'react';
import { productsData } from "../component/productsData";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 체크된 상품의 가격과 수량을 곱해 totalPrice를 계산하는 함수
  const calculateTotalPrice = (productList) => {
    return productList.reduce((acc, product) => {
      if (product.checked) {
        return acc + product.price * product.quantity;
      }
      return acc;
    }, 0);
  };
  
  const [products, setProducts] = useState(
    productsData.map(product => ({
      ...product,
      checked: true,
      quantity: 1,
    }))
  );

  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice(products));

  // products와 totalPrice를 업데이트하는 함수
  const updateProductsAndTotalPrice = (updatedProducts) => {
    setProducts(updatedProducts);
    setTotalPrice(calculateTotalPrice(updatedProducts));
  };

  // 전체 선택/해제 핸들러
  const handleToggleSelectAll = (isChecked) => {
    updateProductsAndTotalPrice(products.map(product => ({ ...product, checked: isChecked })));
  }
  
  // 개별 체크박스 상태 변경 핸들러
  const handleToggleCheckbox = (selectedItemID, isChecked) => {
    updateProductsAndTotalPrice(products.map(product =>
      product.id === selectedItemID ? { ...product, checked: isChecked } : product
    ));
  };
    
  // 수량 변경 핸들러
  const handleQuantityChange = (selectedItemID, newQuantity) => {
    updateProductsAndTotalPrice(products.map(product =>
      product.id === selectedItemID ? { ...product, quantity: newQuantity } : product
    ));
  };

  return (
    <CartContext.Provider value={{
      products,
      totalPrice,
      updateProductsAndTotalPrice,
      handleToggleSelectAll,
      handleToggleCheckbox,
      handleQuantityChange,
    }}>
      {children}
    </CartContext.Provider>
  );
};