import React, { useState } from "react";
import SelectAllCheckbox from "./component/SelectAllCheckbox";
import ProductList from "./component/ProductList";
import TotalPrice from './component/TotalPrice';
import { productsData } from "./component/productsData";
import { GlobalStyles } from './styles/GlobalStyles';
import * as s from './styles/ProductStyles';

export default function App() {
  // 총 가격 계산
  const [totalPrice, setTotalPrice] = useState(
    productsData.reduce((acc, product) => acc + product.price, 0)
  );

  const updateTotalPrice = (priceChange) => {
    setTotalPrice(prevTotal => prevTotal + priceChange);
  };

  // 체크박스 체크 여부
  const [isCheckedList, setIsCheckedList] = useState(
    productsData.map(product => ({
      ...product,
      checked: true // 기본값을 true로 설정 - 화면에 접속 시 전부 선택
    }))
  );
  
  // 전체 선택/해제 핸들러
  const handleSelectAll = (isChecked) => {
    const allCheckedList = isCheckedList.map(product => ({
      ...product,
      checked: isChecked,
    }));
    
    setIsCheckedList(allCheckedList);
  };
  
  // 개별 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (index, isChecked) => {
    const updatedCheckedList = [...isCheckedList];
    updatedCheckedList[index].checked = isChecked;
    setIsCheckedList(updatedCheckedList);
  };
  
  const checkedCount = isCheckedList.filter(product => product.checked).length;

  // 상품 삭제 핸들러
  const handleDeleteProduct = (productId) => {
    setIsCheckedList(prevProducts => prevProducts.filter(product => product.id !== productId));
  };

  return (
    <React.StrictMode>
      <GlobalStyles />
      <h1>장바구니</h1>
      <s.ShoppingCartContainer>
          <s.ProductItemWrraper>
            <SelectAllCheckbox
              isChecked={isCheckedList.every(product => product.checked)}
              setIsChecked={handleSelectAll}
              isCheckedList={isCheckedList}
              checkedCount={checkedCount}
              productsData={productsData}
            />
            <ProductList
              productsData={productsData}
              updateTotalPrice={updateTotalPrice}
              isCheckedList={isCheckedList}
              onCheckboxChange={handleCheckboxChange}
              onDeleteProduct={handleDeleteProduct}
            />
          </s.ProductItemWrraper>
        <TotalPrice totalPrice={totalPrice} checkedCount={checkedCount} />
      </s.ShoppingCartContainer>
    </React.StrictMode>
  );
}