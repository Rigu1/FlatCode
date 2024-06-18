import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface TranslateState {
  translatedText: string;
  loading: boolean;
  error: string | null;
}

const initialState: TranslateState = {
  translatedText: '',
  loading: false,
  error: null,
};

export const translateText = createAsyncThunk(
  'translate/translateText',
  async (
    { text, source, target }: { text: string; source: string; target: string },
    { rejectWithValue },
  ) => {
    try {
      console.log('Sending request:', { text, source, target }); // 디버깅 로그 추가
      const response = await axios.post('http://localhost:5000/api/translate', {
        text,
        source,
        target,
      });
      console.log('API response:', response.data); // 디버깅 로그 추가
      return response.data;
    } catch (error: any) {
      console.error(
        'API request error:',
        error.response ? error.response.data : error.message,
      ); // 디버깅 로그 추가
      return rejectWithValue(error.response.data.error.message);
    }
  },
);

const translateSlice = createSlice({
  name: 'translate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(translateText.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(translateText.fulfilled, (state, action) => {
        state.loading = false;
        state.translatedText =
          action.payload.data.translations[0].translatedText;
      })
      .addCase(translateText.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default translateSlice.reducer;
