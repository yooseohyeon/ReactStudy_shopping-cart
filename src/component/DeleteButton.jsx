import React, { useContext } from 'react';
import { CartContext } from "../contexts/CartContext";
import styled from 'styled-components';

export const DeleteSelectedButton = styled.button`
  font-size: 16px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: inherit;
  color: ${({ disabled }) => (disabled ? '#bbb' : 'inherit')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'inherit' : '#eee')}; // disabled일 때는 기본 배경색 유지
  }
`;

export const DeleteSingleButton = styled.svg`
  position: absolute;
  right: 10px; 
  width: 24px;
  height: 24px;
  fill: #aaa;
  cursor: pointer;
`

export default function DeleteButton({ selectedItemID, type }) {
  const { products, updateProductsAndTotalPrice } = useContext(CartContext);

  // 단일 삭제 핸들러
  const handleDeleteSingle = () => {
    const newProducts = products.filter(product => product.id !== selectedItemID); 
    updateProductsAndTotalPrice(newProducts);
  }

  // 다중 삭제 핸들러
  const handleDeleteMultiple = () => {
    const checkedCount = products.filter(product => product.checked).length;
    if (window.confirm(`선택한 ${checkedCount}개의 상품을 장바구니에서 삭제하시겠습니까?`)) {
      const newProducts = products.filter(product => !product.checked)
      const autoSelectedProducts = newProducts.map(product => ({ ...product, checked: true }));
      updateProductsAndTotalPrice(autoSelectedProducts);
    } 
    return null;
  }

  // type에 맞게 핸들러 설정하고 버튼 랜더링
  if (type === 'multiple') {
    return (
      <DeleteSelectedButton onClick={handleDeleteMultiple} disabled={products.length === 0}>
        선택 삭제
      </DeleteSelectedButton>
    );
  }

  if (type === 'single') {
    return (
      <DeleteSingleButton xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" onClick={handleDeleteSingle}>
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </DeleteSingleButton>
    );
  }

  return null;
}
