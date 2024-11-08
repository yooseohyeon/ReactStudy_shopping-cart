import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext'
import styled from 'styled-components';

export const StyledQuantityButton = styled.button`
  padding: 0 5px 0 5px;
  width: 35px;
  height: 100%;
  background-color: transparent;

  &:first-of-type {
    border-right: 1px solid #ccc;
  }

  &:last-of-type {
    border-left: 1px solid #ccc;
  }

  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'inherit' : '#eee')}; 
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }

  &:disabled {
    svg {
      fill: #ccc;
    }
}
`;

export const QuantityButtonIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: #282828;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`

export default function QuantityButton({ selectedItemID, delta, quantity }) {
  const { handleQuantityChange } = useContext(CartContext);

  const handleClick = () => {
    const newQuantity = Math.max(quantity + delta, 1);
    handleQuantityChange(selectedItemID, newQuantity); 
  };

  return (
    <StyledQuantityButton 
      onClick={handleClick} 
      disabled={quantity <= 1 && delta < 0}
      aria-label={delta < 0 ? `수량 ${quantity}에서 1 감소` : `수량 ${quantity}에서 1 증가`}
      aria-controls={`${parseInt(selectedItemID, 10) + 1}-quantity-input`} 
      // 이 버튼이 id="quantity-input"인 StyledQuantityInput 요소를 제어함을 알려줌
    >
      {delta < 0 ? (
        <QuantityButtonIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 -750 960 960">
          <path d="M288-144v-72h384v72H288Z" />
        </QuantityButtonIcon>
      ) : (
        <QuantityButtonIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 -1000 960 960">
          <path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" />
        </QuantityButtonIcon>
      )}
    </StyledQuantityButton>
  );
}