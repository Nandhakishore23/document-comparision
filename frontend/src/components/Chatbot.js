import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import BASE_URL from '../apiConfig';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const WEBHOOK_URL = `${BASE_URL}/api/ai/chat`;

  // Generate a unique session ID when component mounts
  useEffect(() => {
    const generateSessionId = () => {
      return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    };

    // Check if we have a stored session ID, otherwise create new one
    const storedSessionId = localStorage.getItem('chatbot_session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      localStorage.setItem('chatbot_session_id', newSessionId);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading || !sessionId) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          sessionId: sessionId
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      const botText = data.reply || "Sorry, I didn't understand that.";

      const botMessage = {
        id: Date.now() + 1,
        text: botText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 2,
          text: 'Sorry, I\'m having trouble connecting. Please try again later.',
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      { id: 1, text: "Hello! How can I help you today?", sender: 'bot', timestamp: new Date() }
    ]);
  };

  const newSession = () => {
    const newSessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    setSessionId(newSessionId);
    localStorage.setItem('chatbot_session_id', newSessionId);
    clearChat();
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>


      <div className="chatbot-container">
        {isOpen && (
          <div className={`chat-window ${isOpen ? 'open' : ''}`}>
            <div className="chat-header">
              <div>
                <h3 className="chat-title">HexaBuddy 🤖
                </h3>
                <div className="chat-status">● Online</div>
                <div className="session-info">Session: {sessionId.slice(-8)}</div>
              </div>
              <div className="header-buttons">
                <button className="header-button" onClick={newSession} title="New session">🔄</button>
                <button className="header-button" onClick={clearChat} title="Clear chat">🗑</button>
                <button className="header-button" onClick={() => setIsOpen(false)} title="Close">✕</button>
              </div>
            </div>

            <div className="messages-container">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.sender}`}>
                  <div className="message-bubble">{message.text}</div>
                  <div className="message-time">{formatTime(message.timestamp)}</div>
                </div>
              ))}

              {isLoading && (
                <div className="message bot">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="input-container">
              <textarea
                ref={inputRef}
                className="message-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                rows={1}
              />
              <button
                className="send-button"
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                title="Send message"
              >
                {isLoading ? '⏳' : '➤'}
              </button>
            </div>
          </div>
        )}

        <button
          className="chat-toggle"
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? '✕' : '💬'}
        </button>
      </div>

    </>
  );
};

export default ChatBot;