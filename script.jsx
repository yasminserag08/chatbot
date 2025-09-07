const container = document.querySelector('.js-container'); 
const root = ReactDOM.createRoot(container);

function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
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

function ChatMessage({ message, sender }) {
  return (
    <div className={sender === 'bot' ? 'bot-message' : 'user-message'}>
      {sender === 'bot' && <img src="bot.png" />}
      <div className="chat-message-text">
        {message}
      </div>
      {sender === 'user' && <img src="user.png" />}
    </div>
  );
} 

function ChatMessages({ chatMessages }) 
{
  const chatMessagesRef = React.useRef(null);
  React.useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if(containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);
  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return <ChatMessage 
          message={chatMessage.message} 
          sender={chatMessage.sender} 
          key={chatMessage.id} />;
      })}
    </div>
  );
}

function App() {
  const [chatMessages, setChatMessages] = React.useState([]);
  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </div>
  ); 
}

root.render(<App />);
