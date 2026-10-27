import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// 1. Selector cơ bản trích xuất từ RootState
export const selectItems = (state: RootState) => state.todos.items;
export const selectFilter = (state: RootState) => state.todos.filter;

// Biến theo dõi số lần recompute của memoization phục vụ trực quan hóa
export let visibleTodosComputeCount = 0;

// 2. createSelector: Memoization lọc danh sách todo
export const selectVisibleTodos = createSelector(
  [selectItems, selectFilter],
  (items, filter) => {
    visibleTodosComputeCount += 1;
    if (filter === 'done') return items.filter((t) => t.done);
    if (filter === 'active') return items.filter((t) => !t.done);
    return items;
  }
);

// 3. Selector có tham số (tìm theo ID)
export const selectTodoById = createSelector(
  [selectItems, (_state: RootState, id: number) => id],
  (items, id) => items.find((t) => t.id === id)
);

// 4. BÀI TẬP NHANH: Tính phần trăm todo đã hoàn thành (done / tổng * 100) bằng createSelector
export const selectProgress = createSelector(
  [selectItems],
  (items) => {
    if (items.length === 0) return 0;
    const doneCount = items.filter((t) => t.done).length;
    return Math.round((doneCount / items.length) * 100);
  }
);

// Thống kê chi tiết
export const selectTodoStats = createSelector(
  [selectItems],
  (items) => {
    const total = items.length;
    const completed = items.filter((t) => t.done).length;
    const active = total - completed;
    return { total, completed, active };
  }
);
