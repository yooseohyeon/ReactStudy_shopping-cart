import React from "react";
import CartProduct from "./ProductItem"

export default function ProductList({ productsData, updateTotalPrice}) {
    return (
        <ul>
            {productsData.map(product => (
                <CartProduct 
                    key={product.id}
                    productId={product.id} // ProductItem에 전달
                    shop={product.shop}
                    name={product.name}
                    initialPrice={product.price}
                    imgUrl={product.imgUrl}
                    updateTotalPrice={updateTotalPrice}
                />
            ))}
        </ul>
    );
}