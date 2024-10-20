import React, { useState } from "react";
import ProductList from "./component/ProductList";
import TotalPrice from './component/TotalPrice';
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
        <ProductList productsData={productsData} updateTotalPrice={updateTotalPrice} />
        <TotalPrice totalPrice={totalPrice} />
      </React.StrictMode>
  );
}