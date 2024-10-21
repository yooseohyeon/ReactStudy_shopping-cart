import { useState, useEffect, useRef } from 'react';
import * as s from '../styles/ProductStyles';
import QuantityButton from './QuantityButton';
import QuantityInput from './QuantityInput';

export default function ProductItem({ shop, name, initialPrice, imgUrl, updateTotalPrice }) {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(initialPrice);
  const quantityRef = useRef(null);

  useEffect(() => {
    const newPrice = quantity * initialPrice; // 새로운 가격 계산
    const priceChange = newPrice - price; // 이전 가격과의 차이 계산
    setPrice(newPrice); // 가격 업데이트
    updateTotalPrice(priceChange); // 이전 가격과의 차이를 통해 총 가격 업데이트
  }, [quantity]);
  
  return (
    <s.ProductContainer>
      <s.ProductCheckbox type="checkbox" />
      <s.ProductImg src={imgUrl} alt='' />
      <s.ProductInfo>
        <s.ProductShop>{shop}</s.ProductShop>
        <s.ProductName>{name}</s.ProductName>
        <s.ProductPrice>{price.toLocaleString('ko-KR')}원</s.ProductPrice>
        <s.QuantityButtonContainer>
          <QuantityButton delta={-1} setQuantity={setQuantity} currentQuantity={quantity} quantityRef={quantityRef} />
          <QuantityInput ref={quantityRef} quantity={quantity} setQuantity={setQuantity} />
          <QuantityButton delta={1} setQuantity={setQuantity} quantityRef={quantityRef} />
        </s.QuantityButtonContainer>
      </s.ProductInfo>
    </s.ProductContainer>
  )
}