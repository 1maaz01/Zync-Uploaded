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
    <div className=" playfair-font  p-4 sm:p-6 lg:p-8 bg-black min-h-screen">
      <div className="container mx-auto space-y-10 ">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Your Friends</h2>
          <Link 
            to="/notifications" 
            className="inline-flex items-center px-4 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-200 font-medium backdrop-blur-sm"
          >
            <Users className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="flex items-center justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {friends.map((friend) => (
                  <FriendCard key={friend._id} friend={friend} />
                ))}
              </div>
          </div>
        )}

        <section>
          <div className="mb-6 sm:mb-8">
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
                    className="min-w-[300px] bg-[#07092c] backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-blue-500/50 hover:bg-gray-800/70 group"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={user.profilePic} 
                            alt={user.fullName}
                            className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500/30 group-hover:ring-blue-400/50 transition-all duration-200"
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse"></div>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-white group-hover:text-blue-300 transition-colors duration-200">{user.fullName}</h3>
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
                      <button
                        className={`w-full mt-4 px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                          hasRequestBeenSent 
                            ? "bg-green-500/20 text-green-300 cursor-not-allowed border border-green-500/30 backdrop-blur-sm" 
                            : "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 active:bg-blue-700 transform hover:scale-[1.02] active:scale-[0.98]"
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
                            Send Friend Request
                          </>
                        )}
                      </button>
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