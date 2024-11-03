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
  // 선택 삭제 핸들러와 단일 삭제 핸들러를 통합해 중복된 코드를 줄임
  const handleDelete = (productId) => {
    let updatedProducts;

    if (type === 'single') {
      updatedProducts = products.filter(product => product.id !== productId);
    } else if (type === 'multiple') {
      const checkedCount = products.filter(product => product.checked).length;
      if (window.confirm(`선택한 ${checkedCount}개의 상품을 장바구니에서 삭제하시겠습니까?`)) {
        const notCheckedList = products.filter(product => !product.checked);
        updatedProducts = notCheckedList.map(product => ({ ...product, checked: true }));
      } else {
        // 사용자가 경고창에서 확인을 누르지 않은 경우 아무 작업도 하지 않음
        return;
      }
    }

    // 두 핸들러에서 공통으로 업데이트되는 부분 - 상품 목록, 총 가격
    setProducts(updatedProducts);
    setTotalPrice(calculateTotalPrice(updatedProducts)); 
  }

  return (
    <div>
      {type === 'multiple' ? (
        <DeleteSelectedButton onClick={handleDelete} disabled={products.length === 0}>
          선택 삭제
        </DeleteSelectedButton>
      ) : type === 'single' ? (
        <DeleteSingleButton xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" onClick={() => handleDelete(productId)}>
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </DeleteSingleButton>
      ) : null}
    </div>
  )
}
