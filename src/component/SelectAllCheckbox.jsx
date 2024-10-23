import React from 'react';
import * as s from '../styles/ProductStyles';

export default function SelectAllCheckbox({ isChecked, setIsChecked }) {
  const checkHandler = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <s.SelectAllWrapper htmlFor="selectAllcheckbox">
      <s.SelectAllCheckbox
        type="checkbox"
        id="selectAllcheckbox"
        name="selectAllcheckbox"
        checked={isChecked}
        onChange={checkHandler}
      />
      전체 선택
    </s.SelectAllWrapper>
  );
}