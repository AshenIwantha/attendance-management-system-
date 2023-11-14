import React, { useState, useEffect } from 'react';

const Webss = () => {
  const [message, setMessage] = useState('');

  // Listen for WebSocket messages
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5050/socket');
    ws.onmessage = (event) => {
      setMessage(event.data);
    };

    // Log the WebSocket connection status
    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // Return a cleanup function to close the WebSocket connection when the component unmounts
    return () => ws.close();
  }, []);


  console.log(message,"message")

  return (
    <div>
      <h1>Backend Message</h1>
      <p>{message}</p>
    </div>
  );
};

export default Webss;