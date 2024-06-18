import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosConfig';

interface AuthState {
  user: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    userCredentials: { username: string; password: string; profession: string },
    { rejectWithValue },
  ) => {
    try {
      console.log('Sending register request'); // 디버깅 로그 추가
      const response = await axiosInstance.post(
        '/auth/register',
        userCredentials,
      );
      console.log('Register response:', response.data); // 디버깅 로그 추가
      return response.data;
    } catch (error: any) {
      let errorMessage = 'Failed to register';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.error || errorMessage;
      }
      console.error('Register error:', errorMessage); // 디버깅 로그 추가
      return rejectWithValue(errorMessage);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    userCredentials: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      console.log('Sending login request'); // 디버깅 로그 추가
      const response = await axiosInstance.post('/auth/login', userCredentials);
      console.log('Login response:', response.data); // 디버깅 로그 추가
      return response.data;
    } catch (error: any) {
      let errorMessage = 'Failed to login';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.error || errorMessage;
      }
      console.error('Login error:', errorMessage); // 디버깅 로그 추가
      return rejectWithValue(errorMessage);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
