const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('SESSION_SECRET:', process.env.SESSION_SECRET);

if (!process.env.MONGO_URI || !process.env.SESSION_SECRET) {
    throw new Error('Missing required environment variables.');
}

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// 인증 미들웨어 정의
const authenticateUser = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const todoRoutes = require('./routes/todoRoutes'); // todo 라우트 추가

app.use('/api/auth', authRoutes);
app.use('/api', chatRoutes);
app.use('/api/todos', authenticateUser, todoRoutes); // /api/todos 경로 설정 및 인증 미들웨어 적용

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    app.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
});

module.exports = app;