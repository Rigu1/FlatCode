import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Email {
  id: string;
  subject: string;
  from: string;
  snippet: string;
  date: string;
}

interface GmailState {
  emails: Email[];
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
        {
          withCredentials: true,
        },
      );
      return response.data;
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
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.emails = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default gmailSlice.reducer;
