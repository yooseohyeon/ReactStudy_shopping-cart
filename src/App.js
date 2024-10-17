import React, { useState } from "react";
import CartProductList from "./component/CartProductList";
import CartTotalPrice from './component/CartTotalPrice';
import { productsData } from "./component/productsData";
import { GlobalStyles } from './styles/GlobalStyles';

export default function App() {
  const initialTotalPrice = productsData.reduce((acc, product) => acc + product.price, 0);
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

  const updateTotalPrice = (priceChange) => {
    setTotalPrice(prevTotal => prevTotal + priceChange);
  };

  return (
      <React.StrictMode>
        <GlobalStyles />
        <h1>장바구니</h1>
        <CartProductList productsData={productsData} updateTotalPrice={updateTotalPrice} />
        <CartTotalPrice totalPrice={totalPrice} />
      </React.StrictMode>
  );
}