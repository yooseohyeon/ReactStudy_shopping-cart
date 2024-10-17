import { useState, useEffect, useRef } from 'react';
import * as s from '../styles/ProductStyles';

export default function Product({ shop, name, initialPrice, imgUrl, updateTotalPrice }) {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(initialPrice);
  const quantityRef = useRef(null);

  useEffect(() => {
    const newPrice = quantity * initialPrice; // 새로운 가격 계산
    setPrice(newPrice); // 가격 업데이트
    updateTotalPrice(newPrice); // 총 가격 업데이트
  }, [quantity]);

  const changeQuantity = (delta) => {
    const currentQuantity = parseInt(quantityRef.current.value, 10) || 1; // 입력 필드 값 숫자로 변환
    const newQuantity = Math.max(currentQuantity + delta, 1);
    quantityRef.current.value = newQuantity; 
    setQuantity(newQuantity); 
  };
  
  const handleInputBlur = (e) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);

    if (value === "" || value === "0") {
      alert("최소 수량은 1개입니다.");
      setQuantity(1);
      quantityRef.current.value = 1; // 입력 필드 업데이트
      return;
    }

    if (!isNaN(parsedValue)) {
      setQuantity(parsedValue); // 유효한 숫자일 경우 상태 업데이트
    }
  };
    

  return (
    <s.ProductContainer>
      <s.ProductCheckbox type="checkbox" />
      <s.ProductImg src={imgUrl} alt='' />
      <s.ProductInfo>
        <s.ProductShop>{shop}</s.ProductShop>
        <s.ProductName>{name}</s.ProductName>
        <s.ProductPrice>{price.toLocaleString('ko-KR')}원</s.ProductPrice>
        <s.QuantityButtonContainer>
          <s.QuantityButton onClick={() => changeQuantity(-1)} disabled={quantity <= 1}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -690 960 960" width="20px" fill="#282828">
              <path d="M288-144v-72h384v72H288Z"/>
            </svg>
          </s.QuantityButton>
          <s.QuantityInput type="number" defaultValue={quantity} ref={quantityRef} onBlur={handleInputBlur} />
          <s.QuantityButton onClick={() => changeQuantity(1)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#282828">
              <path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z"/>
            </svg>
          </s.QuantityButton>
        </s.QuantityButtonContainer>
      </s.ProductInfo>
    </s.ProductContainer>
  )
}