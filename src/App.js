import React, { useState } from "react";
import SelectAllCheckbox from "./component/SelectAllCheckbox";
import ProductList from "./component/ProductList";
import TotalPrice from './component/TotalPrice';
import { productsData } from "./component/productsData";
import { GlobalStyles } from './styles/GlobalStyles';
import * as s from './styles/ProductStyles';

export default function App() {
  const [isCheckedList, setIsCheckedList] = useState(
    productsData.map(product => ({
      ...product,
      checked: true, // 기본값을 true로 설정 - 화면에 접속 시 전부 선택
      quantity: 1,   // 초기 수량 설정
    }))
  );
  
  const [totalPrice, setTotalPrice] = useState(
    isCheckedList.reduce((acc, product) => acc + product.price, 0)
  );

  const updateTotalPrice = (priceChange) => {
    setTotalPrice(prevTotal => prevTotal + priceChange);
  };
  
  // 전체 선택/해제 핸들러
  const toggleSelectAll = (isChecked) => {
    const allCheckedList = isCheckedList.map(product => ({
      ...product,
      checked: isChecked,
    }));

    setIsCheckedList(allCheckedList);
    
    // 전체 선택 시 총 가격 업데이트
    if (isChecked) {
      const total = allCheckedList.reduce((acc, product) => acc + product.price * product.quantity, 0);
      setTotalPrice(total);
    } else {
      // 전체 해제 시 총 가격을 0으로 설정
      setTotalPrice(0);
    }
  };
  
  // 개별 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (productId, isChecked) => {
    const updatedCheckedList = isCheckedList.map(product => {
      return product.id === productId 
        ? { ...product, checked: isChecked } 
        : product;
    });
  
    // 총 가격 업데이트
    const priceChange = updatedCheckedList.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setTotalPrice(priceChange);
    setIsCheckedList(updatedCheckedList);
  };
  
  // 수량 변경 핸들러
  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCheckedList = isCheckedList.map(product => {
      if (product.id === productId) {
        const priceChange = (newQuantity - product.quantity) * product.price; // 가격 변경 계산
        updateTotalPrice(priceChange); // 총 가격 업데이트
        return { ...product, quantity: newQuantity }; // 수량 업데이트
      }
      return product;
    });
    setIsCheckedList(updatedCheckedList);
  };

  const handleDeleteSelectedProducts = () => {
    const checkedProducts = isCheckedList.filter(product => product.checked);
    const confirmed = window.confirm(`선택한 ${checkedProducts.length}개의 상품을 장바구니에서 삭제하시겠습니까?`);
  
    if (confirmed) {
      // 체크된 상품 가격 총합 계산
      const priceToRemove = checkedProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0);
      
      // 체크된 상품 제외하고 업데이트
      const updatedProducts = isCheckedList.filter(product => !product.checked);
      
      // 체크된 상품 삭제 및 총 가격 업데이트
      setIsCheckedList(updatedProducts); // 체크된 상품 삭제
      setTotalPrice(prevTotal => prevTotal - priceToRemove); // 총 가격에서 삭제된 상품 가격 빼기
      
      // 남은 상품 모두 체크
      const newCheckedList = updatedProducts.map(product => ({ ...product, checked: true }));
      setIsCheckedList(newCheckedList); // 업데이트된 체크리스트 설정
  
      // 남은 상품의 총 가격을 재계산
      const newTotalPrice = newCheckedList.reduce((acc, product) => acc + (product.checked ? product.price * product.quantity : 0), 0);
      setTotalPrice(newTotalPrice); // 새 총 가격 설정
    }
  };
  
  console.log(isCheckedList)
  return (
    <React.StrictMode>
      <GlobalStyles />
      <h1>장바구니</h1>
      <s.ShoppingCartContainer>
          <s.ProductItemWrraper>
            <SelectAllCheckbox
              isCheckedList={isCheckedList}
              isChecked={isCheckedList.every(product => product.checked)}
              toggleSelectAll={toggleSelectAll}
              onDeleteSelectedProducts={handleDeleteSelectedProducts} 
            />
            <ProductList
              isCheckedList={isCheckedList}
              setIsCheckedList={setIsCheckedList}
              updateTotalPrice={updateTotalPrice}
              onCheckboxChange={handleCheckboxChange}
              onQuantityChange={handleQuantityChange} // 수량 변경 핸들러 전달
            />
          </s.ProductItemWrraper>
        <TotalPrice isCheckedList={isCheckedList} totalPrice={totalPrice} />
      </s.ShoppingCartContainer>
    </React.StrictMode>
  );
}
