import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MessageComponent.css';

const MessageComponent = () => {
  const [message, setMessage] = useState('Loading...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        // APIエンドポイントを環境変数から取得するか、デフォルト値を使用
        const apiUrl = process.env.REACT_APP_API_URL || 'http://api.lvh.me';
        const response = await axios.get(`${apiUrl}/api/messages/hello`);
        setMessage(response.data.message);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching message:', err);
        setError('Failed to fetch message. Please try again later.');
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  if (loading) return <div className="message-container loading">Loading...</div>;
  if (error) return <div className="message-container error">{error}</div>;

  return (
    <div className="message-container">
      <h2>Message from Database:</h2>
      <div className="message">{message}</div>
    </div>
  );
};

export default MessageComponent; 