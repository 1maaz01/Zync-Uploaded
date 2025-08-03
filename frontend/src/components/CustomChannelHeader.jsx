// components/CustomChannelHeader.tsx
import { useChannelStateContext, useChatContext } from 'stream-chat-react';

const CustomChannelHeader = () => {
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  // Get other member (excluding the current user)
  const members = Object.values(channel.state.members).filter(
    ({ user }) => user.id !== client.userID
  );

  const otherUser = members[0]?.user;

  if (!otherUser) return null;

  return (
    <div className="flex items-center   gap-4">
      <img
        src={otherUser.image}
        alt={otherUser.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <h2 className="text-white text-lg font-semibold">{otherUser.name}</h2>
      </div>
    </div>
  );
};

export default CustomChannelHeader;
