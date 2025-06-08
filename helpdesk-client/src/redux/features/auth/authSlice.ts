import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
  roles: string[];
  dateCreated: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
}

const rawUser = localStorage.getItem('user');
let parsedUser: User | null = null;

try {
  if (rawUser && rawUser !== 'undefined') {
    parsedUser = JSON.parse(rawUser) as User;
  }
} catch (err) {
  console.warn('Error parsing user from localStorage:', err);
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: parsedUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: User }>) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
