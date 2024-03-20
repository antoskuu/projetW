import React from 'react';

const ChatWindow = ({ isChatOpen, setIsChatOpen, messages }) => {
  const handleMessage = (event) => {
    if (event.key === 'Enter') {
      const inputValue = event.target.value;
      console.log(inputValue);
      event.target.value = ''; // Remise à zéro de l'input
    }
  };

  return (
    <div className='chat-window'>
      <div className='chat-header' onClick={() => setIsChatOpen(!isChatOpen)}>
        Chat général
      </div>
      <div className={`chat-content ${isChatOpen ? 'open' : ''}`}>
        {messages.map((message, index) => (
          <div key={index}>
            <span style={{ fontWeight: 'bold', fontSize: 'larger' }}>{message.pseudo}: </span>
            <span>{message.content}</span>
          </div>
        ))}

        <input
          className='chat-input form-control'
          placeholder='Rechercher...'
          onKeyPress={handleMessage}
        ></input>
      </div>
    </div>
  );
};

export default ChatWindow;
