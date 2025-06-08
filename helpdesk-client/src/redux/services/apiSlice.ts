import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  id: number;
  name: string; 
}

export interface UserProfileInput { 
  username: string;
  password: string;
}

export interface UserProfile { 
  id: number;
  userName: string;
  roles: string[]; 
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5003/api/HR',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => '/all-users',
      providesTags: ['Users'],
    }),
    getUserProfile: builder.mutation<UserProfile, UserProfileInput>({
      query: (credentials) => ({
        url: '/SignIn',
        method: 'POST',
        body: credentials,
      }),
    }),
    updateUser: builder.mutation<User, Partial<User> & { id: number }>({
      query: (userData) => ({
        url: `/update-user/${userData.id}`,
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/delete-user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserProfileMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = api;
