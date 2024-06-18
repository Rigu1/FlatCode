const mongoose = require('mongoose');
require('dotenv').config(); // 환경 변수를 로드

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/FlatCode';
        const client = await mongoose.connect(mongoUri); // 불필요한 옵션 제거
        console.log('MongoDB connected');
        return client.connection.getClient(); // MongoDB 클라이언트를 반환
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;