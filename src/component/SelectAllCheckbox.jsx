import React from 'react';
import * as s from '../styles/ProductStyles';
import DeleteProductButton from "./DeleteProductButton";

export default function SelectAllCheckbox({ isChecked, setIsChecked, isCheckedList, checkedCount, productsData }) {
  const checkHandler = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <s.SelectAllCheckboxWrapper>
      <s.SelectAllLabel htmlFor="selectAllcheckbox">
        <s.SelectAllCheckbox
          type="checkbox"
          id="selectAllcheckbox"
          checked={isChecked}
          onChange={checkHandler}
        />
        전체 선택 ({checkedCount}/{isCheckedList.length}) 
      </s.SelectAllLabel>
      <DeleteProductButton checkedCount={checkedCount} productId={productsData.id} parentComponent="SelectAllCheckbox" />
    </s.SelectAllCheckboxWrapper>
  );
}
