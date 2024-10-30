import React from 'react';
import * as s from '../styles/ProductStyles';

export default function DeleteProductButton({ checkedCount, productId, onDelete, parentComponent }) {
  const handleDelete = () => {
    if (parentComponent === 'SelectAllCheckbox') {
      const confirmed = window.confirm(`선택한 ${checkedCount}개의 상품을 장바구니에서 삭제하시겠습니까?`);
      if (confirmed) {
        onDelete(productId); // 확인을 클릭했을 때만 삭제 함수 호출
      }
    } else if (parentComponent === 'ProductItem') {
      onDelete(productId); 
    }
  };

  return (
    <div>
      {parentComponent === 'SelectAllCheckbox' ? (
        <s.DeleteProductButton onClick={() => handleDelete(productId)}>
          선택 삭제
        </s.DeleteProductButton>
      ) : parentComponent === 'ProductItem' ? (
        <svg style={{ position: 'absolute', right: 10, cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#aaa" onClick={() => handleDelete(productId)}>
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
      ) : null}
    </div>
  );
}
