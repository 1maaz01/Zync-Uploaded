import { CheckCircle, MapPin, UserPlus } from "lucide-react";



const SuggestionCard = ({hasRequestBeenSent, user, sendRequestMutation, isPending }) => {
    return (
        <div
            key={user._id}
            className={`min-w-[300px] shadow-lg transition-all duration-300 hover:-translate-y-1  ${hasRequestBeenSent ? "shadow-green-600":"shadow-rose-600"} border-white/10 border  bg-[#100f0f] backdrop-blur-sm rounded-2xl  transition-all duration-300  group`}
        >
            <div className="p-6 space-y-4" >
                <div   className="flex items-center gap-3">
                    <div className="relative">
                        <img  
                            src={user.profilePic} 
                            alt={user.fullName}
                            className="w-16 h-16 rounded-full object-cover transition-all duration-200"
                        />
                    </div>

                    <div className="flex-1">
                        <h3  className="font-semibold text-lg text-white  transition-colors duration-200">{user.fullName}</h3>
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
            }

export default SuggestionCard