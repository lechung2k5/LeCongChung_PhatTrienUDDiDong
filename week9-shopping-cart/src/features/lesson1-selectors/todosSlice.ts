import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export type TodoFilter = 'all' | 'done' | 'active';

export interface TodosState {
  items: Todo[];
  filter: TodoFilter;
}

const initialState: TodosState = {
  items: [
    { id: 1, title: 'Học cú pháp useSelector cơ bản', done: true },
    { id: 2, title: 'Khai báo selector trong createSlice (RTK 2.0)', done: true },
    { id: 3, title: 'Tối ưu hiệu năng với createSelector (Memoization)', done: false },
    { id: 4, title: 'Làm bài tập tính % hoàn thành selectProgress', done: false },
  ],
  filter: 'all',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        title: action.payload.trim(),
        done: false,
      };
      state.items.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload;
    },
  },
  // RTK 2.0+ Selector trong slice
  selectors: {
    selectSliceItems: (sliceState) => sliceState.items,
    selectSliceFilter: (sliceState) => sliceState.filter,
    selectSliceDoneCount: (sliceState) =>
      sliceState.items.filter((t) => t.done).length,
  },
});

export const { addTodo, toggleTodo, deleteTodo, setFilter } = todosSlice.actions;

// Export RTK 2.0 slice selectors
export const {
  selectSliceItems,
  selectSliceFilter,
  selectSliceDoneCount,
} = todosSlice.selectors;

export default todosSlice.reducer;
