// 체크박스가 선택된 상품들의 가격만 총 가격에 반영되도록 함
export const calculateTotalPrice = (productList) => {
  return productList.reduce((acc, product) => {
    if (product.checked) {
      return acc + product.price * product.quantity;
    }
    return acc;
  }, 0);
};
