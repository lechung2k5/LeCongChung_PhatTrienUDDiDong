export const TheoryGuide = () => {
  return (
    <div>
      <h1>Lý Thuyết Redux Toolkit &amp; So Sánh Các Công Cụ</h1>

      <h2>1. Bảng So Sánh 3 Cấp Độ Giỏ Hàng</h2>
      <table>
        <thead>
          <tr>
            <th>Tính Năng</th>
            <th>Level 1 (Cơ Bản)</th>
            <th>Level 2 (Nâng Cao)</th>
            <th>Level 3 (Chuyên Nghiệp)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Thêm/Xóa sản phẩm</td>
            <td>✅ Có</td>
            <td>✅ Có</td>
            <td>✅ Có</td>
          </tr>
          <tr>
            <td>Quản lý số lượng</td>
            <td>❌ Không</td>
            <td>✅ Có</td>
            <td>✅ Có</td>
          </tr>
          <tr>
            <td>Tính tổng tiền</td>
            <td>❌ Không</td>
            <td>✅ Có</td>
            <td>✅ Có</td>
          </tr>
          <tr>
            <td>API async thunk</td>
            <td>❌ Không</td>
            <td>❌ Không</td>
            <td>✅ Có</td>
          </tr>
          <tr>
            <td>LocalStorage persistence</td>
            <td>❌ Không</td>
            <td>❌ Không</td>
            <td>✅ Có</td>
          </tr>
          <tr>
            <td>Mã giảm giá (Coupon)</td>
            <td>❌ Không</td>
            <td>❌ Không</td>
            <td>✅ Có</td>
          </tr>
          <tr>
            <td>Phí vận chuyển &amp; Thuế</td>
            <td>❌ Không</td>
            <td>❌ Không</td>
            <td>✅ Có</td>
          </tr>
          <tr>
            <td>Selectors nâng cao</td>
            <td>❌ Không</td>
            <td>✅ Có</td>
            <td>✅ Có</td>
          </tr>
        </tbody>
      </table>

      <h2>2. So Sánh RTK Query vs TanStack Query (React Query)</h2>
      <table>
        <thead>
          <tr>
            <th>Tiêu chí</th>
            <th>RTK Query</th>
            <th>TanStack Query v5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cài đặt</td>
            <td>Có sẵn trong @reduxjs/toolkit</td>
            <td>Cài riêng (@tanstack/react-query)</td>
          </tr>
          <tr>
            <td>Phụ thuộc Redux</td>
            <td>Có (dữ liệu nằm trong store)</td>
            <td>Không (độc lập, không cần Redux)</td>
          </tr>
          <tr>
            <td>Làm mới sau khi ghi</td>
            <td>Khai báo tags: invalidatesTags</td>
            <td>Hàm gọi: invalidateQueries</td>
          </tr>
          <tr>
            <td>Trường hợp sử dụng</td>
            <td>Dự án đã dùng Redux làm state chính</td>
            <td>Muốn tách biệt server state và client state</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Tóm Tắt 5 Bài Giảng</h2>
      <div className="card-box">
        <h3>Bài 1: Selector</h3>
        <p>Hàm nhận <code>state</code> trả về dữ liệu component cần. Dùng <code>createSelector</code> để memoize tính toán mảng/object mới.</p>
      </div>

      <div className="card-box">
        <h3>Bài 2: createAsyncThunk</h3>
        <p>Sinh ra 3 action: <code>pending</code>, <code>fulfilled</code>, <code>rejected</code>. Xử lý trong <code>extraReducers</code>. Dùng <code>rejectWithValue</code> trả lỗi cấu trúc và <code>unwrap()</code> tại component.</p>
      </div>

      <div className="card-box">
        <h3>Bài 3: CRUD với createAsyncThunk</h3>
        <p>Gồm 4 thao tác: Read, Create, Update, Delete. Thunk return đúng dữ liệu (mục mới hoặc id khi xóa) để reducer cập nhật mảng.</p>
      </div>

      <div className="card-box">
        <h3>Bài 4: RTK Query</h3>
        <p>Tự động hóa toàn bộ việc gọi API, cache dữ liệu và tự sinh hooks (<code>useGetPostsQuery</code>...). Tự động làm mới cache qua <code>providesTags</code> và <code>invalidatesTags</code>.</p>
      </div>

      <div className="card-box">
        <h3>Bài 5: TanStack Query kết hợp Redux Toolkit</h3>
        <p>Server state giao cho TanStack Query quản lý. Client state (từ khóa tìm kiếm, token đăng nhập) giao cho Redux Toolkit quản lý.</p>
      </div>
    </div>
  );
};
