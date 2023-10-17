import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios library

const Home = () => {
  const [textInput, setTextInput] = useState('');
  const [result, setResult] = useState({ label: '', score: 0 });

  // Function to send text input to the server
  const sendTextInputToServer = async (newText) => {
    try {
      // Use Axios to send a POST request to the server
      const response = await axios.post('http://127.0.0.1:5000/text_input', { textInput: newText });

      // Handle the response from the server
      console.log('Server response:', response.data);
      setResult(response.data);
    } catch (error) {
      console.error('Error sending text input to server:', error);
    }
  };

  // Event handler for text input changes
  const handleTextInput = (event) => {
    const newText = event.target.value;
    setTextInput(newText);

    // Call the function to send text input to the server
    sendTextInputToServer(newText);
  };

  useEffect(() => {
    // You can perform any setup here if needed

    // Cleanup on component unmount
    return () => {
      // You can perform any cleanup here if needed
    };
  }, []); // Empty dependency array means this effect runs once on mount

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
