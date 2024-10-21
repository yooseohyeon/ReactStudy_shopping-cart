import styled from 'styled-components';
import checkIcon from '../image/check.svg'

export const ProductContainer = styled.div`
  display: flex;
  padding: 20px 10px;
  width: 650px;
  border-bottom: 1px solid #aaa;
`;

export const ProductCheckbox = styled.input`
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
  font-size: 15px;
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

export const QuantityButtonContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  width: 115px;
  height: 35px;
  border: 1px solid #ccc;
`;