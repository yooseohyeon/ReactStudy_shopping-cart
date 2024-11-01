import React from 'react';
import * as s from '../styles/ProductStyles';

export default function SelectAllCheckbox({ isCheckedList, isChecked, toggleSelectAll, onDeleteSelectedProducts }) {
  const checkedCount = isCheckedList.filter(product => product.checked).length;
  const isCartEmpty = isCheckedList.length === 0;

  const handleCheck = (e) => {
    toggleSelectAll(e.target.checked);
  };

  return (
    <s.SelectAllCheckboxWrapper>
      <s.SelectAllLabel htmlFor="selectAllcheckbox" disabled={isCartEmpty}>
        <s.SelectAllCheckbox
          type="checkbox"
          id="selectAllcheckbox"
          checked={isChecked}
          onChange={handleCheck}
          disabled={isCartEmpty}
        />
        전체 선택 ({checkedCount}/{isCheckedList.length}) 
      </s.SelectAllLabel>
      <s.DeleteProductButton onClick={onDeleteSelectedProducts} disabled={isCartEmpty}>
        선택 삭제
      </s.DeleteProductButton>
    </s.SelectAllCheckboxWrapper>
  );
}
