import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { corsMiddleware, sessionMiddleware, errorMiddleware } from './middlewares/index.mjs';
import authRoutes from './routes/authRoutes.mjs';
import chatRoutes from './routes/chatRoutes.mjs';
import todoRoutes from './routes/todoRoutes.mjs';
import translateRoutes from './routes/translateRoutes.mjs';
import googleAuthRoutes from './routes/googleAuthRoutes.mjs';
import dashboardRoutes from './routes/dashboardRoutes.mjs';

dotenv.config({ path: path.resolve('.env') });

const app = express();

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('SESSION_SECRET:', process.env.SESSION_SECRET);
console.log('CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

if (!process.env.MONGO_URI || !process.env.SESSION_SECRET) {
  throw new Error('Missing required environment variables.');
}

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/translate', translateRoutes);
app.use('/api/google', googleAuthRoutes);
app.use('/api/dashboards', dashboardRoutes);

// 에러 핸들링 미들웨어는 라우트 다음에 사용
app.use(errorMiddleware);

export default app;
