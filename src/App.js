import React, { useState } from "react";
import SelectAllCheckbox from "./component/SelectAllCheckbox";
import ProductList from "./component/ProductList";
import EmptyCartNotice from "./component/EmptyCartNotice"
import TotalPrice from './component/TotalPrice';
import { productsData } from "./component/productsData";
import { GlobalStyles } from './styles/GlobalStyles';
import * as s from './styles/ProductStyles';

export default function App() {
  const [isCheckedList, setIsCheckedList] = useState(
    productsData.map(product => ({
      ...product,
      checked: true, // 기본값을 true로 설정 - 화면에 접속 시 전부 선택
      quantity: 1,   // quantity를 다양한 컴포넌트에서 사용하기 때문에 공통 부모 컴포넌트로 끌어올림
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
    
    if (isChecked) {
      const total = allCheckedList.reduce((acc, product) => acc + product.price * product.quantity, 0);
      setTotalPrice(total);
    } else {
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

  // 선택한 상품만 삭제
  const handleDeleteSelectedProducts = () => {
    const checkedProducts = isCheckedList.filter(product => product.checked);
    const confirmed = window.confirm(`선택한 ${checkedProducts.length}개의 상품을 장바구니에서 삭제하시겠습니까?`);
  
    if (confirmed) {
      const priceToRemove = checkedProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0);
      const updatedProducts = isCheckedList.filter(product => !product.checked);
      
      setIsCheckedList(updatedProducts); // 체크된 상품 삭제
      setTotalPrice(prevTotal => prevTotal - priceToRemove); // 총 가격에서 삭제된 상품 가격 빼기
      
      // 삭제하지 않은 상품 체크
      const newCheckedList = updatedProducts.map(product => ({ ...product, checked: true })); 
      setIsCheckedList(newCheckedList);
  
      // 남은 상품의 총 가격을 재계산
      const newTotalPrice = newCheckedList.reduce((acc, product) => acc + (product.checked ? product.price * product.quantity : 0), 0);
      setTotalPrice(newTotalPrice); 
    }
  };

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
            {isCheckedList.length > 0 ? (
              <ProductList
                isCheckedList={isCheckedList}
                setIsCheckedList={setIsCheckedList}
                updateTotalPrice={updateTotalPrice}
                onCheckboxChange={handleCheckboxChange}
                onQuantityChange={handleQuantityChange} 
              />
            ) : (
              <EmptyCartNotice />
            )}
          </s.ProductItemWrraper>
        <TotalPrice isCheckedList={isCheckedList} totalPrice={totalPrice} />
      </s.ShoppingCartContainer>
    </React.StrictMode>
  );
}
