import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="playfair-font  p-4 sm:p-6 lg:p-8 bg-black min-h-screen">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 text-white">Notifications</h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {incomingRequests.length > 0 && (
              <section className="space-y-4">
                  <div className="w-full ">
                    <h2 className="text-xl font-semibold flex items-center gap-2 text-white  bg-white/10 w-64 p-4 rounded-full ">
                      <UserCheckIcon className="h-5 w-5 text-blue-400" />
                      Friend Requests
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-medium ml-2">
                        {incomingRequests.length}
                      </span>
                    </h2>
                </div>

                <div className="space-y-3">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="bg-black rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-white/20"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-full overflow-hidden">
                              <img 
                                src={request.sender.profilePic} 
                                alt={request.sender.fullName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{request.sender.fullName}</h3>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-600 text-white">
                                  Native: {request.sender.nativeLanguage}
                                </span>
                                <span className="px-2 py-1 rounded-full text-xs font-medium border border-gray-600 text-gray-300">
                                  Learning: {request.sender.learningLanguage}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition-colors disabled:opacity-50"
                            onClick={() => acceptRequestMutation(request._id)}
                            disabled={isPending}
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ACCEPTED REQS NOTIFICATIONS */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-4">
                <div className=" w-full items-start">
                  <h2 className="text-xl font-semibold flex items-center gap-2 text-white bg-white/10 w-56 p-2 pl-4 pr-4 rounded-full">
                    <BellIcon className="h-5 w-5 text-green-400" />
                    New Connections
                  </h2>
                </div>

                <div className="space-y-3">
                  {acceptedRequests.map((notification) => (
                    <div 
                      key={notification._id} 
                      className="bg-white/10 rounded-lg shadow-lg border border-white/20"
                    >
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden mt-1">
                            <img
                              src={notification.recipient.profilePic}
                              alt={notification.recipient.fullName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">{notification.recipient.fullName}</h3>
                            <p className="text-sm my-1 text-gray-300">
                              {notification.recipient.fullName} accepted your friend request
                            </p>
                            <p className="text-xs flex items-center text-gray-400">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              Recently
                            </p>
                          </div>
                          <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            <MessageSquareIcon className="h-3 w-3" />
                            New Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound />
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default NotificationsPage;
