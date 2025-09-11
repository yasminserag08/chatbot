import { useState } from 'react'
import { Chatbot } from 'supersimpledev'

function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function checkKey(event) {
    const key = event.key;
    if(key === 'Enter') {
      sendMessage({ inputText, setInputText });
    }
    else if(key === 'Escape') {
      setInputText('');
    }
  }

  async function sendMessage({ inputText, setInputText }) {
    const newChatMessages = [      
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];
    setChatMessages(newChatMessages);
    const newInputText = inputText;
    setInputText('');
    setChatMessages([
      ...newChatMessages,
      {
        message: 'Loading...',
        sender: 'bot',
        id: crypto.randomUUID()
      }
    ]);
    setIsLoading(true);
    const response = await Chatbot.getResponseAsync(newInputText);
    setIsLoading(false);
    setChatMessages([
      ...newChatMessages, 
      {
        message: response,
        sender: 'bot',
        id: crypto.randomUUID()
      }
    ]);
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Type your message here..." 
        onChange={saveInputText} 
        value={inputText}
        onKeyDown={checkKey}  
        disabled={isLoading}
      />
      <button 
        disabled={isLoading || (inputText === '')}
        onClick={() => sendMessage({ inputText, setInputText })}
        className="send-button">
          Send
      </button>
    </div>
  );
}

export default ChatInput