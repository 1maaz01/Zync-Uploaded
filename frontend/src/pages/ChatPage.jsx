

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import CustomChannelHeader from '../components/CustomChannelHeader';



import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // this will run only when authUser is available
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        //
        const channelId = [authUser._id, targetUserId].sort().join("-");

        // you and me
        // if i start the chat => channelId: [myId, yourId]
        // if you start the chat => channelId: [yourId, myId]  => [myId,yourId]

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;


  return (

    <div className=" flex items-center justify-center p-4">
      <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg ">
        <Chat client={chatClient} theme="messaging dark">
          <Channel channel={channel}>
            <div className="relative w-full h-full bg-[#111111]">
              <div className="absolute top-4 right-4 z-10 w-12">
                <CallButton handleVideoCall={handleVideoCall} />
              </div>

              <Window>
                <div className="flex flex-col h-full bg-[#2a2929] text-white">
                  <div className="p-4 border-b border-gray-800">
                    <CustomChannelHeader />
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    <MessageList/>
                  </div>

                  <div className="p-4 pt-2 pb-2 bg-[#2a2929] border-t border-white/10">
                    <MessageInput />
                  </div>
                </div>
              </Window>

            </div>

            <Thread />
          </Channel>
        </Chat>
      </div>
    </div>

  );
};

export default ChatPage;