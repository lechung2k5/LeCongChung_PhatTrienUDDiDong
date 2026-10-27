import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  rating?: number;
}

export interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Danh sách sản phẩm mẫu làm fallback dữ liệu chất lượng cao
export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 16" M3 Max',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    category: 'Laptop',
    description: 'Chip Apple M3 Max siêu mạnh mẽ, màn hình Liquid Retina XDR 120Hz.',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Logitech MX Master 3S',
    price: 99,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
    category: 'Accessories',
    description: 'Chuột công thái học cao cấp với con lăn MagSpeed siêu êm và chính xác.',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Keychron Q1 Pro Wireless',
    price: 199,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    category: 'Keyboard',
    description: 'Bàn phím cơ Custom nhôm CNC, kết nối Bluetooth 5.1 và QMK/VIA.',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5',
    price: 349,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    category: 'Audio',
    description: 'Tai nghe chống ồn chủ động hàng đầu thế giới với chất âm Hi-Res sắc nét.',
    rating: 4.9,
  },
  {
    id: 5,
    name: 'Dell UltraSharp 27" 4K',
    price: 589,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    category: 'Monitor',
    description: 'Màn hình IPS Black chuẩn màu đồ họa 98% DCI-P3 kèm cổng sạc Type-C 90W.',
    rating: 4.6,
  },
  {
    id: 6,
    name: 'Apple Watch Ultra 2',
    price: 799,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    category: 'Wearables',
    description: 'Vỏ titan chuẩn quân đội, GPS tần số kép và pin sử dụng bền bỉ nhiều ngày.',
    rating: 4.9,
  },
];

// Async Thunk: Lấy dữ liệu sản phẩm từ API (với fallback tự động đảm bảo luôn chạy tốt)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=6');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && Array.isArray(data.products) && data.products.length > 0) {
        return data.products.map((p: any) => ({
          id: p.id,
          name: p.title,
          price: p.price,
          image: p.thumbnail || p.images?.[0] || DEFAULT_PRODUCTS[0].image,
          category: p.category || 'Công nghệ',
          description: p.description,
          rating: p.rating || 4.5,
        })) as Product[];
      }
      return DEFAULT_PRODUCTS;
    } catch (err: any) {
      console.warn('Network call failed, using high quality default products fallback:', err);
      // Giả lập network delay ngắn cho trải nghiệm chân thực
      await new Promise((res) => setTimeout(res, 400));
      return DEFAULT_PRODUCTS;
    }
  }
);

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Có thể reset status để test lại
    resetProductsStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Lỗi không xác định khi tải sản phẩm';
      });
  },
});

export const { resetProductsStatus } = productsSlice.actions;

export default productsSlice.reducer;
