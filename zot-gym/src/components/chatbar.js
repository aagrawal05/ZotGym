import { useState } from 'react';
import { IoSend } from 'react-icons/io5';

function ChatBar(props) {
  const { handleSend } = props;
  const [message, setMessage] = useState('');

  const handleEnter = () => {
      // TODO: input validation
      handleSend(message)
  }

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-white shadow-lg z-10">
      <div className="flex items-center justify-between">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-2 pr-12 border border-gray-300 rounded-full text-lg text-black"
        />
        <button
          onClick={handleEnter}
          className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <IoSend className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default ChatBar;
