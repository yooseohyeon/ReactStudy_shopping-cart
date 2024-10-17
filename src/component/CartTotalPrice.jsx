import React from 'react';

export default function CartTotalPrice({ totalPrice }) {
  return (
    <div>
      <h2>결제 예정 금액: {totalPrice.toLocaleString('ko-KR')}원</h2>
    </div>
  );
}