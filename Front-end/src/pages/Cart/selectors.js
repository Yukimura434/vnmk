import { createSelector } from "@reduxjs/toolkit";

const cartItemsSelector = (state) => state.cart.cartItems;

// Đếm số lượng sản phẩm trong giỏ hàng
export const cartItemsCountSelector = createSelector(
    cartItemsSelector,
    (cartItems) => cartItems.reduce((count, item) => count + item.quantity, 0)
);

// Tính tổng giá trị của giỏ hàng
export const cartTotalSelector = createSelector(
    cartItemsSelector,
    (cartItems) => cartItems.reduce((total, item) => total + (item.product.salePrice * item.quantity), 0)
);

// originalPrice
export const cartTotalOriginalPriceSelector = createSelector(
    cartItemsSelector,
    (cartItems) => cartItems.reduce((total, item) => total + (item.product.originalPrice * item.quantity), 0)
);
// salePrice
export const cartTotalSalePriceSelector = createSelector(
    cartItemsSelector,
    (cartItems) => cartItems.reduce((total, item) => total + (item.product.salePrice * item.quantity), 0)
);
