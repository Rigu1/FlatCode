const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:5000/api/google/oauth2callback'
);

const getAuthUrl = (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly'
    ],
  });
  res.json({ url: authUrl });
};

const oauth2callback = async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    req.session.tokens = tokens;
    res.redirect('http://localhost:3000/google-auth');
  } catch (error) {
    console.error('Error retrieving tokens:', error);
    res.status(500).send('Error retrieving tokens');
  }
};

const getEmails = async (req, res) => {
  try {
    if (!req.session.tokens) {
      return res.status(401).json({ error: 'No tokens in session' });
    }
    oAuth2Client.setCredentials(req.session.tokens);
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
    });
    const emailPromises = response.data.messages.map(async (message) => {
      const msg = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
      });
      const subjectHeader = msg.data.payload.headers.find(header => header.name === 'Subject');
      const fromHeader = msg.data.payload.headers.find(header => header.name === 'From');
      const dateHeader = msg.data.payload.headers.find(header => header.name === 'Date');
      return {
        id: msg.data.id,
        subject: subjectHeader ? subjectHeader.value : 'No Subject',
        from: fromHeader ? fromHeader.value : 'Unknown Sender',
        date: dateHeader ? dateHeader.value : 'Unknown Date',
        snippet: msg.data.snippet,
      };
    });
    const emails = await Promise.all(emailPromises);
    res.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
};

const getEmailById = async (req, res) => {
  try {
    if (!req.session.tokens) {
      return res.status(401).json({ error: 'No tokens in session' });
    }
    oAuth2Client.setCredentials(req.session.tokens);
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const emailId = req.params.id;
    const response = await gmail.users.messages.get({
      userId: 'me',
      id: emailId,
    });

    const email = response.data;
    const subjectHeader = email.payload.headers.find(header => header.name === 'Subject');
    const fromHeader = email.payload.headers.find(header => header.name === 'From');
    const dateHeader = email.payload.headers.find(header => header.name === 'Date');

    const parsedEmail = {
      id: email.id,
      subject: subjectHeader ? subjectHeader.value : 'No Subject',
      from: fromHeader ? fromHeader.value : 'Unknown Sender',
      date: dateHeader ? dateHeader.value : 'Unknown Date',
      snippet: email.snippet,
    };

    res.json(parsedEmail);
  } catch (error) {
    console.error('Error fetching email by id:', error);
    res.status(500).json({ error: 'Failed to fetch email' });
  }
};

module.exports = {
  getAuthUrl,
  oauth2callback,
  getEmails,
  getEmailById,
};
