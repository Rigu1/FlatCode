import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.mjs';

// 회원가입 핸들러
export const registerUser = async (req, res) => {
  const { username, password, profession } = req.body;

  if (!username || !password || !profession) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      profession,
      userId: new mongoose.Types.ObjectId()
    });

    await newUser.save();

    req.session.user = {
      id: newUser._id,
      username: newUser.username,
      profession: newUser.profession,
      userId: newUser.userId
    };

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// 로그인 핸들러
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      profession: user.profession,
      userId: user.userId
    };

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// 로그아웃 핸들러
export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout successful' });
  });
};

// 인증 확인 핸들러
export const checkAuth = (req, res) => {
  if (req.session && req.session.user) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
};
