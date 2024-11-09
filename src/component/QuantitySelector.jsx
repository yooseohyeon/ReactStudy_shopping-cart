import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext'
import QuantityButton from './QuantityButton';
import QuantityInput from './QuantityInput';
import styled from 'styled-components';

export const QuantitySelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  width: 115px;
  height: 35px;
  border: 1px solid #ccc;
`;

export default function QuantitySelector({ selectedItemID, quantity }) { 
  const [inputValue, setInputValue] = useState(quantity); // inputValue state를 통해 input 입력값 관리
  const { handleQuantityChange } = useContext(CartContext);

  // QuantityButton과 QuantityInput에서 중복되는 로직을 QuantitySelector로 옮겨 코드를 간결하게 함.
  const updateQuantity = (newQuantity) => {
    setInputValue(newQuantity);
    handleQuantityChange(selectedItemID, newQuantity);
  };
  
  return (
    <QuantitySelectorWrapper>
      <QuantityButton selectedItemID={selectedItemID} delta={-1} quantity={quantity} updateQuantity={updateQuantity} />
      <QuantityInput selectedItemID={selectedItemID} inputValue={inputValue} setInputValue={setInputValue} updateQuantity={updateQuantity} />
      <QuantityButton selectedItemID={selectedItemID} delta={1} quantity={quantity} updateQuantity={updateQuantity} />
    </QuantitySelectorWrapper>
  );
}