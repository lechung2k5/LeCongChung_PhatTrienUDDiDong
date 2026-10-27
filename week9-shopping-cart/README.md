# Week 9: Redux Toolkit & Giỏ Hàng Trực Tuyến

Dự án hoàn chỉnh triển khai bài tập **Redux Toolkit - Hướng dẫn Chi Tiết & Dự Án Giỏ Hàng** và **Tổng hợp 5 Bài giảng Redux Toolkit & TanStack Query**.

---

## 🚀 Cách Khởi Động Dự Án

```bash
cd week9-shopping-cart
npm install
npm run dev
```

Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:5173/`

---

## 📁 Cấu Trúc Thư Mục

```
src/
├── app/
│   ├── store.ts            # Cấu hình Redux Store tập trung (Cart, Products, Todos, Users, Posts, UI, RTK Query)
│   └── hooks.ts            # Typed hooks: useAppDispatch, useAppSelector
├── components/
│   ├── Navbar.tsx          # Thanh điều hướng chuyển đổi linh hoạt giữa 3 Level và 5 Bài học
│   └── Footer.tsx          # Chân trang hiện đại
├── features/
│   ├── cart/               # DỰ ÁN GIỎ HÀNG (3 CẤP ĐỘ)
│   │   ├── cartSlice.ts    # Level 1, 2, 3: Thêm, xóa, tăng/giảm số lượng, coupon, vận chuyển, LocalStorage
│   │   ├── cartSelectors.ts# Selectors: selectCartItems, selectCartItemCount, selectCartTotal, selectCartSummary
│   │   ├── productsSlice.ts# createAsyncThunk fetchProducts gọi API với fallback dữ liệu
│   │   ├── Level1Cart.tsx  # Giao diện Giỏ Hàng Cơ Bản (Level 1)
│   │   ├── Level2Cart.tsx  # Giao diện Giỏ Hàng Nâng Cao (Level 2)
│   │   └── Level3Cart.tsx  # Giao diện Giỏ Hàng Chuyên Nghiệp (Level 3) + Modal Thanh Toán
│   ├── lesson1-selectors/  # BÀI 1: SELECTOR & MEMOIZATION
│   │   ├── todosSlice.ts   # RTK 2.0+ selectors trực tiếp trong createSlice
│   │   ├── todoSelectors.ts# createSelector memoization + BÀI TẬP selectProgress
│   │   └── Lesson1Selectors.tsx # Todo App tương tác & thanh tiến độ hoàn thành
│   ├── lesson2-thunk/      # BÀI 2: CREATEASYNCTHUNK & VÒNG ĐỜI
│   │   ├── usersSlice.ts   # fetchUsers, login với rejectWithValue, unwrap(), condition
│   │   ├── exerciseAddPostSlice.ts # BÀI TẬP: addPost gửi POST & unshift vào đầu mảng
│   │   └── Lesson2Thunk.tsx# Giao diện test lifecycle, auth unwrap & thêm bài viết
│   ├── lesson3-crud/       # BÀI 3: CRUD VỚI CREATEASYNCTHUNK
│   │   ├── postsCrudSlice.ts # Read, Create, Update, Delete + BÀI TẬP deletingId
│   │   └── Lesson3Crud.tsx # Quản lý bài viết với JSONPlaceholder, nút "Đang xóa..."
│   ├── lesson4-rtk-query/  # BÀI 4: RTK QUERY
│   │   ├── apiSlice.ts     # createApi, baseQuery, tagTypes, providesTags, invalidatesTags, optimistic update
│   │   └── Lesson4RTKQuery.tsx # CRUD với auto-hooks + BÀI TẬP updatePost "Đang lưu..."
│   ├── lesson5-tanstack/   # BÀI 5: TANSTACK QUERY V5 KẾT HỢP REDUX TOOLKIT
│   │   ├── uiSlice.ts      # Client state (từ khóa search, auth token)
│   │   ├── tanstackApi.ts  # Server state với TanStack Query v5 + BÀI TẬP useUpdatePost
│   │   └── Lesson5TanStack.tsx # Kết hợp Search Redux vào queryKey, xóa lạc quan, clear cache đăng xuất
│   └── docs/
│       └── TheoryGuide.tsx # Sổ tay lý thuyết, ma trận so sánh 3 level & so sánh RTK Query vs TanStack Query
├── App.tsx                 # Container chính hiển thị các tab
├── app.tsx                 # Alias tương thích
├── index.css               # Hệ thống giao diện hiện đại (Dark theme, glassmorphism, responsive)
└── main.tsx                # Tích hợp Redux Provider + TanStack QueryClientProvider + Devtools
```

---

## 🎯 Chi Tiết Thực Hiện Các Yêu Cầu

### Phần 1: Dự Án Giỏ Hàng (3 Mức Độ)
1. **Level 1 (Cơ Bản):**
   - Thêm sản phẩm vào giỏ (`addToCart`)
   - Xóa sản phẩm khỏi giỏ (`removeFromCart`)
   - Xem danh sách giỏ hàng & Xóa tất cả (`clearCart`)
2. **Level 2 (Nâng Cao):**
   - Quản lý số lượng `quantity`, kiểm tra tránh trùng lặp khi thêm
   - Tăng/giảm số lượng với `+` và `-`
   - Selectors: `selectCartItemCount`, `selectCartTotal`
3. **Level 3 (Chuyên Nghiệp):**
   - Tự động đồng bộ và khôi phục từ `localStorage` (`cartItems`)
   - `createAsyncThunk` (`fetchProducts`) tải sản phẩm từ API
   - Trạng thái loading, error và fallback dữ liệu
   - Mã giảm giá: `SUMMER10` (-10%), `SPECIAL20` (-20%)
   - Phí vận chuyển: Miễn phí ($0), Tiêu chuẩn ($10), Hỏa tốc ($25)
   - Thuế VAT 10%
   - Selectors: `selectSubtotal`, `selectDiscount`, `selectTax`, `selectCartTotal`, `selectCartSummary`
   - Modal thanh toán và xuất hóa đơn xác nhận đơn hàng thành công

---

### Phần 2: 5 Bài Giảng & Bài Tập Nhanh
- **Bài 1 - Selector:**
  - Cú pháp `useSelector`, selectors trong `createSlice` (RTK 2.0+)
  - `createSelector` memoization lọc todo theo trạng thái
  - **Bài tập nhanh:** Selector `selectProgress` tính `% todo đã hoàn thành` (`done / total * 100`) hiển thị thanh tiến độ sinh động.
- **Bài 2 - createAsyncThunk:**
  - 3 trạng thái `pending`, `fulfilled`, `rejected`
  - `rejectWithValue` gửi thông điệp lỗi có cấu trúc
  - `unwrap()` bắt lỗi trực tiếp bằng `try/catch`
  - Chặn gọi trùng bằng `condition` trong `thunkAPI`
  - **Bài tập nhanh:** Thunk `addPost` gửi POST tới `https://jsonplaceholder.typicode.com/posts` và đưa vào đầu mảng với `unshift`.
- **Bài 3 - CRUD với createAsyncThunk:**
  - Đầy đủ 4 thao tác Read (`fetchPosts`), Create (`addPost`), Update (`updatePost`), Delete (`deletePost`)
  - **Bài tập nhanh:** Trạng thái `deletingId` trong extraReducers giúp nút Xóa của đúng bài viết đó hiển thị *"Đang xóa..."* và bị vô hiệu hóa.
- **Bài 4 - RTK Query:**
  - `createApi`, `fetchBaseQuery`, tích hợp store reducer & middleware
  - Tự động làm mới cache bằng Tags: `providesTags` & `invalidatesTags`
  - Optimistic update với `onQueryStarted` và `updateQueryData`
  - **Bài tập nhanh:** Endpoint `updatePost` làm mất hiệu lực tag theo id, hiển thị *"Đang lưu..."* qua thuộc tính `isLoading` của mutation.
- **Bài 5 - TanStack Query v5 + Redux Toolkit:**
  - Phân tách Client State (Redux: search, token) và Server State (TanStack: cache, refetch)
  - `queryKey: ['posts', { search }]` tự động tải lại khi Redux state thay đổi
  - Optimistic delete 4 bước: cancelQueries, snapshot previous, mutate cache, rollback khi lỗi
  - Đồng bộ khi đăng xuất: xóa token Redux và `queryClient.clear()`
  - **Bài tập nhanh:** Custom hook `useUpdatePost` cập nhật bài viết chi tiết và làm mới danh sách `invalidateQueries`.

---

### Sổ Tay Lý Thuyết (Theory Guide)
- 6 khái niệm cốt lõi: Store, Slice, Actions, Reducers, Dispatch, Selectors
- Bảng so sánh ma trận 3 Level Giỏ hàng
- Bảng so sánh chuyên sâu giữa **RTK Query** và **TanStack Query**
- Code Cheat Sheet tổng hợp các mẫu code quan trọng nhất.
