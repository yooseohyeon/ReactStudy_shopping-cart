import React, { useState } from "react";
import SelectAllCheckbox from "./component/SelectAllCheckbox";
import ProductList from "./component/ProductList";
import TotalPrice from './component/TotalPrice';
import { productsData } from "./component/productsData";
import { GlobalStyles } from './styles/GlobalStyles';

export default function App() {
  const [totalPrice, setTotalPrice] = useState(
    productsData.reduce((acc, product) => acc + product.price, 0)
  );

  const updateTotalPrice = (priceChange) => {
    setTotalPrice(prevTotal => prevTotal + priceChange);
  };

  const [isCheckedList, setIsCheckedList] = useState(
    Array(productsData.length).fill(false)
  );
  
  // 전체 선택 핸들러
  const handleSelectAll = (isChecked) => {
    setIsCheckedList(Array(productsData.length).fill(isChecked));
  };

  // 개별 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (index, isChecked) => {
    const updatedCheckedList = [...isCheckedList];
    updatedCheckedList[index] = isChecked;
    setIsCheckedList(updatedCheckedList);
  };

  return (
    <React.StrictMode>
      <GlobalStyles />
      <h1>장바구니</h1>
      <SelectAllCheckbox
       isChecked={isCheckedList.every((checked) => checked)}
        setIsChecked={handleSelectAll}
      />
      <ProductList
        productsData={productsData}
        updateTotalPrice={updateTotalPrice}
        isCheckedList={isCheckedList}
        onCheckboxChange={handleCheckboxChange}
      />
      <TotalPrice totalPrice={totalPrice} />
    </React.StrictMode>
  );
}