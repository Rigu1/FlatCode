import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:5000/api/google/oauth2callback'
);

export const getAuthUrl = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly'],
  });
  res.json({ url: authUrl });
};

export const oauth2callback = async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oauth2Client.getToken(code);
  req.session.tokens = tokens;
  oauth2Client.setCredentials(tokens);
  res.redirect('http://localhost:3000');
};

export const getEmails = async (req, res) => {
  if (!req.session.tokens) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  oauth2Client.setCredentials(req.session.tokens);
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  try {
    const response = await gmail.users.messages.list({ userId: 'me', maxResults: 10 });
    const messages = response.data.messages || [];
    const emailPromises = messages.map(async (message) => {
      const email = await gmail.users.messages.get({ userId: 'me', id: message.id });
      const headers = email.data.payload.headers;
      const subjectHeader = headers.find(header => header.name === 'Subject');
      const fromHeader = headers.find(header => header.name === 'From');
      return {
        id: message.id,
        subject: subjectHeader ? subjectHeader.value : '',
        from: fromHeader ? fromHeader.value : '',
        snippet: email.data.snippet,
        date: new Date(parseInt(email.data.internalDate)).toLocaleString(),
      };
    });
    const emails = await Promise.all(emailPromises);
    res.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
};

export const getEmailById = async (req, res) => {
  if (!req.session.tokens) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const emailId = req.params.id;
  oauth2Client.setCredentials(req.session.tokens);
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  try {
    const email = await gmail.users.messages.get({ userId: 'me', id: emailId });
    const headers = email.data.payload.headers;
    const subjectHeader = headers.find(header => header.name === 'Subject');
    const fromHeader = headers.find(header => header.name === 'From');
    const emailDetails = {
      id: emailId,
      subject: subjectHeader ? subjectHeader.value : '',
      from: fromHeader ? fromHeader.value : '',
      snippet: email.data.snippet,
      date: new Date(parseInt(email.data.internalDate)).toLocaleString(),
      body: email.data.payload.parts ? email.data.payload.parts[0].body.data : '',
    };
    res.json(emailDetails);
  } catch (error) {
    console.error('Error fetching email details:', error);
    res.status(500).json({ error: 'Failed to fetch email details' });
  }
};
