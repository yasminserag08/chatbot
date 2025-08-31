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

function App() {
  return (
    <>
      <ChatInput />
      <ChatMessage message='Hello chatbot' sender='user' />
      <ChatMessage message='Hello user' sender='bot' />
    </>
  );
}

ReactDOM.createRoot(container).render(<App />);
