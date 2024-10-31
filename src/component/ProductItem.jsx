import { useRef } from 'react';
import * as s from '../styles/ProductStyles';
import QuantityButton from './QuantityButton';
import QuantityInput from './QuantityInput';

export default function ProductItem({ shop, name, initialPrice, imgUrl, updateTotalPrice, productId, isChecked, onCheckboxChange, onDeleteProduct, quantity, onQuantityChange }) {
  const quantityRef = useRef(null);

  const price = quantity * initialPrice; 

  const handleQuantityChange = (newQuantity) => {
    onQuantityChange(productId, newQuantity);
  };

  const requestDelete = () => {
    if (isChecked) {
      updateTotalPrice(-price);
    }
    onDeleteProduct(productId); 
  };

  const handleCheck = (e) => {
    onCheckboxChange(e.target.checked); // 개별 체크박스 상태 변경
    const priceChange = e.target.checked ? price : -price; 
    updateTotalPrice(priceChange); // 총 가격에 반영
  };

  return (
    <s.ProductContainer>
      <s.ProductCheckbox 
        type="checkbox"
        id={`${parseInt(productId, 10) + 1}-product-checkbox`}
        aria-label="상품 선택"
        checked={isChecked} // 체크 상태 전달
        onChange={handleCheck} // 체크박스 상태 변경 처리
      />
      <s.ProductImg src={imgUrl} alt='' />
      <s.ProductInfo>
        <s.ProductShop>{shop}</s.ProductShop>
        <s.ProductName>{name}</s.ProductName>
        <s.ProductPrice>{price.toLocaleString('ko-KR')}원</s.ProductPrice>
        <s.QuantityButtonWrapper>
          <QuantityButton delta={-1} quantity={quantity} handleQuantityChange={handleQuantityChange} inputRef={quantityRef} productId={productId} />
          <QuantityInput productId={productId} ref={quantityRef} quantity={quantity} handleQuantityChange={handleQuantityChange} />
          <QuantityButton delta={1} quantity={quantity} handleQuantityChange={handleQuantityChange} inputRef={quantityRef} productId={productId} />
        </s.QuantityButtonWrapper>
      </s.ProductInfo>
      <svg 
        style={{ position: 'absolute', right: 10, cursor: 'pointer' }} 
        xmlns="http://www.w3.org/2000/svg" 
        height="24px" 
        viewBox="0 -960 960 960" 
        width="24px" 
        fill="#aaa" 
        onClick={requestDelete}
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
      </svg>
    </s.ProductContainer>
  )
}
