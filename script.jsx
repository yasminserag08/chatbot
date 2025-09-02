const container = document.querySelector('.js-container'); 
const root = ReactDOM.createRoot(container);

function ChatInput({chatMessages, setChatMessages}) {
  return (
    <>
      <input placeholder="Type your message here..." />
      <button onClick={sendMessage}>Send</button>
    </>
  );
  function sendMessage() {
  setChatMessages([
    ...chatMessages,
    {
      message: 'new',
      sender: 'user',
      id: crypto.randomUUID()
    }
  ]);
}
}

function ChatMessage({ message, sender }) {
  const array = React.useState([{
    message: 'Hello chatbot',
    sender: 'user', 
    id: 'id1'
    }, {
    message: 'Hello user',
    sender: 'bot',
    id: 'id2'
    }]
  );
  const chatMessages = array[0];
  const setChatMessages = array[1];

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
