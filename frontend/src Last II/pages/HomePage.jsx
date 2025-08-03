import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircle, MapPin, UserPlus, Users } from "lucide-react";

import { capitialize } from "../lib/utils";

import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

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
            <span class="flex items-center gap-3 relative z-10">
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
          <div className="mb-6 sm:mb-8 mt-[200px] sm:mt-[100px] ">
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
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className={`min-w-[300px] shadow-lg transition-all duration-300 hover:-translate-y-1  ${hasRequestBeenSent ? "shadow-green-600":"shadow-rose-600"} border-white/10 border  bg-[#100f0f] backdrop-blur-sm rounded-2xl  transition-all duration-300  group`}
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={user.profilePic} 
                            alt={user.fullName}
                            className="w-16 h-16 rounded-full object-cover transition-all duration-200"
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse"></div>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-white  transition-colors duration-200">{user.fullName}</h3>
                          {user.location && (
                            <div className="flex items-center text-sm text-gray-400 mt-1">
                              <MapPin className="size-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>



                      {user.bio && (
                        <p className="text-sm text-gray-300 leading-relaxed bg-gray-700/30 p-3 rounded-lg backdrop-blur-sm border border-gray-600/30">
                          {user.bio}
                        </p>
                      )}

                      {/* Action button */}
                      <div className="w-full flex items-center justify-center">
                          <button
                            className={` mt-4 px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                              hasRequestBeenSent 
                                ? "bg-green-600/60 text-white cursor-not-allowed border border-green-500/30 backdrop-blur-sm" 
                                : "bg-rose-700 hover:bg-rose-700/80 text-white  transform hover:scale-[1.02] active:scale-[0.98]"
                            }`}
                            onClick={() => sendRequestMutation(user._id)}
                            disabled={hasRequestBeenSent || isPending}
                          >
                            {hasRequestBeenSent ? (
                              <>
                                <CheckCircle className="size-4 mr-2" />
                                Request Sent
                              </>
                            ) : (
                              <>
                                <UserPlus className="size-4 mr-2" />
                                Send Request
                              </>
                            )}
                          </button>
                      </div>
                    </div>
                  </div>
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