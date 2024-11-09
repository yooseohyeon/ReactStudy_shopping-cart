
import styled from 'styled-components';

export const StyledQuantityInput = styled.input`
  padding: 0;
  width: 45px;
  height: 100%;
  text-align: center;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: text;

  /* 스피너 제거 */
  appearance: none; 
  -webkit-appearance: none; 
  -moz-appearance: textfield; 
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

export default function QuantityInput({ selectedItemID, inputValue, setInputValue, updateQuantity}) {
  const handleInputChange = (e) => {
    setInputValue(e.target.value); 
  };

  // input이 포커스를 잃은 경우에만 input의 값을 quantity state에 업데이트
  const handleInputBlur = (e) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);
    
    // 입력된 값이 빈 문자열이거나 0인 경우 최소 수량인 1로 inputValue와 quantity 업데이트
    if (value === "" || value === "0") {
      alert("수량은 최소 1개 이상 입력해야 합니다.");
      updateQuantity(1)
      return;
    }

    // 입력된 값이 유효한 숫자일 경우 입력된 값으로 inputValue와 quantity 업데이트
    if (!isNaN(parsedValue)) {
      updateQuantity(parsedValue);
    }
  };

  // 보통 입력을 완료한 뒤 엔터 키를 누르므로, 엔터 키가 눌릴 경우 blur 핸들러를 호출하고 포커스 아웃함
  const handleInputEnter = (e) => {
    if (e.key === 'Enter') {
      handleInputBlur(e); 
      e.target.blur();
    }
  };

  return (
    <StyledQuantityInput
      type="number"
      id={`${selectedItemID + 1}-quantity-input`}
      value={inputValue}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      onKeyDown={handleInputEnter}
      aria-label="수량 입력 필드"
      aria-live="polite"
    />
  );
}