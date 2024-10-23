import { useState, useEffect, useRef } from 'react';
import * as s from '../styles/ProductStyles';
import QuantityButton from './QuantityButton';
import QuantityInput from './QuantityInput';

export default function ProductItem({ shop, name, initialPrice, imgUrl, updateTotalPrice, productId, isChecked, onCheckboxChange }) {
  const [quantity, setQuantity] = useState(1);
  const quantityRef = useRef(null);

  const price = quantity * initialPrice; // 컴포넌트 안의 다른 state, prop를 통해 계산할 수 있으므로 price를 state로 선언하지않음
  
  const handleQuantityChange = (newQuantity) => {
    const priceChange = (newQuantity - quantity) * initialPrice; // 가격 차이를 계산
    setQuantity(newQuantity); // 수량 업데이트
    updateTotalPrice(priceChange); // 총 가격에 반영
  };

  const checkHandler = (e) => {
    onCheckboxChange(productId, e.target.checked); // 개별 체크박스 상태 변경
  };

  return (
      <s.ProductContainer>
        <s.ProductCheckbox 
          type="checkbox"
          id={`quantity-checkbox-${productId}`}
          aria-label="상품 선택"
          checked={isChecked} // 체크 상태 전달
          onChange={checkHandler} // 체크박스 상태 변경 처리
        />
        <s.ProductImg src={imgUrl} alt='' />
        <s.ProductInfo>
          <s.ProductShop>{shop}</s.ProductShop>
          <s.ProductName>{name}</s.ProductName>
          <s.ProductPrice>{price.toLocaleString('ko-KR')}원</s.ProductPrice>
          <s.QuantityButtonWrapper>
            <QuantityButton delta={-1} quantity={quantity} handleQuantityChange={handleQuantityChange} inputRef={quantityRef} />
            <QuantityInput productId={productId} ref={quantityRef} quantity={quantity} handleQuantityChange={handleQuantityChange} />
            <QuantityButton delta={1} handleQuantityChange={handleQuantityChange} inputRef={quantityRef} />
          </s.QuantityButtonWrapper>
        </s.ProductInfo>
      </s.ProductContainer>
  )
}