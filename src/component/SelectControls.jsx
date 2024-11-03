import React from 'react';
import DeleteButton from './DeleteButton';
import * as s from '../styles/ProductStyles';

export default function SelectControls({ isChecked, products, setProducts, setTotalPrice, toggleSelectAll }) {
  const checkedCount = products.filter(product => product.checked).length;
  const isCartEmpty = products.length === 0;

  const handleCheck = (e) => {
    toggleSelectAll(e.target.checked);
  };

  return (
    <s.SelectAllControlsWrapper>
      <s.SelectAllLabel htmlFor="selectAllcheckbox" disabled={isCartEmpty}>
        <s.SelectAllCheckbox type="checkbox" id="selectAllcheckbox" checked={isChecked} onChange={handleCheck} disabled={isCartEmpty} />
        전체 선택 ({checkedCount}/{products.length}) 
      </s.SelectAllLabel>
      <DeleteButton products={products} setProducts={setProducts} setTotalPrice={setTotalPrice} type="multiple" />
    </s.SelectAllControlsWrapper>
  );
}
