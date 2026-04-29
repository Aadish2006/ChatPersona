import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';
import './index.css';

const PERSONAS = {
  anshuman: {
    name: 'Anshuman Singh',
    suggestions: [
      'How do I reverse a linked list?',
      'Why do we need load balancers?',
      'I keep getting a TLE error.'
    ]
  },
  abhimanyu: {
    name: 'Abhimanyu Saxena',
    suggestions: [
      'Should I use MongoDB or PostgreSQL?',
      'How do I make my React app faster?',
      'I want to build a social network clone.'
    ]
  },
  kshitij: {
    name: 'Kshitij Mishra',
    suggestions: [
      "I don't understand recursion at all.",
      'My code throws a Null Pointer Exception.',
      'What is an API?'
    ]
  }
};

function App() {
  const [activePersona, setActivePersona] = useState('anshuman');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handlePersonaChange = (personaKey) => {
    if (isTyping) return;
    setActivePersona(personaKey);
    setMessages([]);
    setError('');
    setInputValue('');
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);
    setError('');

    try {
      // Send exactly what the backend expects: the list of prior messages 
      // mapped correctly, plus the new user message.
      const apiMessages = newMessages.map(msg => ({
        role: msg.role === 'bot' ? 'assistant' : msg.role,
        content: msg.content
      }));

      const response = await axios.post('http://localhost:5001/api/chat', {
        messages: apiMessages,
        persona: activePersona
      });

      const botMessage = { role: 'bot', content: response.data.message };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setError('Failed to connect to the persona. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isTyping) {
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="chat-container">
      <div className="header">
        <h1>Chat with Scaler Founders & Mentors</h1>
        <div className="persona-switcher">
          {Object.entries(PERSONAS).map(([key, data]) => (
            <button
              key={key}
              className={`persona-tab ${activePersona === key ? 'active' : ''}`}
              onClick={() => handlePersonaChange(key)}
            >
              {data.name}
            </button>
          ))}
        </div>
      </div>

      <div className="messages-area">
        {messages.length === 0 ? (
          <div className="empty-state">
            <h2>Start a conversation with {PERSONAS[activePersona].name}</h2>
            <div className="suggestions">
              {PERSONAS[activePersona].suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="suggestion-chip"
                  onClick={() => handleSendMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`message-wrapper ${msg.role}`}>
              <div className="message-bubble">{msg.content}</div>
            </div>
          ))
        )}
        
        {isTyping && (
          <div className="message-wrapper bot">
            <div className="typing-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="input-area">
        <input
          type="text"
          placeholder={`Message ${PERSONAS[activePersona].name}...`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isTyping}
        />
        <button 
          className="send-button" 
          onClick={() => handleSendMessage(inputValue)}
          disabled={!inputValue.trim() || isTyping}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

export default App;
