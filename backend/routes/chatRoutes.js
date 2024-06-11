const express = require('express');
const router = express.Router();
const { chatHandler } = require('../controllers/chatController'); // chatHandler를 불러옴

// 채팅 라우트
router.post('/', chatHandler);

module.exports = router;
