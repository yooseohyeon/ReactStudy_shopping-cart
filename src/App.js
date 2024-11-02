import React, { useState } from "react";
import SelectAllCheckbox from "./component/SelectAllCheckbox";
import ProductList from "./component/ProductList";
import EmptyCartNotice from "./component/EmptyCartNotice"
import TotalPrice from './component/TotalPrice';
import { productsData } from "./component/productsData";
import { GlobalStyles } from './styles/GlobalStyles';
import { calculateTotalPrice } from './utils/calculateTotalPrice';
import * as s from './styles/ProductStyles';

export default function App() {
  // 여러 상품의 정보를 담는 배열이므로 이름을 isCheckedList에서 products로 직관적으로 변경함
  const [products, setProducts] = useState(
    productsData.map(product => ({
      ...product,
      checked: true, 
      // 모든 상품의 checked를 true로 설정해 처음 접속했을 때 모든 상품들이 자동으로 선택되어 있도록 했음
      quantity: 1,  
    }))
  );

  // 가격을 업데이트하는 로직이 여러 곳에서 반복되기 때문에, 이를 calculateTotalPrice 함수로 추출하여 코드를 간결하게 함
  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice(products));

  // 전체 선택/해제 핸들러
  const toggleSelectAll = (isChecked) => {
    // 개별 체크박스의 checked를 전체 선택 체크박스의 isChecked로 변환
    const updatedList = products.map(product => ({ ...product, checked: isChecked }));
    setProducts(updatedList);
    setTotalPrice(calculateTotalPrice(updatedList));
  }

  // 개별 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (productId, isChecked) => {
    const updatedCheckedList = products.map(product =>
      product.id === productId ? { ...product, checked: isChecked } : product
    );
    setProducts(updatedCheckedList);
    setTotalPrice(calculateTotalPrice(updatedCheckedList)); 
  };
  
  // 수량 변경 핸들러
  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCheckedList = products.map(product => {
      if (product.id === productId) {
        const priceChange = (newQuantity - product.quantity) * product.price; // 가격 변화 계산
        setTotalPrice(prevTotal => prevTotal + priceChange); // 가격 변화를 totalPrice에 업데이트
        return { ...product, quantity: newQuantity }; // quantity 업데이트
      }
      return product;
    });
    setProducts(updatedCheckedList);
  };

  return (
    <React.StrictMode>
      <GlobalStyles />
      <h1>장바구니</h1>
      <s.ShoppingCartContainer>
          <s.ProductItemWrraper>
            <SelectAllCheckbox
              isChecked={products.length > 0 && products.every(product => product.checked)}
              products={products}
              setProducts={setProducts}
              setTotalPrice={setTotalPrice}
              toggleSelectAll={toggleSelectAll}
            />
            {products.length > 0 ? (
              <ProductList
                products={products}
                setProducts={setProducts}
                setTotalPrice={setTotalPrice}
                onCheckboxChange={handleCheckboxChange}
                onQuantityChange={handleQuantityChange} 
              />
            ) : (
              <EmptyCartNotice />
            )}
          </s.ProductItemWrraper>
        <TotalPrice products={products} totalPrice={totalPrice} />
      </s.ShoppingCartContainer>
    </React.StrictMode>
  );
}