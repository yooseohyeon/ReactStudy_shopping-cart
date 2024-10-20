import React from "react";
import styled from 'styled-components';

const StyledQuantityButton = styled.button`
  padding: 0 5px 0 5px;
  width: 35px;
  height: 100%;
  background-color: #ffffff00;
  cursor: pointer;

  &:first-of-type {
    border-right: 1px solid #ccc;
  }

  &:last-of-type {
    border-left: 1px solid #ccc;
  }

  &:hover {
    background-color: #ddd;
  }
  
  &:disabled {
    svg {
      fill: #ccc;
    }

    &:hover {
      background-color: #fff; /* disabled일 때 hover 시에도 #fff로 고정 */
      cursor: not-allowed; /* 마우스 포인터를 변화 없음을 나타내는 것으로 변경 */
    }
`;


export default function QuantityButton({ delta, quantity, handleQuantityChange, inputRef }) {
  const handleClick = () => {
    const currentQuantity = parseInt(inputRef.current.value, 10) || 1; // 입력 필드 값 숫자로 변환
    const newQuantity = Math.max(currentQuantity + delta, 1);
    inputRef.current.value = newQuantity; 
    handleQuantityChange(newQuantity); 
  };

  return (
    <StyledQuantityButton 
      onClick={handleClick} 
      disabled={quantity <= 1 && delta < 0}
      aria-label={delta < 0 ? `수량 ${quantity}에서 1 감소` : `수량 ${quantity}에서 1 증가`}
      aria-controls="quantity-input" // 이 버튼이 id="quantity-input"인 StyledQuantityInput 요소를 제어함을 알려줌
    >
      {delta < 0 ? (
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -750 960 960" width="20px" fill="#282828">
          <path d="M288-144v-72h384v72H288Z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -1000 960 960" width="20px" fill="#282828">
          <path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" />
        </svg>
      )}
    </StyledQuantityButton>
  );
}
