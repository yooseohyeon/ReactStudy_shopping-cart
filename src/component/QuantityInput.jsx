import { forwardRef } from 'react';
import styled from 'styled-components';

const StyledQuantityInput = styled.input`
  appearance: none; /* 기본 스피너 제거 */
  -webkit-appearance: none; /* Safari에서 기본 스피너 제거 */
  -moz-appearance: textfield; /* Firefox에서 기본 스피너 제거 */
  padding: 0;
  width: 45px;
  height: 100%;
  text-align: center;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: text;

  /* 웹킷 브라우저에서 스피너 버튼 숨기기 */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    border: 2px solid #000000;
  }
}
`;

const QuantityInput = forwardRef(({quantity, handleQuantityChange, productId}, ref) => {
  const handleInputBlur = (e) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);

    if (value === "" || value === "0") {
      alert("최소 수량은 1개입니다.");
      handleQuantityChange(1);
      ref.current.value = 1; // 입력 필드 업데이트
      return;
    }

    if (!isNaN(parsedValue)) {
      handleQuantityChange(parsedValue); // 유효한 숫자일 경우 상태 업데이트
    }
  };

  // 보통 입력을 완료한 뒤 엔터 키를 누르므로, 엔터 키가 눌릴 경우 blur 핸들러를 호출하고 포커스 아웃함
  const handleInputEnter = (e) => {
    if (e.key === 'Enter') {
      handleInputBlur(e); 
      ref.current.blur(); // 포커스 아웃
    }
  };

  return (
    <StyledQuantityInput
      type="number"
      id={`quantity-input-${productId}`} // 고유한 ID 사용
      ref={ref}
      defaultValue={quantity}
      onBlur={handleInputBlur}
      onKeyDown={handleInputEnter}
      aria-label="수량 입력 필드"
      aria-live="polite" // 스크린리더에서 수량 변경을 실시간으로 읽도록 설정
    />
  );
});

export default QuantityInput;


