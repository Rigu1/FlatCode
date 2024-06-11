const express = require('express');
const router = express.Router();
const {
  getAuthUrl,
  oauth2callback,
  getEmails,
  getEmailById,
} = require('../controllers/googleAuthController');

router.get('/auth-url', getAuthUrl);
router.get('/oauth2callback', oauth2callback);
router.get('/emails', getEmails);
router.get('/emails/:id', getEmailById);

module.exports = router;
