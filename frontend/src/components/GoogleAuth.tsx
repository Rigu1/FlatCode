import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchEmails } from '../app/gmailSlice';

const GoogleAuth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { emails, loading, error } = useSelector(
    (state: RootState) => state.gmail,
  ); // 상태를 명확히 사용
  const [authUrl, setAuthUrl] = useState<string>('');

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

  const handleFetchEmails = () => {
    dispatch(fetchEmails());
  };

  return (
    <div>
      <h2>Google Authentication</h2>
      {authUrl && <a href={authUrl}>Authenticate with Google</a>}
      <button onClick={handleFetchEmails}>Fetch Emails</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {emails.length > 0 && (
        <ul>
          {emails.map((email) => (
            <li key={email.id}>{email.id}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoogleAuth;
