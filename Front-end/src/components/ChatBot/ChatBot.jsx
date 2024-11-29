import React, { useState } from 'react';
import './ChatBot.scss';
import logo from '../../assets/logo/logo.svg'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={toggleChatBot}>
        <img src={logo} alt="Chat" />
      </button>
      {isOpen && (
        <div className="chatbot-iframe">
          <iframe
            src="https://api.chatlab.com/aichat/iframe?apiKey=700782be-d18c-40b2-9923-d26da2c86604&iFrameMode=true&aichatbotProviderId=f9e9c5e4-6d1a-4b8c-8d3f-3f9e9c5e46d1"
            width="100%"
            height="400px"
            title="ChatBot"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
