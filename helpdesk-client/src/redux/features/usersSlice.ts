import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../services/apiSlice';

interface User { 
  id: number;
  name: string; 
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getAllUsers.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.getAllUsers.matchFulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addMatcher(api.endpoints.getAllUsers.matchRejected, (state, action: any) => {
        state.loading = false;
         state.error = action.payload?.message || 'Failed to load users';
      });
  },
});

export const { setUsers, setLoading, setError } = usersSlice.actions;

export default usersSlice.reducer;
