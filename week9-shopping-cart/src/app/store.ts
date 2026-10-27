import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/cart/productsSlice';
import todosReducer from '../features/lesson1-selectors/todosSlice';
import usersReducer from '../features/lesson2-thunk/usersSlice';
import exerciseAddPostReducer from '../features/lesson2-thunk/exerciseAddPostSlice';
import postsCrudReducer from '../features/lesson3-crud/postsCrudSlice';
import { apiSlice } from '../features/lesson4-rtk-query/apiSlice';
import uiReducer from '../features/lesson5-tanstack/uiSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    todos: todosReducer,
    users: usersReducer,
    exercisePosts: exerciseAddPostReducer,
    postsCrud: postsCrudReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
