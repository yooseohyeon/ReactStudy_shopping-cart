import React, { createContext, useState } from 'react';
import { productsData } from "../component/productsData";
import { calculateTotalPrice } from '../utils/calculateTotalPrice';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState(
    productsData.map(product => ({
      ...product,
      checked: true,
      quantity: 1,
    }))
  );

  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice(products));

  // 전체 선택/해제 핸들러
  const handleToggleSelectAll = (isChecked) => {
    const updatedList = products.map(product => ({ ...product, checked: isChecked }));
    setProducts(updatedList);
    setTotalPrice(calculateTotalPrice(updatedList));
  }
  
  // 개별 체크박스 상태 변경 핸들러
  const handleToggleCheckbox = (selectedItemID, isChecked) => {
    const updatedCheckedList = products.map(product =>
      product.id === selectedItemID ? { ...product, checked: isChecked } : product
    );
    setProducts(updatedCheckedList);
    setTotalPrice(calculateTotalPrice(updatedCheckedList)); 
  };
    
  // 수량 변경 핸들러
  const handleQuantityChange = (selectedItemID, newQuantity) => {
    const updatedProducts = products.map(product =>
      product.id === selectedItemID ? { ...product, quantity: newQuantity } : product
    );
    setProducts(updatedProducts);
    setTotalPrice(calculateTotalPrice(updatedProducts));
  };

  return (
    <CartContext.Provider value={{
      products,
      setProducts,
      totalPrice,
      setTotalPrice,
      handleToggleSelectAll,
      handleToggleCheckbox,
      handleQuantityChange,
    }}>
      {children}
    </CartContext.Provider>
  );
};