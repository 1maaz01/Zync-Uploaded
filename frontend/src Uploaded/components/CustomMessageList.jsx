import { useChannelStateContext } from 'stream-chat-react';
import { useEffect, useRef } from 'react';



const CustomMessageList = () => {
  const { messages, channel } = useChannelStateContext();
  const messagesEndRef = useRef(null);
  const currentUserId = channel?.state?.membership?.user?.id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  // Function to detect and render links
  const renderTextWithLinks = (text) => {
    if (!text) return <span className="italic white">No message content</span>;

    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline break-all"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-full bg-black playfair-font min-h-[60vh]">

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-white">
            <div className="w-16 h-16 bg-[#2a2929] rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm">Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isCurrentUser = msg.user?.id === currentUserId;
            const showAvatar = index === 0 || messages[index - 1].user?.id !== msg.user?.id;
            const isLastFromUser = index === messages.length - 1 || messages[index + 1].user?.id !== msg.user?.id;

            return (
              <div
                key={msg.id}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} ${
                  showAvatar ? 'mt-4' : 'mt-1'
                }`}
              >
                <div className={`flex max-w-xs lg:max-w-md ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  {!isCurrentUser && (
                    <div className={`flex-shrink-0 ${showAvatar ? 'visible' : 'invisible'}`}>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium mr-3">
                        {getInitials(msg.user?.name)}
                      </div>
                    </div>
                  )}

                  {/* Message Content */}
                  <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                    {/* Username (only for other users and first message in group) */}
                    {!isCurrentUser && showAvatar && (
                      <span className="text-xs text-white mb-1 px-3">
                        {msg.user?.name || 'Unknown User'}
                      </span>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-2 rounded-2xl relative ${
                        isCurrentUser
                          ? 'bg-blue-500 text-white rounded-br-md'
                          : 'bg-orange-700 text-white shadow-sm  rounded-bl-md'
                      } ${isLastFromUser ? 'mb-1' : ''}`}
                    >
                      {msg.attachments?.length > 0 ? (
                        msg.attachments.map((att, i) => {
                          if (att.type === 'image' || att.mime_type?.startsWith('image/')) {
                            return (
                              <img
                                key={i}
                                src={att.image_url || att.asset_url || att.thumb_url}
                                alt={att.fallback || 'image'}
                                className="max-w-[100px] rounded-md mt-2 "
                              />
                            );
                          } else if (att.type === 'video' || att.mime_type?.startsWith('video/')) {
                            return (
                              <video
                                key={i}
                                controls
                                className="max-w-[200px] rounded-md mt-2 "
                                src={att.asset_url || att.thumb_url}
                              />
                            );
                          } else {
                            return (
                              <a
                                key={i}
                                href={att.asset_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-300 underline break-all mt-2 block"
                              >
                                {att.title || att.asset_url}
                              </a>
                            );
                          }
                        })
                      ) : (
                        <p className="text-sm leading-relaxed break-words">
                          {renderTextWithLinks(msg.text)}
                        </p>
                      )}
                      
                    </div>

                    {/* Timestamp */}
                    {isLastFromUser && (
                      <span className={`text-xs text-white mt-1 px-3 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                        {formatTime(msg.created_at)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

    </div>
  );
};

export default CustomMessageList;