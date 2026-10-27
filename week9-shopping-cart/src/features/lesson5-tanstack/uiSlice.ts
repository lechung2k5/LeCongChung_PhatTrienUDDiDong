import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface UiState {
  search: string;
  token: string | null;
  activeCategory: string;
}

const initialState: UiState = {
  search: '',
  token: 'mock_jwt_client_token_abc123',
  activeCategory: 'all',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Client state: Từ khóa tìm kiếm quản lý bởi Redux
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    logoutClient: (state) => {
      state.token = null;
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setSearch, setToken, logoutClient, setActiveCategory } = uiSlice.actions;

export const selectSearch = (state: RootState) => state.ui.search;
export const selectToken = (state: RootState) => state.ui.token;
export const selectActiveCategory = (state: RootState) => state.ui.activeCategory;

export default uiSlice.reducer;
