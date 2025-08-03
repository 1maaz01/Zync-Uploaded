import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader, MapPin, Anchor, Shuffle, Camera } from "lucide-react";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";




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
    <div className="playfair-font min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements - matching login page */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
          
      <div className="relative border border-white/15 bg-black/20 backdrop-blur-xl w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-2xl"></div>
        
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl pb-1 sm:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-3">
              Complete Your Profile
            </h1>
            <p className="text-white/60 text-lg">Let's set up your language learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* IMAGE PREVIEW */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-yellow-600 to-orange-600 overflow-hidden ring-4 ring-yellow-500/30 transition-all duration-300 group-hover:ring-yellow-700/50 group-hover:scale-105">
                  {formState.profilePic ? (
                    <img
                      src={formState.profilePic}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Camera className="w-16 h-16 text-white/60" />
                    </div>
                  )}
                </div>
              </div>

              {/* Generate Random Avatar BTN */}
              <button 
                type="button" 
                onClick={handleRandomAvatar} 
                className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 hover:opacity-90 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-yellow-500/25 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <Shuffle className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">Generate Random Avatar</span>
              </button>
            </div>

            {/* FULL NAME */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-white/80 mb-2">
                Full Name
              </label>
              <div className="relative group">
                <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/10 text-lg"
                  placeholder="Your full name"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
              </div>
            </div>

            {/* BIO */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-white/80 mb-2">
                Bio
              </label>
              <div className="relative group">
                <textarea
                  name="bio"
                  value={formState.bio}
                  onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/10 h-32 resize-none text-lg"
                  placeholder="Tell others about yourself..."
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
              </div>
            </div>


            {/* LOCATION */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-white/80 mb-2">
                Location
              </label>
              <div className="relative group">
                <MapPin className="absolute top-1/2 transform -translate-y-1/2 left-5 w-6 h-6 text-yellow-400" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="w-full pl-14 pr-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/10 text-lg"
                  placeholder="City, Country"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-6 w-full flex items-center justify-center">
              <button 
                className={`relative px-12 py-4 rounded-xl font-semibold text-white text-lg transition-all duration-300 flex items-center justify-center overflow-hidden group ${
                  isPending 
                    ? 'bg-gray-700 cursor-not-allowed opacity-50' 
                    : 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 hover:opacity-90 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/25'
                }`}
                disabled={isPending} 
                type="submit"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {!isPending ? (
                  <>
                    <Anchor className="w-6 h-6 mr-3 relative z-10" />
                    <span className="relative z-10">Complete Onboarding</span>
                  </>
                ) : (
                  <>
                    <Loader className="animate-spin w-6 h-6 mr-3 relative z-10" />
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