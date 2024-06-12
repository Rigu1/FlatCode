import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchEmails } from '../app/gmailSlice';

const GoogleAuth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { emails, loading, error } = useSelector(
    (state: RootState) => state.gmail,
  );
  const [authUrl, setAuthUrl] = useState<string>('');
  const [selectedEmail, setSelectedEmail] = useState<any>(null);

  useEffect(() => {
    const fetchAuthUrl = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/google/auth-url',
          { withCredentials: true },
        );
        setAuthUrl(response.data.url);
      } catch (error) {
        console.error('Error fetching auth URL:', error);
      }
    };

    fetchAuthUrl();
  }, []);

  useEffect(() => {
    if (!authUrl) {
      dispatch(fetchEmails());
    }
  }, [authUrl, dispatch]);

  const handleEmailClick = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/google/emails/${id}`,
        { withCredentials: true },
      );
      setSelectedEmail(response.data);
      console.log('Fetched email details:', response.data);
    } catch (error) {
      console.error('Error fetching email:', error);
    }
  };

  const handleBackClick = () => {
    setSelectedEmail(null);
  };

  if (authUrl && !emails.length && !selectedEmail) {
    return <a href={authUrl}>Authenticate with Google</a>;
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.toString()}</p>}
      {!selectedEmail && emails.length > 0 && (
        <ul>
          {emails.map((email) => (
            <li key={email.id} onClick={() => handleEmailClick(email.id)}>
              <strong>Subject:</strong> {email.subject} <br />
            </li>
          ))}
        </ul>
      )}
      {selectedEmail && (
        <div>
          <h3>Email Details</h3>
          <p>
            <strong>Subject:</strong> {selectedEmail.subject}
          </p>
          <p>
            <strong>From:</strong> {selectedEmail.from}
          </p>
          <p>
            <strong>Date:</strong> {selectedEmail.date}
          </p>
          <p>
            <strong>Snippet:</strong> {selectedEmail.snippet}
          </p>
          <button onClick={handleBackClick}>Back to list</button>
        </div>
      )}
    </div>
  );
};

export default GoogleAuth;
