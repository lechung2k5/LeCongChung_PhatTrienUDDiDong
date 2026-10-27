import type { RootState } from '../../app/store';

// Level 2 Selectors
export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

// Level 2 plain total (items * price)
export const selectSimpleCartTotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

// Level 3 Advanced Selectors
export const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectDiscountRate = (state: RootState) => {
  const code = state.cart.discountCode;
  const rates: Record<string, number> = {
    SUMMER10: 0.1, // 10%
    SPECIAL20: 0.2, // 20%
    VIP30: 0.3, // 30%
  };
  return code ? rates[code] || 0 : 0;
};

export const selectDiscount = (state: RootState) => {
  const subtotal = selectSubtotal(state);
  const rate = selectDiscountRate(state);
  return subtotal * rate;
};

export const selectTax = (state: RootState) => {
  const subtotal = selectSubtotal(state);
  return subtotal * state.cart.taxRate;
};

// Tổng tiền thanh toán Level 3 (Subtotal - Discount + Tax + Shipping)
export const selectCartTotal = (state: RootState) => {
  const subtotal = selectSubtotal(state);
  if (subtotal === 0) return 0; // Nếu giỏ trống thì tổng = 0
  const discount = selectDiscount(state);
  const tax = selectTax(state);
  return Math.max(0, subtotal - discount + tax + state.cart.shippingCost);
};

// Chi tiết tóm tắt hóa đơn
export const selectCartSummary = (state: RootState) => {
  const subtotal = selectSubtotal(state);
  const discount = selectDiscount(state);
  const tax = selectTax(state);
  const shipping = subtotal > 0 ? state.cart.shippingCost : 0;
  const total = subtotal > 0 ? Math.max(0, subtotal - discount + tax + shipping) : 0;
  const itemCount = selectCartItemCount(state);
  const discountCode = state.cart.discountCode;
  const discountRate = selectDiscountRate(state);

  return {
    subtotal,
    discount,
    discountRate,
    discountCode,
    tax,
    shipping,
    total,
    itemCount,
  };
};
