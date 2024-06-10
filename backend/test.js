const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/FlatCode';
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const insertAdmin = async () => {
    await connectDB();

    const username = 'admin';
    const password = 'admin123'; // 임시 비밀번호, 실제 사용 시 보안에 유의

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = new User({
        username: username,
        password: hashedPassword,
        userId: new mongoose.Types.ObjectId()
    });

    try {
        await adminUser.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

insertAdmin();