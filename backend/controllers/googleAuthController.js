const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:5000/api/google/oauth2callback'
);

const getAuthUrl = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly']
  });
  res.json({ url: authUrl });
};

const oauth2callback = async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    req.session.tokens = tokens;
    console.log('Tokens saved to session:', req.session.tokens);
    req.session.save(err => {
      if (err) {
        console.error('Error saving session:', err);
        res.status(500).json({ error: 'Failed to save session' });
      } else {
        res.redirect('http://localhost:3000/google-auth'); // 인증 후 리디렉션할 클라이언트 URL
      }
    });
  } catch (error) {
    console.error('Error during OAuth callback:', error);
    res.status(500).json({ error: 'Failed to authenticate' });
  }
};

const listMessages = async (req, res) => {
  if (!req.session.tokens) {
    console.log('No tokens in session');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  oauth2Client.setCredentials(req.session.tokens);
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  try {
    const response = await gmail.users.messages.list({ userId: 'me', maxResults: 10 });
    console.log('Fetched emails:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
};

module.exports = { getAuthUrl, oauth2callback, listMessages };
