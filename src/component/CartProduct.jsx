import { useState, useEffect } from 'react';
import styled from 'styled-components';
import checkIcon from '../image/check.svg'

const ProductContainer = styled.div`
  display: flex;
  padding: 20px 10px;
  width: 650px;
  border-bottom: 1px solid #aaa;
`;

const ProductCheckbox = styled.input`
  appearance: none;
  display: inline-block;
  margin: 10px 15px 0 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1.5px solid #bbb;
  cursor: pointer;

  &:checked {
    background-image: url(${checkIcon});
    background-repeat: no-repeat;
    background-position: center;
    background-color: #3d3d3d;
    border-color: transparent;
  }
`;

const ProductImg = styled.img`
  margin-right: 25px;
  width: 200px;
  height: 200px;
  border: 1px solid #eee;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductShop = styled.h5`
  margin-bottom: 10px;
  font-size: 15px;
`;

const ProductName = styled.h4`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;
`;

const ProductPrice = styled.p`
  margin-bottom: 30px;
  font-size: 26px;
  font-weight: 600;
`;

const QuantityButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  width: 100px;
  height: 35px;
  border: 1px solid #ccc;
`;

const QuantityButton = styled.button`
  padding: 0 5px 0 5px;
  width: 30px;
  height: 100%;
  background-color: #ffffff00;
  cursor: pointer;

  &:first-of-type {
    border-right: 1px solid #ccc;
  }

  &:last-of-type {
    border-left: 1px solid #ccc;
  }

  &:disabled {
    svg {
      fill: #ccc;
    }
`;

const Quantity = styled.span`
  cursor: default;
`;

export default function Product({ shop, name, initialPrice, imgUrl, updateTotalPrice }) {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(initialPrice);

  useEffect(() => {
    const newPrice = quantity * initialPrice; // 새로운 가격 계산
    const priceDifference = newPrice - price; // 가격 차이 계산
    setPrice(newPrice); // 가격 업데이트
    updateTotalPrice(priceDifference); // 총 가격 업데이트
  }, [quantity]);

  const addQuantity = () => {
    setQuantity(quantity + 1);
  }

  const subQuantity = () => {
    setQuantity(quantity - 1);
  }


  return (
    <ProductContainer>
      <ProductCheckbox type="checkbox" />
      <ProductImg src={imgUrl} alt='' />
      <ProductInfo>
        <ProductShop>{shop}</ProductShop>
        <ProductName>{name}</ProductName>
        <ProductPrice>{price.toLocaleString('ko-KR')}원</ProductPrice>
        <QuantityButtonContainer>
          <QuantityButton onClick={subQuantity} disabled={quantity === 1}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -690 960 960" width="20px" fill="#282828">
              <path d="M288-144v-72h384v72H288Z"/>
            </svg>
          </QuantityButton>
          <Quantity>{quantity}</Quantity>
          <QuantityButton onClick={addQuantity}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#282828">
              <path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z"/>
            </svg>
          </QuantityButton>
        </QuantityButtonContainer>
      </ProductInfo>
    </ProductContainer>
  )
}