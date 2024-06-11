import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface GmailState {
  emails: { id: string }[]; // 이메일 형식을 명확히 정의합니다.
  loading: boolean;
  error: string | null;
}

const initialState: GmailState = {
  emails: [],
  loading: false,
  error: null,
};

export const fetchEmails = createAsyncThunk(
  'gmail/fetchEmails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/google/emails',
        { withCredentials: true },
      );
      return response.data.messages;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const gmailSlice = createSlice({
  name: 'gmail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.loading = false;
        state.emails = action.payload;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default gmailSlice.reducer;
