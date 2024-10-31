import React from 'react';
import * as s from '../styles/ProductStyles';

export default function TotalPrice({ totalPrice, isCheckedList }) {
  const checkedCount = isCheckedList.filter(product => product.checked).length;

  return (
    <s.TotalPriceWrapper>
      <s.TotalPriceTitle> 결제 정보 </s.TotalPriceTitle>
      <ul>
        <s.TotalPriceItem>
          <span>상품 금액</span>
          <s.TotalPriceValue>{totalPrice.toLocaleString('ko-KR')}원</s.TotalPriceValue>
        </s.TotalPriceItem>
        <s.TotalPriceItem>
          <span>배송비</span>
          <s.TotalPriceValue>0원</s.TotalPriceValue>
        </s.TotalPriceItem>
        <s.TotalPriceItem>
          <span>총 결제 금액</span>
          <s.TotalPriceValue>{totalPrice.toLocaleString('ko-KR')}원</s.TotalPriceValue>
        </s.TotalPriceItem>
      </ul>
      <s.BuyButton> {checkedCount}개 상품 구매하기</s.BuyButton>
    </s.TotalPriceWrapper>
  );
}