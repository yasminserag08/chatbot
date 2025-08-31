const container = document.querySelector('.js-container'); 

function ChatInput() {
  return (
    <>
      <input placeholder="Type your message here..." />
      <button>Send</button>
    </>
  );
}

const app = (
  <>
    <ChatInput />
  </>
)

ReactDOM.createRoot(container).render(app);
