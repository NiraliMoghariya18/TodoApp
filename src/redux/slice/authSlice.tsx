import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
};

interface AuthState {
  users: User[];
  currentUser: User | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  users: [],
  currentUser: null,
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      if (!state.users) {
        state.users = [];
      }
      state.users.push(action.payload);
    },
    loginUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: state => {
      state.isLoggedIn = false;
    },
  },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
