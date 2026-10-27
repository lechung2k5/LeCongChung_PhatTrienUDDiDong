import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface CrudPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PostsCrudState {
  items: CrudPost[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  deletingId: number | null; // BÀI TẬP NHANH: Lưu id bài viết đang được xóa
}

const API = 'https://jsonplaceholder.typicode.com/posts';

const request = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Lỗi máy chủ HTTP: ${res.status}`);
  return res.json();
};

// 1. READ (GET)
export const fetchPosts = createAsyncThunk<CrudPost[]>(
  'postsCrud/fetchPosts',
  async () => {
    return await request(`${API}?_limit=8`);
  }
);

// 2. CREATE (POST)
export const addPost = createAsyncThunk<
  CrudPost,
  { title: string; body: string; userId: number }
>('postsCrud/addPost', async (newPost) => {
  const data = await request(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  });
  // Gán timestamp ID để phân biệt các item tạo mới trên UI
  return {
    ...data,
    id: Date.now(),
  };
});

// 3. UPDATE (PUT)
export const updatePost = createAsyncThunk<
  CrudPost,
  { id: number; title: string; body: string; userId: number }
>('postsCrud/updatePost', async (post) => {
  const data = await request(`${API}/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  // Trả về dữ liệu đã cập nhật
  return {
    ...data,
    id: post.id,
    title: post.title,
    body: post.body,
  };
});

// 4. DELETE (DELETE) - Return id để reducer lọc mảng
export const deletePost = createAsyncThunk<number, number>(
  'postsCrud/deletePost',
  async (id) => {
    // Giả lập network delay ngắn để thấy rõ nút "Đang xóa..."
    await new Promise((resolve) => setTimeout(resolve, 600));
    await request(`${API}/${id}`, { method: 'DELETE' });
    return id; // action.payload
  }
);

const initialState: PostsCrudState = {
  items: [],
  status: 'idle',
  error: null,
  deletingId: null,
};

export const postsCrudSlice = createSlice({
  name: 'postsCrud',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // READ
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Lỗi tải danh sách bài viết';
      })

      // CREATE: Thêm vào đầu mảng (unshift)
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      // UPDATE: Tìm và thay thế phần tử
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // DELETE: BÀI TẬP NHANH - Quản lý deletingId
      .addCase(deletePost.pending, (state, action) => {
        state.deletingId = action.meta.arg; // action.meta.arg chính là id truyền vào thunk
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deletingId = null;
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state) => {
        state.deletingId = null;
      });
  },
});

export const selectPosts = (state: RootState) => state.postsCrud.items;
export const selectPostsStatus = (state: RootState) => state.postsCrud.status;
export const selectPostsError = (state: RootState) => state.postsCrud.error;
export const selectDeletingId = (state: RootState) => state.postsCrud.deletingId;

export default postsCrudSlice.reducer;
