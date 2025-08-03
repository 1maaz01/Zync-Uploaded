import { useMessageInputContext } from 'stream-chat-react';

const CustomMessageInput = () => {
  const {
    handleChange,
    sendMessage,
    value,
    uploadNewFiles,
    imageUploads,
    removeImage,
    textareaRef,
  } = useMessageInputContext();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    uploadNewFiles(files);
  };

  const handleSend = () => {
    sendMessage({ text: value });
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* Show uploaded images */}
      <div className="flex space-x-2">
        {Object.values(imageUploads || {}).map((img, i) => (
          <div key={i} className="relative">
            <img
              src={URL.createObjectURL(img.file)}
              alt="preview"
              className="w-16 h-16 object-cover rounded"
            />
            <button
              onClick={() => removeImage(img.id)}
              className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-1"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Input field */}
      <div className="flex items-center space-x-2">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-gray-700 text-white px-2 py-1 rounded"
        >
          📎
        </label>

        <input
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          placeholder="Type a message..."
          className="flex-1 bg-gray-700 text-white px-3 py-2 rounded"
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 px-4 py-2 rounded text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CustomMessageInput;
