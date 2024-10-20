import React from "react";
import { QuantityButtonStyled } from '../styles/ProductStyles';

export default function QuantityButton({ delta, setQuantity, currentQuantity, quantityRef }) {
  const handleClick = () => {
    const currentQuantity = parseInt(quantityRef.current.value, 10) || 1; // 입력 필드 값 숫자로 변환
    const newQuantity = Math.max(currentQuantity + delta, 1);
    quantityRef.current.value = newQuantity; 
    setQuantity(newQuantity); 
  };

  return (
    <QuantityButtonStyled onClick={handleClick} disabled={currentQuantity <= 1 && delta < 0}>
      {delta < 0 ? (
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -690 960 960" width="20px" fill="#282828">
          <path d="M288-144v-72h384v72H288Z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#282828">
          <path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" />
        </svg>
      )}
    </QuantityButtonStyled>
  );
}
