import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface PostItem {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface ExercisePostState {
  posts: PostItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// BÀI TẬP NHANH BÀI 2: Thunk addPost với POST request và rejectWithValue
export const addPostExercise = createAsyncThunk<
  PostItem,
  { title: string; body: string; userId: number },
  { rejectValue: string }
>('exercise/addPost', async (newPost, { rejectWithValue }) => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    });
    if (!res.ok) {
      return rejectWithValue('Không thể thêm bài viết (HTTP Error)');
    }
    const data = await res.json();
    // JSONPlaceholder trả về id: 101, ta kết hợp thêm Date.now() để UI hiển thị phân biệt
    return {
      ...data,
      id: Date.now(),
    };
  } catch (err: any) {
    return rejectWithValue(err.message || 'Không thể kết nối máy chủ');
  }
});

const initialState: ExercisePostState = {
  posts: [
    {
      id: 1,
      title: 'Bài viết mẫu ban đầu trong state',
      body: 'Nội dung khởi tạo để minh họa tính năng thêm bài viết mới vào đầu danh sách (unshift).',
      userId: 1,
    },
  ],
  status: 'idle',
  error: null,
};

export const exerciseAddPostSlice = createSlice({
  name: 'exerciseAddPost',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPostExercise.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Thêm bài viết mới vào đầu mảng posts khi thành công
      .addCase(addPostExercise.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.unshift(action.payload);
      })
      // Hiển thị lỗi khi thất bại
      .addCase(addPostExercise.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Lỗi khi thêm bài viết';
      });
  },
});

export default exerciseAddPostSlice.reducer;
