import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import chatReducer from './chatSlice';
import todoReducer from './todoSlice';
import translateReducer from './translateSlice'; // 번역 슬라이스 추가
import gmailReducer from './gmailSlice';
import dashboardReducer from './dashboardSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    todos: todoReducer,
    translate: translateReducer, // 스토어에 번역 슬라이스 추가
    gmail: gmailReducer,
    dashboards: dashboardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
