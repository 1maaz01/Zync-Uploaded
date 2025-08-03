import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { use, useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Users } from "lucide-react";

import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import SuggestionCard from "../components/SuggestionCard";


const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className=" playfair-font  p-4 sm:p-6 lg:p-8 bg-black min-h-screen pb-[200px]">
      <div className="container mx-auto space-y-10 ">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Your Friends</h2>


          <a  href="/notifications"
            className="group relative  px-4 py-3 sm:px-10 sm:py-5 rounded-xl bg-zinc-900 text-amber-200 font-bold tracking-widest uppercase text-sm border-b-4 border-amber-400 hover:border-amber-400/50 transition-all duration-300 ease-in-out hover:text-amber-300 shadow-[0_10px_20px_rgba(251,191,36,0.15)] hover:shadow-[0_15px_30px_rgba(251,191,36,0.25)] active:border-b-0 active:translate-y-1"
          >
            <span className="flex items-center gap-3 relative z-10">
                <Users className="mr-2 size-4" />
                Friend Requests
            </span>
            <div
              className="absolute -inset-1 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 blur-2xl group-hover:blur-xl transition-all duration-300 -z-10 opacity-0 group-hover:opacity-100"
            ></div>
          </a>

        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-12 sm:gap-8">
                {friends.map((friend) => (
                  <FriendCard key={friend._id} friend={friend} />
                ))}
              </div>
    
        )}

        <section>
          <div className="mb-6 sm:mb-8 mt-[150px] sm:mt-[100px] ">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Meet New Users</h2>
                <p className="text-gray-300 mt-1">
                  Discover new users based on your profile
                </p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12 ">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : recommendedUsers.length === 0 ? (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl border border-gray-700">
                    <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-white">No recommendations available</h3>
                    <p className="text-gray-300">
                      Check back later for new users!
                    </p>
                  </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendedUsers.map((user, index) => {
                    const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                    return (
                        <SuggestionCard 
                            hasRequestBeenSent={hasRequestBeenSent} 
                            user={user} 
                            sendRequestMutation={sendRequestMutation} 
                            isPending={isPending}
                            key={index}
                        />
                    );
                })}

            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;