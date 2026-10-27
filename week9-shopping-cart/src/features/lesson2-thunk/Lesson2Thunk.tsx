import { useEffect, useState, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchUsers,
  login,
  logout,
  selectUsers,
  selectUsersStatus,
  selectUsersError,
} from './usersSlice';
import { addPostExercise } from './exerciseAddPostSlice';

export const Lesson2Thunk = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const usersStatus = useAppSelector(selectUsersStatus);
  const usersError = useAppSelector(selectUsersError);

  const currentUser = useAppSelector((state) => state.users.currentUser);
  const authStatus = useAppSelector((state) => state.users.authStatus);
  const authError = useAppSelector((state) => state.users.authError);

  const exercisePosts = useAppSelector((state) => state.exercisePosts.posts);
  const exerciseStatus = useAppSelector((state) => state.exercisePosts.status);

  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('123456');
  const [unwrapMsg, setUnwrapMsg] = useState<string | null>(null);

  const [postTitle, setPostTitle] = useState('');

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setUnwrapMsg(null);
    try {
      const res = await dispatch(login({ email, password })).unwrap();
      setUnwrapMsg(`Đăng nhập thành công! Token: ${res.token}`);
    } catch (err: any) {
      setUnwrapMsg(`Bắt lỗi qua .unwrap(): ${err}`);
    }
  };

  const handleAddPost = async (e: FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) return;
    try {
      await dispatch(
        addPostExercise({
          title: postTitle,
          body: 'Nội dung bài viết mẫu...',
          userId: 1,
        })
      ).unwrap();
      setPostTitle('');
    } catch (err) {
      alert('Lỗi thêm bài viết');
    }
  };

  return (
    <div>
      <h1>Bài 2: createAsyncThunk trong Redux Toolkit</h1>

      {/* Bài tập nhanh */}
      <div className="card-box" style={{ background: '#fff9db', borderColor: '#ffe066' }}>
        <h3>Bài Tập Nhanh: Thunk <code>addPost</code> (POST + unshift)</h3>
        <form onSubmit={handleAddPost} style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Nhập tiêu đề bài viết mới..."
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            style={{ flex: 1, marginBottom: 0 }}
          />
          <button type="submit" className="btn btn-warning" disabled={exerciseStatus === 'loading'}>
            {exerciseStatus === 'loading' ? 'Đang gửi...' : 'Thêm Bài Viết (unshift)'}
          </button>
        </form>

        <p><strong>Danh sách bài viết sau unshift ({exercisePosts.length}):</strong></p>
        <ul>
          {exercisePosts.map((p) => (
            <li key={p.id}>
              #{p.id} - <strong>{p.title}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="row">
        {/* Users list */}
        <div className="col card-box">
          <h2>Danh Sách Users (fetchUsers)</h2>
          <p>
            Trạng thái: <strong>{usersStatus}</strong>{' '}
            <button className="btn btn-sm" onClick={() => dispatch(fetchUsers())}>
              Tải Lại
            </button>
          </p>

          {usersStatus === 'loading' && <p>Đang tải...</p>}
          {usersStatus === 'failed' && <p style={{ color: 'red' }}>Lỗi: {usersError}</p>}

          <ul>
            {users.map((u) => (
              <li key={u.id} style={{ marginBottom: '4px' }}>
                {u.name} ({u.email})
              </li>
            ))}
          </ul>
        </div>

        {/* Auth unwrap demo */}
        <div className="col card-box">
          <h2>Demo <code>unwrap()</code> &amp; <code>rejectWithValue</code></h2>
          <p>Thử nhập mật khẩu &lt; 6 ký tự để test rejectWithValue:</p>

          {currentUser ? (
            <div>
              <p style={{ color: 'green', fontWeight: 'bold' }}>Đã đăng nhập: {currentUser.email}</p>
              <button className="btn btn-danger btn-sm" onClick={() => dispatch(logout())}>
                Đăng Xuất
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin}>
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={authStatus === 'loading'}>
                {authStatus === 'loading' ? 'Đang xác thực...' : 'Đăng Nhập'}
              </button>
            </form>
          )}

          {authError && <p style={{ color: 'red', marginTop: '8px' }}>Lỗi: {authError}</p>}
          {unwrapMsg && <p style={{ color: '#0d6efd', marginTop: '8px' }}>{unwrapMsg}</p>}
        </div>
      </div>
    </div>
  );
};
