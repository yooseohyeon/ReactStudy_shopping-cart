import React from 'react';
import { calculateTotalPrice } from '../utils/calculateTotalPrice';
import styled from 'styled-components';

export const DeleteSelectedButton = styled.button`
  font-size: 16px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: inherit;
  color: ${({ disabled }) => (disabled ? '#bbb' : 'inherit')};

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

export default function DeleteButton({ products, setProducts, setTotalPrice, productId, type }) {
  const handleDelete = (productId) => {
    const deleteActions = {
      single: () => {
        return products.filter(product => product.id !== productId);
      },
      multiple: () => {
        const checkedCount = products.filter(product => product.checked).length;
        if (window.confirm(`선택한 ${checkedCount}개의 상품을 장바구니에서 삭제하시겠습니까?`)) {
          return products.filter(product => !product.checked).map(product => ({ ...product, checked: true }));
        }
        return null;  // 사용자가 alert창에서 취소를 누른 경우에는 null 반환해 아무 작업도 하지 않음
      },
    };
  
    const updatedProducts = deleteActions[type]?.();
    if (updatedProducts) {
      setProducts(updatedProducts);
      setTotalPrice(calculateTotalPrice(updatedProducts));
    }
  };

  const deleteButtonTypes = {
    multiple: (
      <DeleteSelectedButton onClick={handleDelete} disabled={products.length === 0}>
        선택 삭제
      </DeleteSelectedButton>
    ),
    single: (
      <DeleteSingleButton xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" onClick={() => handleDelete(productId)}>
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
      </DeleteSingleButton>
    ),
  };
  
  return deleteButtonTypes[type] || null; // 타입에 맞는 버튼을 반환, 없으면 null 반환
}
