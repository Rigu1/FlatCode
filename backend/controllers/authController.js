const bcrypt = require('bcryptjs');
const mongoose = require('mongoose'); // mongoose 모듈 추가
const User = require('../models/User');

// 회원가입 핸들러
const registerUser = async (req, res) => {
    const { username, password, profession } = req.body;

    if (!username || !password || !profession) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // 사용자 중복 확인
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10);

        // 새로운 사용자 생성
        const newUser = new User({
            username,
            password: hashedPassword,
            profession,
            userId: new mongoose.Types.ObjectId() // 새 유저 ID 생성
        });

        // 사용자 저장
        await newUser.save();

        // 세션 저장
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
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // 사용자 확인
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // 비밀번호 확인
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // 세션 저장
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
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout successful' });
    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};