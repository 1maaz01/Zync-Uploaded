import { useMessageInputContext } from 'stream-chat-react';

const CustomMessageInput = () => {
  const { handleSubmit, textareaRef, handleChange, value } = useMessageInputContext();

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        className="flex-1 bg-gray-700 text-white px-3 py-2 rounded"
        placeholder="Type a message..."
      />
      <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white">
        Send
      </button>
    </form>
  );
};

export default CustomMessageInput;