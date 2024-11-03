import { useRef } from 'react';
import QuantityButton from './QuantityButton';
import QuantityInput from './QuantityInput';
import DeleteButton from './DeleteButton'
import * as s from '../styles/ProductStyles';

export default function ProductItem({ products, setProducts, shop, name, initialPrice, imgUrl, productId, isChecked, quantity, setTotalPrice, onCheckboxChange, onQuantityChange }) {
  const quantityRef = useRef(null);

  const price = quantity * initialPrice; 

  const handleQuantityChange = (newQuantity) => {
    onQuantityChange(productId, newQuantity);
  };

  const handleCheck = (e) => {
    onCheckboxChange(e.target.checked); // 개별 체크박스 상태 변경
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
      <DeleteButton products={products} setProducts={setProducts} setTotalPrice={setTotalPrice} productId={productId} type="single" />
    </s.ProductContainer>
  )
}
