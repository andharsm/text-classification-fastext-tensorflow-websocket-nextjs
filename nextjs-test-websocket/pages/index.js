import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Home = () => {
  const [textInput, setTextInput] = useState('');
  const [result, setResult] = useState({ label: '', score: 0 });

  // Connect to the Flask-SocketIO server
  const socket = io('http://localhost:5000', { transports: ['websocket'] });

  // Event handler for receiving 'result' from the server
  useEffect(() => {
    // Log connection status
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Listen for 'result' events from the server
    socket.on('result', (data) => {
      console.log('Received result:', data);
      setResult(data);
    });

    // Listen for errors
    socket.on('error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    // Cleanup the event listeners on component unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('result');
      socket.off('error');
    };
  }, [result]);

  // Function to handle text input changes and send 'text_input' event
  const handleTextInput = (event) => {
    const newText = event.target.value;
    setTextInput(newText);

    // Emit 'text_input' event to the server
    socket.emit('text_input', newText);
  };

  return (
    <div>
      <input type="text" value={textInput} onChange={handleTextInput} />
      <div>
        <p>Label: {result.label}</p>
        <p>Score: {result.score}</p>
      </div>
    </div>
  );
};

export default Home;
