import { useState, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
} from './todosSlice';
import {
  selectVisibleTodos,
  selectProgress,
  selectTodoStats,
  selectFilter,
} from './todoSelectors';

export const Lesson1Selectors = () => {
  const dispatch = useAppDispatch();
  const visibleTodos = useAppSelector(selectVisibleTodos);
  const currentFilter = useAppSelector(selectFilter);
  const progressPercent = useAppSelector(selectProgress);
  const stats = useAppSelector(selectTodoStats);

  const [inputTitle, setInputTitle] = useState('');

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) return;
    dispatch(addTodo(inputTitle));
    setInputTitle('');
  };

  return (
    <div>
      <h1>Bài 1: Selector trong Redux Toolkit</h1>

      {/* Bài tập nhanh: selectProgress */}
      <div className="card-box" style={{ background: '#e8f5e9', borderColor: '#c8e6c9' }}>
        <h3>Bài Tập Nhanh: <code>selectProgress</code></h3>
        <p>
          Tiến độ hoàn thành: <strong>{progressPercent}%</strong> ({stats.completed}/{stats.total} nhiệm vụ)
        </p>
        <div className="progress-bar-container">
          <div
            className="progress-bar-inner"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <h2>Ứng Dụng Todo List</h2>

      {/* Form thêm todo */}
      <form onSubmit={handleAdd} style={{ marginBottom: '14px' }}>
        <input
          type="text"
          placeholder="Nhập tiêu đề việc cần làm..."
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          style={{ width: '300px', marginRight: '8px' }}
        />
        <button type="submit" className="btn btn-primary" disabled={!inputTitle.trim()}>
          Thêm Todo
        </button>
      </form>

      {/* Filter buttons */}
      <div style={{ marginBottom: '14px' }}>
        <span style={{ marginRight: '8px' }}>Bộ lọc:</span>
        <button
          className={currentFilter === 'all' ? 'btn-primary' : ''}
          style={{ marginRight: '6px' }}
          onClick={() => dispatch(setFilter('all'))}
        >
          Tất cả ({stats.total})
        </button>
        <button
          className={currentFilter === 'active' ? 'btn-primary' : ''}
          style={{ marginRight: '6px' }}
          onClick={() => dispatch(setFilter('active'))}
        >
          Chưa xong ({stats.active})
        </button>
        <button
          className={currentFilter === 'done' ? 'btn-primary' : ''}
          onClick={() => dispatch(setFilter('done'))}
        >
          Đã xong ({stats.completed})
        </button>
      </div>

      {/* Danh sách Todo */}
      {visibleTodos.length === 0 ? (
        <p style={{ color: '#6c757d' }}>Không có todo nào trong mục này.</p>
      ) : (
        <div style={{ marginBottom: '16px' }}>
          {visibleTodos.map((todo) => (
            <div key={todo.id} className="item-row">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                />
                <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                  {todo.title}
                </span>
              </label>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="alert alert-info">
        <strong>Tóm tắt:</strong>
        <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
          <li>Selector là hàm <code>(state) =&gt; dữ liệu</code>.</li>
          <li>Dùng <code>createSelector</code> (memoization) khi có lọc, tính toán mảng mới.</li>
          <li>Bài tập nhanh <code>selectProgress = createSelector([selectItems], ...)</code> tính toán không lưu thừa vào Store.</li>
        </ul>
      </div>
    </div>
  );
};
