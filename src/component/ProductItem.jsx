import { useState, useRef } from 'react';
import * as s from '../styles/ProductStyles';
import QuantityButton from './QuantityButton';
import QuantityInput from './QuantityInput';
import DeleteProductButton from './DeleteProductButton';

export default function ProductItem({ shop, name, initialPrice, imgUrl, updateTotalPrice, productId, isChecked, onCheckboxChange, onDeleteProduct }) {
  const [quantity, setQuantity] = useState(1);
  const quantityRef = useRef(null);

  const price = quantity * initialPrice; 
  // 컴포넌트 안의 다른 state, prop를 통해 계산할 수 있으므로 price를 state로 선언하지 않음
  
  const handleQuantityChange = (newQuantity) => {
    const priceChange = (newQuantity - quantity) * initialPrice; // 가격 차이를 계산
    setQuantity(newQuantity); // 수량 업데이트
    updateTotalPrice(priceChange); // 총 가격에 반영
  };

  const checkHandler = (e) => {
    onCheckboxChange(e.target.checked); // 개별 체크박스 상태 변경
    const priceChange = e.target.checked ? price : -price; // 체크 시 가격 더하고, 체크 해제 시 가격 빼기
    updateTotalPrice(priceChange); // 총 가격에 반영
  };

  return (
      <s.ProductContainer>
        <s.ProductCheckbox 
          type="checkbox"
          id={`${parseInt(productId, 10) + 1}-product-checkbox`}
          aria-label="상품 선택"
          checked={isChecked} // 체크 상태 전달
          onChange={checkHandler} // 체크박스 상태 변경 처리
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
        <DeleteProductButton productId={productId} onDelete={onDeleteProduct} parentComponent="ProductItem" />
      </s.ProductContainer>
  )
}