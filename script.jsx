const container = document.querySelector('.js-container'); 
const root = ReactDOM.createRoot(container);

function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = React.useState('')
  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage(inputText) {
    setChatMessages([
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ]);
  }

  return (
    <>
      <input placeholder="Type your message here..." onChange={saveInputText}/>
      <button onClick={() => sendMessage(inputText)}>Send</button>
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
