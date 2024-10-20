import { useState, useEffect, useRef } from 'react';
import * as s from '../styles/ProductStyles';
import QuantityButton from './QuantityButton';
import QuantityInput from './QuantityInput';

export default function ProductItem({ shop, name, initialPrice, imgUrl, updateTotalPrice, productId }) {
  const [quantity, setQuantity] = useState(1);
  const quantityRef = useRef(null);

  const price = quantity * initialPrice; // 컴포넌트 안의 다른 state, prop를 통해 계산할 수 있으므로 price를 state로 선언하지않음
  
  const handleQuantityChange = (newQuantity) => {
    const priceChange = (newQuantity - quantity) * initialPrice; // 가격 차이를 계산
    setQuantity(newQuantity); // 수량 업데이트
    updateTotalPrice(priceChange); // 총 가격에 반영
  };

  return (
    <s.ProductContainer>
      <s.ProductCheckbox type="checkbox" id={`quantity-chekbox-${productId}`} aria-label="상품 선택" />
      <s.ProductImg src={imgUrl} alt='' />
      <s.ProductInfo>
        <s.ProductShop>{shop}</s.ProductShop>
        <s.ProductName>{name}</s.ProductName>
        <s.ProductPrice>{price.toLocaleString('ko-KR')}원</s.ProductPrice>
        <s.QuantityButtonContainer>
          <QuantityButton delta={-1} quantity={quantity} handleQuantityChange={handleQuantityChange} inputRef={quantityRef} />
          <QuantityInput productId={productId} ref={quantityRef} quantity={quantity} handleQuantityChange={handleQuantityChange} />
          <QuantityButton delta={1} handleQuantityChange={handleQuantityChange} inputRef={quantityRef} />
        </s.QuantityButtonContainer>
      </s.ProductInfo>
    </s.ProductContainer>
  )
}