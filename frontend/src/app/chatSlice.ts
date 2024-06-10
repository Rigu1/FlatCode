import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosConfig';

interface ChatState {
  prompt: string;
  response: string;
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  prompt: '',
  response: '',
  loading: false,
  error: null,
};

export const fetchChatResponse = createAsyncThunk(
  'chat/fetchChatResponse',
  async (prompt: string, { rejectWithValue }) => {
    try {
      console.log('Sending chat request'); // 디버깅 로그 추가
      const response = await axiosInstance.post('/chat', { prompt });
      console.log('Chat response:', response.data); // 디버깅 로그 추가
      return response.data;
    } catch (error: any) {
      let errorMessage = 'Failed to get response from ChatGPT';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.error || errorMessage;
      }
      console.error('Chat error:', errorMessage); // 디버깅 로그 추가
      return rejectWithValue(errorMessage);
    }
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setPrompt(state, action) {
      state.prompt = action.payload;
    },
    clearResponse(state) {
      state.response = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload.choices[0].message.content;
      })
      .addCase(fetchChatResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPrompt, clearResponse } = chatSlice.actions;
export default chatSlice.reducer;
