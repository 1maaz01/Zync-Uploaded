import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon, CameraIcon } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="playfair-font  min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
          
          <div className="relative border border-white/15 bg-black/20 backdrop-blur-xl w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            
            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                  Complete Your Profile
                </h1>
                <p className="text-gray-300 text-lg">Let's set up your language learning journey</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* PROFILE PIC CONTAINER */}
                <div className="flex flex-col items-center justify-center space-y-6">
                  {/* IMAGE PREVIEW */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 overflow-hidden ring-4 ring-purple-500/30 transition-all duration-300 group-hover:ring-purple-400/50 group-hover:scale-105">
                      {formState.profilePic ? (
                        <img
                          src={formState.profilePic}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <CameraIcon className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <CameraIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Generate Random Avatar BTN */}
                  <button 
                    type="button" 
                    onClick={handleRandomAvatar} 
                    className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                    <ShuffleIcon className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">Generate Random Avatar</span>
                  </button>
                </div>

                {/* FULL NAME */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formState.fullName}
                      onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-600/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-gray-800/50 backdrop-blur-sm focus:bg-gray-700/50 text-white placeholder-gray-400 text-lg"
                      placeholder="Your full name"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                  </div>
                </div>

                {/* BIO */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    Bio
                  </label>
                  <div className="relative">
                    <textarea
                      name="bio"
                      value={formState.bio}
                      onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-600/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-gray-800/50 backdrop-blur-sm focus:bg-gray-700/50 text-white placeholder-gray-400 h-32 resize-none text-lg"
                      placeholder="Tell others about yourself and your language learning goals..."
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                  </div>
                </div>


                {/* LOCATION */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-5 w-6 h-6 text-purple-400" />
                    <input
                      type="text"
                      name="location"
                      value={formState.location}
                      onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                      className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-600/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-gray-800/50 backdrop-blur-sm focus:bg-gray-700/50 text-white placeholder-gray-400 text-lg"
                      placeholder="City, Country"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-6">
                  <button 
                    className={`relative w-full py-5 rounded-2xl font-bold text-white text-lg transition-all duration-200 flex items-center justify-center overflow-hidden group ${
                      isPending 
                        ? 'bg-gray-700 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] shadow-2xl hover:shadow-purple-500/25'
                    }`}
                    disabled={isPending} 
                    type="submit"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                    {!isPending ? (
                      <>
                        <ShipWheelIcon className="w-6 h-6 mr-3 relative z-10" />
                        <span className="relative z-10">Complete Onboarding</span>
                      </>
                    ) : (
                      <>
                        <LoaderIcon className="animate-spin w-6 h-6 mr-3 relative z-10" />
                        <span className="relative z-10">Onboarding...</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
  );
};
export default OnboardingPage;
