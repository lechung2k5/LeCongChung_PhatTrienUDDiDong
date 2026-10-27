import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface RtkPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    // 1. GET posts query với providesTags
    getPosts: builder.query<RtkPost[], void>({
      query: () => '/posts?_limit=8',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post' as const, id: 'LIST' },
            ]
          : [{ type: 'Post' as const, id: 'LIST' }],
    }),

    // 2. GET post by id
    getPostById: builder.query<RtkPost, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),

    // 3. POST addPost mutation với invalidatesTags: ['LIST']
    addPost: builder.mutation<
      RtkPost,
      { title: string; body: string; userId: number }
    >({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
      // Optimistic update để dữ liệu xuất hiện ngay cả với API giả lập JSONPlaceholder
      async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
        const tempId = Date.now();
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
            draft.unshift({
              ...newPost,
              id: tempId,
            });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // 4. PUT updatePost mutation - BÀI TẬP NHANH
    updatePost: builder.mutation<
      RtkPost,
      { id: number; title: string; body?: string; userId?: number }
    >({
      query: ({ id, ...patch }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Post', id }],
      // Optimistic update sửa bài viết ngay lập tức trên giao diện
      async onQueryStarted({ id, title, body }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
            const post = draft.find((p) => p.id === id);
            if (post) {
              post.title = title;
              if (body) post.body = body;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // 5. DELETE deletePost mutation với Optimistic Update
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Cập nhật cache tức thì trước khi server phản hồi
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
            const index = draft.findIndex((p) => p.id === id);
            if (index !== -1) draft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = apiSlice;
