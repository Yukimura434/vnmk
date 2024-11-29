// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const register = createAsyncThunk(
  'user/register',
  async (payload) => {
    const data = await userApi.register(payload);
    return data.userId;
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (payload) => {
    const data = await userApi.login(payload);
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('role', data.role);
    //Demo 
    //============================================================================================================================
    // return data.userId
    //============================================================================================================================
    return {
      userId: data.userId,
      access_token: data.access_token,
      role: data.role,
    };
  }
);

export const update = createAsyncThunk(
  'user/update',
  async (payload) => {
    const { id, ...userData } = payload;
    const response = await userApi.update(id, userData);
    return response.data.userId; 
  }
);



const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {
      userId: localStorage.getItem('userId') || null,
      accessToken: localStorage.getItem('access_token') || null,
      role: localStorage.getItem('role') || null,
    },
    settings: {},
  },
  reducers: {
    logout(state) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      // localStorage.removeItem('cart');
      state.current = {};
      state.settings = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
