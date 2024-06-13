// src/slices/dashboardSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosConfig';

interface Board {
  type: string;
}

interface Dashboard {
  _id: string;
  title: string;
  boards: Board[];
}

interface DashboardState {
  dashboards: Dashboard[];
  selectedDashboard: Dashboard | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DashboardState = {
  dashboards: [],
  selectedDashboard: null,
  status: 'idle',
  error: null,
};

export const fetchDashboards = createAsyncThunk(
  'dashboards/fetchDashboards',
  async () => {
    const response = await axiosInstance.get('/dashboards');
    return response.data;
  },
);

export const addDashboard = createAsyncThunk(
  'dashboards/addDashboard',
  async (title: string) => {
    const response = await axiosInstance.post('/dashboards', { title });
    return response.data;
  },
);

export const deleteDashboard = createAsyncThunk(
  'dashboards/deleteDashboard',
  async (id: string) => {
    await axiosInstance.delete(`/dashboards/${id}`);
    return id;
  },
);

export const addBoardToDashboard = createAsyncThunk(
  'dashboards/addBoardToDashboard',
  async ({ dashboardId, type }: { dashboardId: string; type: string }) => {
    const response = await axiosInstance.post(
      `/dashboards/${dashboardId}/boards`,
      { type },
    );
    return response.data;
  },
);

export const removeBoardFromDashboard = createAsyncThunk(
  'dashboards/removeBoardFromDashboard',
  async ({ dashboardId, index }: { dashboardId: string; index: number }) => {
    const response = await axiosInstance.delete(
      `/dashboards/${dashboardId}/boards`,
      { data: { index } },
    );
    return response.data;
  },
);

export const updateBoardType = createAsyncThunk(
  'dashboards/updateBoardType',
  async ({
    dashboardId,
    index,
    type,
  }: {
    dashboardId: string;
    index: number;
    type: string;
  }) => {
    const response = await axiosInstance.put(
      `/dashboards/${dashboardId}/boards`,
      { index, type },
    );
    return response.data;
  },
);

const dashboardSlice = createSlice({
  name: 'dashboards',
  initialState,
  reducers: {
    selectDashboard: (state, action: PayloadAction<string>) => {
      state.selectedDashboard =
        state.dashboards.find(
          (dashboard) => dashboard._id === action.payload,
        ) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dashboards = action.payload;
      })
      .addCase(fetchDashboards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch dashboards';
      })
      .addCase(addDashboard.fulfilled, (state, action) => {
        state.dashboards.push({ ...action.payload, boards: [] });
      })
      .addCase(deleteDashboard.fulfilled, (state, action) => {
        state.dashboards = state.dashboards.filter(
          (dashboard) => dashboard._id !== action.payload,
        );
        if (state.selectedDashboard?._id === action.payload) {
          state.selectedDashboard = null;
        }
      })
      .addCase(addBoardToDashboard.fulfilled, (state, action) => {
        if (
          state.selectedDashboard &&
          state.selectedDashboard._id === action.payload._id
        ) {
          state.selectedDashboard.boards = action.payload.boards;
        }
      })
      .addCase(removeBoardFromDashboard.fulfilled, (state, action) => {
        if (
          state.selectedDashboard &&
          state.selectedDashboard._id === action.payload._id
        ) {
          state.selectedDashboard.boards = action.payload.boards;
        }
      })
      .addCase(updateBoardType.fulfilled, (state, action) => {
        if (
          state.selectedDashboard &&
          state.selectedDashboard._id === action.payload._id
        ) {
          state.selectedDashboard.boards = action.payload.boards;
        }
      });
  },
});

export const { selectDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
