# 📱 Phát Triển Ứng Dụng Di Động (React Native)

> **Học phần:** Phát Triển Ứng Dụng Di Động  
> **Sinh viên:** Lê Công Chung  
> **MSSV:** 23637071  
> **Công nghệ:** React Native, Expo, TypeScript, React Navigation / Expo Router

---

## 📅 Lộ Trình & Nội Dung 7 Tuần Thực Hành

| Tuần | Thư mục | Ngày Commit | Chủ đề / Nội dung chính | Công nghệ sử dụng |
| :---: | :--- | :---: | :--- | :--- |
| **01** | [`week1-basics/`](./week1-basics) | `25/08/2026` | **React Native Core Components & Hooks**<br>• Tổng hợp 8 bài tập: User Card, Counter, Todo List, Custom Button, Live Input, Loading Wrapper, Gender Selector, App Button | `React Native`, `Expo Router`, `Hooks` |
| **02 - 03** | [`week3-bookstore/`](./week3-bookstore) | `08/09 - 15/09/2026` | **Giao diện App Nhà Sách (Bookstore)**<br>• Header, Danh mục thể loại (CategoryChips), Danh sách & Lưới sách (BookCard, BookGrid) | `React Native`, `Flexbox Layout`, `ScrollView` |
| **05** | [`week5-navigation/`](./week5-navigation) | `22/09/2026` | **Navigation & State Passing (Chọn màu điện thoại)**<br>• Màn hình chi tiết sản phẩm Vsmart và màn hình chọn màu sắc, truyền tham số dữ liệu | `Expo Router`, `Navigation Params` |
| **06** | [`week6-movie-app/`](./week6-movie-app) | `29/09/2026` | **Movie App (MockAPI Integration)**<br>• Gọi API bất đồng bộ từ MockAPI, hiển thị FlatList chuyển đổi linh hoạt dạng danh sách (1 cột) / lưới (2 cột), tính năng Pull-to-refresh | `Fetch API`, `FlatList`, `Pull-to-refresh` |
| **07** | [`week7-bike-app/`](./week7-bike-app) | `06/10/2026` | **Cửa hàng Xe Đạp Thể Thao (Bike Shop)**<br>• Ứng dụng gồm 3 màn hình với React Navigation: Màn hình chào, Danh mục lọc theo loại xe (Roadbike, Mountain bike), và Màn hình chi tiết sản phẩm & Thêm vào giỏ | `React Navigation (Native Stack)`, `State Management` |

---

## 📂 Cấu Trúc Dự Án

```plaintext
LeCongChung_PhatTrienUDDiDong/
├── week1-basics/          # Tuần 1: 8 bài tập cơ bản React Native
│   ├── src/app/           # Màn hình điều hướng chọn bài (Bài 1 -> Bài 8)
│   ├── src/week1/         # Chi tiết source code từng bài tập
│   └── package.json
├── week3-bookstore/       # Tuần 2 - 3: Giao diện ứng dụng Nhà sách
│   ├── components/        # BookCard, BookGrid, CategoryChips, Header
│   ├── App.tsx
│   └── package.json
├── week5-navigation/      # Tuần 5: Chọn màu sản phẩm & Điều hướng
│   ├── Screen/            # screen1.tsx, screen2.tsx
│   ├── image/             # Hình ảnh sản phẩm theo màu (bạc, đỏ, đen, xanh)
│   └── package.json
├── week6-movie-app/       # Tuần 6: Movie App gọi MockAPI
│   ├── components/        # MovieCard.tsx
│   ├── App.tsx
│   └── package.json
├── week7-bike-app/        # Tuần 7: Bike Shop App đa màn hình
│   ├── components/        # Screen_1.tsx, Screen_2.tsx, Screen_3.tsx
│   ├── assets/image/      # Hình ảnh các dòng xe đạp
│   ├── App.tsx
│   └── package.json
└── README.md              # Tài liệu tổng quan
```

---

## 🚀 Hướng Dẫn Chạy Từng Dự Án

Mỗi thư mục tuần là một ứng dụng Expo độc lập. Để chạy bất kỳ tuần nào:

1. **Di chuyển vào thư mục tuần tương ứng:**
   ```bash
   cd week1-basics
   # hoặc: cd week3-bookstore
   # hoặc: cd week5-navigation
   # hoặc: cd week6-movie-app
   # hoặc: cd week7-bike-app
   ```

2. **Cài đặt thư viện phụ thuộc (nếu chưa có):**
   ```bash
   npm install
   ```

3. **Khởi chạy ứng dụng:**
   ```bash
   npx expo start
   ```

4. **Trải nghiệm ứng dụng:**
   - Quét mã QR bằng ứng dụng **Expo Go** trên thiết bị di động (Android / iOS).
   - Nhấn `a` để mở trên Android Emulator.
   - Nhấn `w` để mở trên Web Browser.
