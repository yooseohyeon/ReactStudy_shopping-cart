import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext'
import QuantitySelector from './QuantitySelector';
import DeleteButton from './DeleteButton'
import * as s from '../styles/ProductStyles';

export default function ProductItem({ product }) {
  const { handleToggleCheckbox } = useContext(CartContext);
  const updatedPrice = product.quantity * product.price; 

  return (
    <s.ProductContainer>
      <s.ProductCheckbox 
        type="checkbox"
        id={`${parseInt(product.id, 10) + 1}-product-checkbox`}
        aria-label="상품 선택"
        checked={product.checked} // 체크 상태 전달
        onChange={(e) => handleToggleCheckbox(product.id, e.target.checked)} // 체크박스 상태 변경 처리
      />
      <s.ProductImg src={product.imgUrl} alt='' />
      <s.ProductInfo>
        <s.ProductShop>{product.shop}</s.ProductShop>
        <s.ProductName>{product.name}</s.ProductName>
        <s.ProductPrice>{updatedPrice.toLocaleString('ko-KR')}원</s.ProductPrice>
        <QuantitySelector selectedItemID={product.id} quantity={product.quantity} />
      </s.ProductInfo>
      <DeleteButton selectedItemID={product.id} type="single" />
    </s.ProductContainer>
  )
}