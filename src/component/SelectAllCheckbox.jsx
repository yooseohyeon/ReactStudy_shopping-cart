import React from 'react';
import * as s from '../styles/ProductStyles';

export default function SelectAllCheckbox({ isCheckedList, isChecked, toggleSelectAll, onDeleteSelectedProducts }) {
  const checkedCount = isCheckedList.filter(product => product.checked).length;

  const handleCheck = (e) => {
    toggleSelectAll(e.target.checked);
  };

  return (
    <s.SelectAllCheckboxWrapper>
      <s.SelectAllLabel htmlFor="selectAllcheckbox">
        <s.SelectAllCheckbox
          type="checkbox"
          id="selectAllcheckbox"
          checked={isChecked}
          onChange={handleCheck}
        />
        전체 선택 ({checkedCount}/{isCheckedList.length}) 
      </s.SelectAllLabel>
      <s.DeleteProductButton onClick={onDeleteSelectedProducts}>
        선택 삭제
      </s.DeleteProductButton>
    </s.SelectAllCheckboxWrapper>
  );
}
