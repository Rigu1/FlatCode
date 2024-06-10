import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import chatReducer from './chatSlice';
import todoReducer from './todoSlice'; // todo 슬라이스 추가

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    todos: todoReducer, // 스토어에 todo 슬라이스 추가
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
