const container = document.querySelector('.js-container'); 
let props = {
  message: 'Hello chatbot',
  sender: 'user'
};
const { message } = props;
const { sender } = props;

function ChatInput() {
  return (
    <>
      <input placeholder="Type your message here..." />
      <button>Send</button>
    </>
  );
}

function ChatMessage(props) {
  const message = props.message;
  const sender = props.sender;

  if(sender === 'bot') {
    return (
      <div>
        <img src="bot.png" width="50px" />
        {message}
      </div>
    );
  }
  return (
    <div>
      {message}
      <img src="user.png" width="50px" />
    </div>
  );
} 

const app = (
  <>
    <ChatInput />
    <ChatMessage message='Hello chatbot' sender='user' />
    <ChatMessage message='Hello user' sender='bot' />
  </>
)

ReactDOM.createRoot(container).render(app);
