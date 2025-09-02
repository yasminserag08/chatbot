const container = document.querySelector('.js-container'); 

function ChatInput() {
  return (
    <>
      <input placeholder="Type your message here..." />
      <button>Send</button>
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

function ChatMessages() 
{
  const chatMessages = [{
    message: 'Hello chatbot',
    sender: 'user', 
    id: 'id1'
  }, {
    message: 'Hello user',
    sender: 'bot',
    id: 'id2'
  }];
  return (
    <>
      {chatMessages.map((chatMessage) => {
        return <ChatMessage message={chatMessage.message} sender={chatMessage.sender} key={chatMessage.id} />;
      })}
    </>
  );
}

function App() {
  return (
    <>
      <ChatInput />
      <ChatMessages />
    </>
  ); 
}

ReactDOM.createRoot(container).render(<App />);
