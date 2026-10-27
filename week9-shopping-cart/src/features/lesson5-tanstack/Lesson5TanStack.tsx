import { useState, type FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setSearch,
  setToken,
  logoutClient,
  selectSearch,
  selectToken,
} from './uiSlice';
import {
  usePosts,
  useAddPost,
  useDeletePostOptimistic,
  useUpdatePost,
  type TanStackPost,
} from './tanstackApi';

export const Lesson5TanStack = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const search = useAppSelector(selectSearch);
  const token = useAppSelector(selectToken);

  const { data: posts = [], isPending, isFetching, isError, error } = usePosts(search);
  const addPost = useAddPost();
  const deletePost = useDeletePostOptimistic();
  const updatePost = useUpdatePost(); // BÀI TẬP NHANH

  const [newTitle, setNewTitle] = useState('');
  const [editingPost, setEditingPost] = useState<TanStackPost | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleLogout = () => {
    dispatch(logoutClient());
    queryClient.clear(); // Xóa toàn bộ cache TanStack Query khi đăng xuất
  };

  const handleLogin = () => {
    dispatch(setToken(`token_${Date.now()}`));
  };

  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addPost.mutate(
      { title: newTitle, body: 'Nội dung TanStack Query...', userId: 1 },
      { onSuccess: () => setNewTitle('') }
    );
  };

  const startEdit = (post: TanStackPost) => {
    setEditingPost(post);
    setEditTitle(post.title);
  };

  const handleSaveEdit = () => {
    if (!editingPost || !editTitle.trim()) return;
    updatePost.mutate(
      {
        id: editingPost.id,
        title: editTitle,
        body: editingPost.body,
        userId: editingPost.userId,
      },
      { onSuccess: () => setEditingPost(null) }
    );
  };

  return (
    <div>
      <h1>Bài 5: TanStack Query v5 kết hợp Redux Toolkit</h1>

      {/* Auth sync status */}
      <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Trạng thái tài khoản:</span>
        {token ? (
          <>
            <span style={{ color: 'green', fontWeight: 600 }}>Đã đăng nhập (Token có trong Redux)</span>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Đăng Xuất (Xóa Cache queryClient.clear)
            </button>
          </>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={handleLogin}>
            Đăng Nhập Lại
          </button>
        )}
      </div>

      {/* Search Input (Redux client state driving TanStack queryKey) */}
      <div className="card-box">
        <h3>Tìm Kiếm Bài Viết (State nằm trong Redux, Server State nằm trong TanStack)</h3>
        <input
          type="text"
          placeholder="Nhập từ khóa tìm kiếm..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          style={{ width: '320px', marginRight: '8px' }}
        />
        {search && (
          <button className="btn btn-sm" onClick={() => dispatch(setSearch(''))}>
            Xóa tìm kiếm
          </button>
        )}
        {isFetching && <span style={{ marginLeft: '8px', color: '#0d6efd' }}>Đang tìm kiếm...</span>}
      </div>

      {/* Form Add Post */}
      <form onSubmit={handleAddSubmit} style={{ marginBottom: '20px' }}>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Tiêu đề bài viết mới"
          style={{ width: '320px', marginRight: '8px' }}
        />
        <button type="submit" className="btn btn-primary" disabled={addPost.isPending}>
          {addPost.isPending ? 'Đang thêm...' : 'Thêm Bài Viết'}
        </button>
      </form>

      {/* Form Edit Post (Bài tập nhanh) */}
      {editingPost && (
        <div className="card-box" style={{ background: '#fff9db', marginBottom: '16px' }}>
          <h3>Sửa Bài Viết #{editingPost.id} (useUpdatePost)</h3>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{ width: '300px', marginRight: '8px' }}
          />
          <button
            className="btn btn-warning"
            disabled={updatePost.isPending}
            onClick={handleSaveEdit}
            style={{ marginRight: '6px' }}
          >
            {updatePost.isPending ? 'Đang lưu...' : 'Lưu Thay Đổi'}
          </button>
          <button onClick={() => setEditingPost(null)}>Hủy</button>
        </div>
      )}

      {isPending && <p>Đang tải dữ liệu ban đầu...</p>}
      {isError && <p style={{ color: 'red' }}>Lỗi: {(error as Error)?.message}</p>}

      <h2>Danh Sách Bài Viết ({posts.length})</h2>
      <ul>
        {posts.map((p) => (
          <li
            key={p.id}
            style={{
              padding: '8px 0',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>
              <strong>#{p.id}</strong>: {p.title}
            </span>
            <div>
              <button
                className="btn btn-sm"
                style={{ marginRight: '6px' }}
                onClick={() => startEdit(p)}
              >
                Sửa
              </button>
              <button
                className="btn btn-danger btn-sm"
                disabled={deletePost.isPending && deletePost.variables === p.id}
                onClick={() => deletePost.mutate(p.id)}
              >
                {deletePost.isPending && deletePost.variables === p.id ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
