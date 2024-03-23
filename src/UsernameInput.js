import React, { useState } from 'react';

const UsernameInput = ({ onSubmit }) => {
  const [username, setUsername] = useState('');

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(username);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ marginBottom: '20px', color: '#4CAF50', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '32px' }}>Welcome to Match!</h1>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '18px' }}>Developed by Jenish</p>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>This game is a fun way to test your memory skills! Simply enter your username below and click "OK" to get started.</p>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Your Username" 
          value={username} 
          onChange={handleChange} 
          required 
          style={{
            padding: '12px',
            borderRadius: '20px',
            border: '2px solid #4CAF50',
            marginRight: '10px',
            fontSize: '16px',
            width: '300px',
            outline: 'none'
          }}
        />
        <button 
          type="submit" 
          style={{
            padding: '12px 24px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease-in-out',
            outline: 'none'
          }}
        >
          OK
        </button>
      </form>
    </div>
  );
};

export default UsernameInput;
