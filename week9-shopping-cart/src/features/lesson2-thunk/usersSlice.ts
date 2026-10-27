import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

export interface UsersState {
  list: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentUser: { email: string; token: string } | null;
  authStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  authError: string | null;
}

// 1. fetchUsers thunk với condition tránh gọi trùng khi đang loading
export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { state: RootState }
>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) {
        return rejectWithValue(`Lỗi máy chủ: ${res.status}`);
      }
      return (await res.json()) as User[];
    } catch (e: any) {
      return rejectWithValue(e.message || 'Không thể kết nối máy chủ');
    }
  },
  {
    condition: (_, { getState }) => {
      // Bỏ qua nếu đang tải
      return getState().users.status !== 'loading';
    },
  }
);

// 2. login thunk minh họa rejectWithValue và .unwrap()
export const login = createAsyncThunk<
  { email: string; token: string },
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  // Giả lập network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Kiểm tra giả lập: nếu password là 'error' hoặc trống thì báo lỗi cấu trúc
  if (!credentials.email.includes('@')) {
    return rejectWithValue('Email không đúng định dạng!');
  }
  if (credentials.password.length < 6) {
    return rejectWithValue('Mật khẩu tối thiểu phải từ 6 ký tự trở lên!');
  }

  return {
    email: credentials.email,
    token: `jwt_token_${Date.now()}_redux_demo`,
  };
});

const initialState: UsersState = {
  list: [],
  status: 'idle',
  error: null,
  currentUser: null,
  authStatus: 'idle',
  authError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.authStatus = 'idle';
      state.authError = null;
    },
    resetUserStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUsers lifecycle
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) ?? action.error.message ?? 'Unknown error';
      })
      // login lifecycle với rejectWithValue
      .addCase(login.pending, (state) => {
        state.authStatus = 'loading';
        state.authError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authStatus = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.authStatus = 'failed';
        state.authError = action.payload ?? action.error.message ?? 'Đăng nhập thất bại';
      });
  },
});

export const { logout, resetUserStatus } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.list;
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersError = (state: RootState) => state.users.error;

export default usersSlice.reducer;
