import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

export interface CartState {
  items: CartItem[];
  discountCode: string | null;
  taxRate: number; // 0.1 = 10%
  shippingCost: number;
}

// Khôi phục từ localStorage (Level 3)
const loadSavedCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem('cartItems');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading cart from localStorage', err);
    return [];
  }
};

const saveCart = (items: CartItem[]) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(items));
  } catch (err) {
    console.error('Error saving cart to localStorage', err);
  }
};

const initialState: CartState = {
  items: loadSavedCart(),
  discountCode: null,
  taxRate: 0.1, // 10%
  shippingCost: 10, // Mặc định tiêu chuẩn $10
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Level 1 & Level 2: Thêm sản phẩm (tăng số lượng nếu đã có, hoặc tạo mới)
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      const qtyToAdd = action.payload.quantity ?? 1;

      if (existingItem) {
        existingItem.quantity += qtyToAdd;
      } else {
        state.items.push({
          ...action.payload,
          quantity: qtyToAdd,
        });
      }
      saveCart(state.items);
    },

    // Level 2: Tăng số lượng
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        saveCart(state.items);
      }
    },

    // Level 2: Giảm số lượng
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCart(state.items);
      }
    },

    // Level 1, 2, 3: Xóa sản phẩm khỏi giỏ
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCart(state.items);
    },

    // Level 1, 2, 3: Xóa tất cả giỏ hàng
    clearCart: (state) => {
      state.items = [];
      state.discountCode = null;
      try {
        localStorage.removeItem('cartItems');
      } catch (err) {
        console.error('Error removing cart from localStorage', err);
      }
    },

    // Level 3: Áp dụng mã giảm giá
    applyDiscount: (state, action: PayloadAction<string>) => {
      state.discountCode = action.payload.trim().toUpperCase();
    },

    // Level 3: Bỏ mã giảm giá
    removeDiscount: (state) => {
      state.discountCode = null;
    },

    // Level 3: Thiết lập phí vận chuyển
    setShippingCost: (state, action: PayloadAction<number>) => {
      state.shippingCost = action.payload;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  applyDiscount,
  removeDiscount,
  setShippingCost,
} = cartSlice.actions;

export default cartSlice.reducer;
