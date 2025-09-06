const container = document.querySelector('.js-container'); 
const root = ReactDOM.createRoot(container);

function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = React.useState('')
  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage({ inputText, setInputText }) {
    const newChatMessages = [      
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];
    setChatMessages(newChatMessages);
    const response = Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages, 
      {
        message: response,
        sender: 'bot',
        id: crypto.randomUUID()
      }
    ]);
    setInputText('');
  }

  return (
    <>
      <input placeholder="Type your message here..." onChange={saveInputText} value={inputText} />
      <button onClick={() => sendMessage({ inputText, setInputText })}>Send</button>
    </>
  );
}

function ChatMessage({ message, sender }) {

  return (
    <div>
      {sender === 'bot' && <img src="bot.png" width="50px" />}
      {message}
      {sender === 'user' && <img src="user.png" width="50px" />}
    </div>
  );
} 


function ChatMessages({ chatMessages }) 
{
  return (
    <>
      {chatMessages.map((chatMessage) => {
        return <ChatMessage 
          message={chatMessage.message} 
          sender={chatMessage.sender} 
          key={chatMessage.id} />;
      })}
    </>
  );
}

function App() {
  const [chatMessages, setChatMessages] = React.useState([
    {
      message: 'Hello chatbot',
      sender: 'user',
      id: 'id1'
    }, {
    message: 'Hello user',
    sender: 'bot',
    id: 'id2'
    }
  ]);
  return (
    <>
      <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} />
      <ChatMessages chatMessages={chatMessages} />
    </>
  ); 
}

root.render(<App />);
