import React, { useContext } from 'react';
import { CartContext, CartProvider } from './contexts/CartContext';
import SelectControls from "./component/SelectControls";
import ProductList from "./component/ProductList";
import EmptyCartNotice from "./component/EmptyCartNotice";
import TotalPrice from './component/TotalPrice';
import { GlobalStyles } from './styles/GlobalStyles';
import * as s from './styles/ProductStyles';

function RenderCartContent() {
  const { products } = useContext(CartContext); 
  return products.length === 0 ? <EmptyCartNotice /> : <ProductList />;
}

export default function App() {
  return (
    <CartProvider>
        <GlobalStyles />
        <h1>장바구니</h1>
        <s.ShoppingCartContainer>
          <s.ProductItemWrapper>
            <SelectControls />
            <RenderCartContent /> 
          </s.ProductItemWrapper>
          <TotalPrice />
        </s.ShoppingCartContainer>
    </CartProvider>
  );
}