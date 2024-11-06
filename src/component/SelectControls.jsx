import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext'
import DeleteButton from './DeleteButton';
import * as s from '../styles/ProductStyles';

export default function SelectControls() {
  const { products, handleToggleSelectAll } = useContext(CartContext);
  const checkedCount = products.filter(product => product.checked).length;

  return (
    <s.SelectAllControlsWrapper>
      <s.SelectAllLabel htmlFor="selectAllcheckbox" disabled={products.length === 0}>
        <s.SelectAllCheckbox 
          type="checkbox" 
          id="selectAllcheckbox" 
          checked={products.length > 0 && products.every(product => product.checked)} 
          onChange={(e) => handleToggleSelectAll(e.target.checked)} 
          disabled={products.length === 0} 
        />
        전체 선택 ({checkedCount}/{products.length}) 
      </s.SelectAllLabel>
      <DeleteButton type="multiple" />
    </s.SelectAllControlsWrapper>
  );
}