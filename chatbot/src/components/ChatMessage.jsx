import BotProfileImage from '../assets/bot.png'
import UserProfileImage from '../assets/user.png'

export function ChatMessage({ message, sender }) {
  return (
    <div className={sender === 'bot' ? 'bot-message' : 'user-message'}>
      {sender === 'bot' && <img src={BotProfileImage} />}
      <div className="chat-message-text">
        {message}
      </div>
      {sender === 'user' && <img src={UserProfileImage} />}
    </div>
  );
} 