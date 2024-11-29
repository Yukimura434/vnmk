export function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export function discountPercentage(originalPrice , salePrice){
    if (originalPrice <= 0 || salePrice < 0 || salePrice > originalPrice) {
        return "Invalid prices";
      }
      const discount = ((originalPrice - salePrice) / originalPrice) * 100;
      return discount.toFixed(0); 
}
