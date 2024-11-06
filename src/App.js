import React, { useState } from "react";
import SelectControls from "./component/SelectControls";
import ProductList from "./component/ProductList";
import EmptyCartNotice from "./component/EmptyCartNotice"
import TotalPrice from './component/TotalPrice';
import { productsData } from "./component/productsData";
import { GlobalStyles } from './styles/GlobalStyles';
import { calculateTotalPrice } from './utils/calculateTotalPrice';
import * as s from './styles/ProductStyles';

export default function App() {
  const [products, setProducts] = useState(
    productsData.map(product => ({
      ...product,
      checked: true, // 자동으로 모든 상품 선택된 상태
      quantity: 1,  
    }))
  );

  // 수량과 체크박스 상태가 변할 때마다 총 가격도 다시 계산해야 하는데, 이를 calculateTotalPrice 함수로 추출하여 코드를 간결하게 함
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
    /*
    수량이 변경될 때, 개별 가격 변동을 일일이 계산하고 이후 수량을 업데이트하는 방식에서 
    수량을 우선 업데이트한 다음에 변경된 products 배열을 순회하면서 총 가격을 한 번만 계산하는 방식으로 바꿈
    */
    const updatedProducts = products.map(product =>
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );
    setProducts(updatedProducts);
    setTotalPrice(calculateTotalPrice(updatedProducts));
  };

  return (
    <React.StrictMode>
      <GlobalStyles />
      <h1>장바구니</h1>
      <s.ShoppingCartContainer>
          <s.ProductItemWrraper>
            <SelectControls
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