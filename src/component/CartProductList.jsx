import React from "react";
import CartProduct from "./CartProduct"

export default function CartProductList({ productsData, updateTotalPrice}) {
    return (
        <ul>
            {productsData.map(product => (
                <CartProduct key={product.id}
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