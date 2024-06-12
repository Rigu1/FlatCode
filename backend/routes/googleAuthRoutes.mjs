import { Router } from 'express';
import { getAuthUrl, oauth2callback, getEmails, getEmailById } from '../controllers/googleAuthController.mjs';

const router = Router();

router.get('/auth-url', getAuthUrl);
router.get('/oauth2callback', oauth2callback);
router.get('/emails', getEmails);
router.get('/emails/:id', getEmailById);

export default router;
