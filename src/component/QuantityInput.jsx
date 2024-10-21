import { forwardRef } from 'react';
import * as s from '../styles/ProductStyles';

const QuantityInput = forwardRef(({quantity, setQuantity}, ref) => {
  const handleInputBlur = (e) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);

    if (value === "" || value === "0") {
      alert("최소 수량은 1개입니다.");
      setQuantity(1);
      ref.current.value = 1; // 입력 필드 업데이트
      return;
    }

    if (!isNaN(parsedValue)) {
      setQuantity(parsedValue); // 유효한 숫자일 경우 상태 업데이트
    }
  };

  return (
    <s.QuantityInput
      type="number"
      ref={ref}
      defaultValue={quantity}
      onBlur={handleInputBlur}
    />
  );
});

export default QuantityInput;


