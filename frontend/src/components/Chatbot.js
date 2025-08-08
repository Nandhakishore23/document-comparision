import React, { useState, useRef, useEffect } from 'react';

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

  const WEBHOOK_URL = 'https://vstharun.app.n8n.cloud/webhook/chat';

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
      const botText = data?.[0]?.output || "Sorry, I didn't understand that.";

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
      <style jsx>{`
        .chatbot-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .chat-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
        }

        .chat-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 350px;
          height: 500px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .chat-window.open {
          transform: translateY(0);
          opacity: 1;
        }

        .chat-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-title {
          font-weight: 600;
          font-size: 18px;
          margin: 0;
        }

        .chat-status {
          font-size: 12px;
          opacity: 0.9;
        }

        .session-info {
          font-size: 10px;
          opacity: 0.7;
          margin-top: 2px;
        }

        .header-buttons {
          display: flex;
          gap: 10px;
        }

        .header-button {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
          font-size: 12px;
        }

        .header-button:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          background: #f8f9fa;
        }

        .message {
          margin-bottom: 15px;
          display: flex;
          flex-direction: column;
        }

        .message.user {
          align-items: flex-end;
        }

        .message.bot {
          align-items: flex-start;
        }

        .message-bubble {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 18px;
          word-wrap: break-word;
          position: relative;
        }

        .message.user .message-bubble {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .message.bot .message-bubble {
          background: white;
          color: #333;
          border: 1px solid #e1e5e9;
        }

        .message-time {
          font-size: 11px;
          color: #999;
          margin-top: 5px;
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 12px 16px;
          background: white;
          border-radius: 18px;
          border: 1px solid #e1e5e9;
          max-width: 80%;
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #999;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes typing {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        .input-container {
          padding: 20px;
          background: white;
          border-top: 1px solid #e1e5e9;
          display: flex;
          gap: 10px;
          align-items: flex-end;
        }

        .message-input {
          flex: 1;
          border: 2px solid #e1e5e9;
          border-radius: 25px;
          padding: 12px 18px;
          font-size: 14px;
          outline: none;
          resize: none;
          min-height: 20px;
          max-height: 100px;
          font-family: inherit;
          transition: border-color 0.2s ease;
        }

        .message-input:focus {
          border-color: #667eea;
        }

        .send-button {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .send-button:hover {
          transform: scale(1.05);
        }

        .send-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 400px) {
          .chat-window {
            width: 320px;
            right: -10px;
          }
        }
      `}</style>

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