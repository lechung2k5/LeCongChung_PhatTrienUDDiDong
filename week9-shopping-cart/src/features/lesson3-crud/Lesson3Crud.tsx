import { useEffect, useState, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
  selectPosts,
  selectPostsStatus,
  selectPostsError,
  selectDeletingId,
  type CrudPost,
} from './postsCrudSlice';

export const Lesson3Crud = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectPostsStatus);
  const error = useAppSelector(selectPostsError);
  const deletingId = useAppSelector(selectDeletingId); // BÀI TẬP NHANH

  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // READ khi component mount
  useEffect(() => {
    if (status === 'idle') dispatch(fetchPosts());
  }, [status, dispatch]);

  // CREATE hoặc UPDATE
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (editingId) {
        await dispatch(
          updatePost({ id: editingId, title, body: 'Nội dung cập nhật...', userId: 1 })
        ).unwrap();
      } else {
        await dispatch(addPost({ title, body: 'Nội dung bài viết mới...', userId: 1 })).unwrap();
      }
      setTitle('');
      setEditingId(null);
    } catch (err: any) {
      alert('Thao tác thất bại: ' + err.message);
    }
  };

  const startEdit = (post: CrudPost) => {
    setEditingId(post.id);
    setTitle(post.title);
  };

  return (
    <div>
      <h1>Bài 3: CRUD với createAsyncThunk</h1>

      <div className="alert alert-info">
        <strong>Bài Tập Nhanh:</strong> Nút Xóa sử dụng <code>deletingId === p.id</code> để hiển thị <em>"Đang xóa..."</em> và vô hiệu hóa nút trong khi đang gọi API.
      </div>

      {/* Form Create / Update */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề bài viết"
          style={{ width: '320px', marginRight: '8px' }}
        />
        <button type="submit" className="btn btn-primary" style={{ marginRight: '8px' }}>
          {editingId ? 'Cập nhật' : 'Thêm'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setTitle('');
            }}
          >
            Hủy
          </button>
        )}
      </form>

      {status === 'loading' && <p>Đang tải danh sách bài viết...</p>}
      {status === 'failed' && <p style={{ color: 'red' }}>Lỗi: {error}</p>}

      {/* Posts List */}
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
                disabled={deletingId === p.id}
                onClick={() => dispatch(deletePost(p.id))}
              >
                {deletingId === p.id ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
