import React from 'react';

const ChatWindow = ({ isChatOpen, setIsChatOpen, messages }) => {
  return (
    <div className='chat-window'>
      <div className='chat-header' onClick={() => setIsChatOpen(!isChatOpen)}>
        Chat général
      </div>
      <div className={`chat-content ${isChatOpen ? 'open' : ''}`}>
        {/* Affichage des messages avec les pseudonymes */}
        {messages.map((message, index) => (
          <div key={index}>
            {/* Afficher le pseudonyme et le contenu du message */}
            <span>{message.pseudo}: </span>
            <span>{message.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
