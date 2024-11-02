import React from 'react';
import { calculateTotalPrice } from '../utils/calculateTotalPrice';
import * as s from '../styles/ProductStyles';

export default function SelectAllCheckbox({ isChecked, products, setProducts, setTotalPrice, toggleSelectAll }) {
  const checkedCount = products.filter(product => product.checked).length;
  const isCartEmpty = products.length === 0;

  const handleCheck = (e) => {
    toggleSelectAll(e.target.checked);
  };

  // 선택된 여러 개의 상품을 삭제
  const handleDeleteMultipleProduct = () => {
    const confirmed = window.confirm(`선택한 ${products.filter(product => product.checked).length}개의 상품을 장바구니에서 삭제하시겠습니까?`);

    if (confirmed) {
      const updatedProducts = products.filter(product => !product.checked);
      setProducts(updatedProducts);

      const newCheckedList = updatedProducts.map(product => ({ ...product, checked: true })); // 남아있는 항목 다시 체크
      setProducts(newCheckedList); // checked가 변화했으므로 products 다시 업데이트
      setTotalPrice(calculateTotalPrice(newCheckedList)); // 남은 상품의 가격이 총 가격에 업데이트
    }
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
        전체 선택 ({checkedCount}/{products.length}) 
      </s.SelectAllLabel>
      <s.DeleteProductButton onClick={handleDeleteMultipleProduct} disabled={isCartEmpty}>
        선택 삭제
      </s.DeleteProductButton>
    </s.SelectAllCheckboxWrapper>
  );
}
