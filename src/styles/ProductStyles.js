import styled from 'styled-components';
import checkIcon from '../image/check.svg'

export const ShoppingCartContainer = styled.div`
  display: flex;
  align-content: space-between;
`

export const ProductItemWrraper = styled.div`
  display: block;
  margin-right: 30px;
`

export const ProductContainer = styled.div`
  display: flex;
  position: relative;
  padding: 20px 10px;
  width: 670px;
  height: 100%;
  border-bottom: 1px solid #aaa;
`;

export const ProductCheckbox = styled.input`
  appearance: none;
  display: inline-block;
  margin: 0 15px 0 0;
  width: 22px;
  height: 22px;
  border-radius: 5px;
  border: 1.5px solid #bbb;
  cursor: pointer;
  transition: background 250ms ease-in, border 250ms ease-in; 

  &:checked {
    background: #6c5ce7 url(${checkIcon}) center / cover no-repeat;
    border-color: transparent;
  }
`;

export const SelectAllControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 10px;
  margin-bottom: 20px;
  width: 670px;
  height: 30px;
  border-bottom: 1px solid #aaa;
`;

export const SelectAllCheckbox = styled(ProductCheckbox)`
  margin: 0 10px 0 0;   
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const SelectAllLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 17px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ disabled }) => (disabled ? '#bbb' : 'inherit')};
`

export const ProductImg = styled.img`
  margin-right: 25px;
  width: 200px;
  height: 200px;
  border: 1px solid #eee;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductShop = styled.h5`
  margin-bottom: 10px;
  font-size: 16px;
`;

export const ProductName = styled.h4`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;
`;

export const ProductPrice = styled.p`
  margin-bottom: 30px;
  font-size: 26px;
  font-weight: 600;
`;

export const QuantityButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  width: 115px;
  height: 35px;
  border: 1px solid #ccc;
`;

export const StyledQuantityInput = styled.input`
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

export const TotalPriceWrapper = styled.div`
  padding: 20px;
  width: 350px;
  height: 500px;
`

export const TotalPriceTitle = styled.p`
  font-size: 23px;
  font-weight: 600;
  margin-bottom: 30px;
`

export const TotalPriceValue = styled.span`
  font-weight: 550;
`

export const TotalPriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  margin-bottom: 15px;

  &:nth-child(2) {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }

  &:nth-child(3) ${TotalPriceValue} {
    font-size: 28px;
    font-weight: 600;
  }
`

export const BuyButton = styled.button`
  width: 100%;
  padding: 18px;
  margin-top: 10px;
  font-size: 17px;
  font-weight: 500;
  border-radius: 5px;
  color: #fff;
  background-color: #6c5ce7;
  transition: background-color 100ms ease-out;

  &:hover {
    background-color: #5849cf;
  }
}
`