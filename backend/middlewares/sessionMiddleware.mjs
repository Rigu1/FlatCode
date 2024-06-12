import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('.env') });

if (!process.env.MONGO_URI || !process.env.SESSION_SECRET) {
  throw new Error('Missing required environment variables.');
}

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    secure: false, // true if using https
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
});

export default sessionMiddleware;
