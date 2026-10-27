import { useState, type FormEvent } from 'react';
import {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  type RtkPost,
} from './apiSlice';

export const Lesson4RTKQuery = () => {
  const { data: posts = [], isLoading, isError, isFetching, refetch } = useGetPostsQuery();
  const [addPost, { isLoading: isAdding }] = useAddPostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation(); // BÀI TẬP NHANH
  const [deletePost] = useDeletePostMutation();

  const [title, setTitle] = useState('');
  const [editingPost, setEditingPost] = useState<RtkPost | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await addPost({ title, body: 'Nội dung RTK Query...', userId: 1 }).unwrap();
      setTitle('');
    } catch (err) {
      alert('Thêm bài viết thất bại');
    }
  };

  const startEdit = (post: RtkPost) => {
    setEditingPost(post);
    setEditTitle(post.title);
  };

  const handleSaveEdit = async () => {
    if (!editingPost || !editTitle.trim()) return;
    try {
      await updatePost({
        id: editingPost.id,
        title: editTitle,
        body: editingPost.body,
        userId: editingPost.userId,
      }).unwrap();
      setEditingPost(null);
    } catch (err) {
      alert('Lưu thất bại');
    }
  };

  if (isLoading) return <p>Đang tải danh sách từ RTK Query (isLoading)...</p>;
  if (isError) return <p style={{ color: 'red' }}>Có lỗi xảy ra khi gọi RTK Query.</p>;

  return (
    <div>
      <h1>Bài 4: RTK Query</h1>

      <div className="alert alert-info">
        <strong>Bài Tập Nhanh:</strong> Endpoint <code>updatePost</code> sử dụng <code>invalidatesTags</code> theo <code>id</code> và hiển thị <strong>"Đang lưu..."</strong> bằng <code>isLoading</code> của mutation.
      </div>

      <div style={{ marginBottom: '14px' }}>
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Đang làm mới cache...' : 'Làm Mới Cache (refetch)'}
        </button>
      </div>

      {/* Form Add Post */}
      <form onSubmit={handleAdd} style={{ marginBottom: '20px' }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề bài viết mới"
          style={{ width: '320px', marginRight: '8px' }}
        />
        <button type="submit" className="btn btn-primary" disabled={isAdding}>
          {isAdding ? 'Đang thêm...' : 'Thêm Bài Viết'}
        </button>
      </form>

      {/* Edit Form nếu đang sửa */}
      {editingPost && (
        <div className="card-box" style={{ background: '#fff9db', marginBottom: '16px' }}>
          <h3>Sửa Bài Viết #{editingPost.id}</h3>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{ width: '300px', marginRight: '8px' }}
          />
          <button
            className="btn btn-warning"
            disabled={isUpdating}
            onClick={handleSaveEdit}
            style={{ marginRight: '6px' }}
          >
            {isUpdating ? 'Đang lưu...' : 'Lưu'}
          </button>
          <button onClick={() => setEditingPost(null)}>Hủy</button>
        </div>
      )}

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
                onClick={() => deletePost(p.id)}
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
