const express = require('express');
const router = express.Router();
const { getAuthUrl, oauth2callback, listMessages } = require('../controllers/googleAuthController');

router.get('/auth-url', getAuthUrl);
router.get('/oauth2callback', oauth2callback);
router.get('/emails', listMessages);

module.exports = router;
