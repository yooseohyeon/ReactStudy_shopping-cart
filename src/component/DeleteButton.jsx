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

  // 버튼 type에 따라 products 배열에서 아이템을 다르게 삭제(단일 삭제/다중 삭제)하는 동작 처리
  const handleDelete = (selectedItemID) => {
    const deleteHandlers = {
      single: () => {
        return products.filter(product => product.id !== selectedItemID); 
      },
      multiple: () => {
        const checkedCount = products.filter(product => product.checked).length;
        if (window.confirm(`선택한 ${checkedCount}개의 상품을 장바구니에서 삭제하시겠습니까?`)) {
          return products.filter(product => !product.checked)
          .map(product => ({ ...product, checked: true }));
        }
        return null; // 취소 시 아무 작업도 하지 않음
      },
    };

    // single이나 multiple 이외의 type이 들어올 경우에는 undefined를 반환하여 에러 방지
    const newProducts = deleteHandlers[type]?.(); // 상품 삭제 후 새로운 상품 리스트

    // newProducts가 존재하는 경우에만 Products와 TotalPrice를 업데이트하여 에러 방지
    if (newProducts) {
      updateProductsAndTotalPrice(newProducts);
    }
  };

  // type에 맞는 버튼 랜더링
  const renderDeleteButton = {
    multiple: (
      <DeleteSelectedButton onClick={handleDelete} disabled={products.length === 0}>
        선택 삭제
      </DeleteSelectedButton>
    ),
    single: (
      <DeleteSingleButton xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" onClick={() => handleDelete(selectedItemID)}>
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
      </DeleteSingleButton>
    ),
  };

  return renderDeleteButton[type] || null; // 타입에 맞는 버튼을 반환, 없으면 null 반환
}
