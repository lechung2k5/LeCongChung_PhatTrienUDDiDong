import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface TanStackPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const API = 'https://jsonplaceholder.typicode.com/posts';

const request = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
  return res.json();
};

// 1. Fetch posts with optional search filter
export const fetchPosts = async (search: string = ''): Promise<TanStackPost[]> => {
  const url = search.trim()
    ? `${API}?q=${encodeURIComponent(search.trim())}&_limit=8`
    : `${API}?_limit=8`;
  return await request(url);
};

// 2. Query Hook: usePosts kết hợp tham số search từ Redux
export function usePosts(search: string) {
  return useQuery({
    queryKey: ['posts', { search }], // search đổi -> key đổi -> TanStack tự gọi lại
    queryFn: () => fetchPosts(search),
    staleTime: 60_000, // 60 giây dữ liệu được coi là mới
    placeholderData: (prev) => prev, // Giữ lại kết quả cũ trong lúc đang tải từ khóa mới
  });
}

// 3. Mutation Hook: Thêm bài viết mới
export function useAddPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPost: { title: string; body: string; userId: number }) =>
      request(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      }),
    onSuccess: (created) => {
      // Cập nhật lạc quan cache danh sách để hiển thị ngay
      queryClient.setQueryData(['posts', { search: '' }], (old: TanStackPost[] = []) => [
        { ...created, id: Date.now() },
        ...old,
      ]);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

// 4. Mutation Hook: Xóa bài viết với Optimistic Update đầy đủ 4 bước
export function useDeletePostOptimistic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => request(`${API}/${id}`, { method: 'DELETE' }),

    // Bước 1 & 2 & 3: Hủy refetch, lưu previous snapshot, sửa cache ngay lập tức
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Lấy snapshot cache hiện tại
      const previousData = queryClient.getQueryData<TanStackPost[]>(['posts', { search: '' }]);

      // Sửa cache ngay lập tức
      queryClient.setQueriesData<TanStackPost[]>({ queryKey: ['posts'] }, (old = []) =>
        old.filter((p) => p.id !== id)
      );

      return { previousData };
    },

    // Bước 4: Lỗi thì hoàn tác (rollback)
    onError: (_err, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['posts', { search: '' }], context.previousData);
      }
    },

    onSettled: () => {
      // Đồng bộ lại với server
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

// 5. BÀI TẬP NHANH BÀI 5: Hook useUpdatePost cho nút "Sửa"
// Sau khi thành công: cập nhật bài chi tiết và invalidate query danh sách
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: { id: number; title: string; body: string; userId: number }) =>
      request(`${API}/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      }),
    onSuccess: (updated, variables) => {
      const fullUpdated = { ...variables, ...updated };
      // 1. Cập nhật bài chi tiết trong cache
      queryClient.setQueryData(['posts', fullUpdated.id], fullUpdated);

      // 2. Cập nhật trực tiếp trong danh sách posts
      queryClient.setQueriesData<TanStackPost[]>({ queryKey: ['posts'] }, (old = []) =>
        old.map((p) => (p.id === fullUpdated.id ? fullUpdated : p))
      );

      // 3. Làm mới danh sách
      queryClient.invalidateQueries({ queryKey: ['posts'], exact: true });
    },
  });
}
