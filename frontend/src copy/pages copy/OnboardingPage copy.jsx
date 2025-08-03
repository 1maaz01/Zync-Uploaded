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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 w-full max-w-3xl rounded-3xl shadow-2xl border border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2"></div>
        
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Complete Your Profile</h1>
            <p className="text-gray-300">Let's set up your language learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* IMAGE PREVIEW */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 overflow-hidden ring-4 ring-gray-600 transition-all duration-300 group-hover:ring-indigo-500">
                  {formState.profilePic ? (
                    <img
                      src={formState.profilePic}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <CameraIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <CameraIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Generate Random Avatar BTN */}
              <button 
                type="button" 
                onClick={handleRandomAvatar} 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-medium hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <ShuffleIcon className="w-4 h-4 mr-2" />
                Generate Random Avatar
              </button>
            </div>

            {/* FULL NAME */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 bg-gray-700 focus:bg-gray-600 text-white placeholder-gray-400"
                placeholder="Your full name"
              />
            </div>

            {/* BIO */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">
                Bio
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 bg-gray-700 focus:bg-gray-600 text-white placeholder-gray-400 h-24 resize-none"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NATIVE LANGUAGE */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">
                  Native Language
                </label>
                <div className="relative">
                  <select
                    name="nativeLanguage"
                    value={formState.nativeLanguage}
                    onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 bg-gray-700 focus:bg-gray-600 text-white appearance-none cursor-pointer"
                  >
                    <option value="">Select your native language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* LEARNING LANGUAGE */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">
                  Learning Language
                </label>
                <div className="relative">
                  <select
                    name="learningLanguage"
                    value={formState.learningLanguage}
                    onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 bg-gray-700 focus:bg-gray-600 text-white appearance-none cursor-pointer"
                  >
                    <option value="">Select language you're learning</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* LOCATION */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">
                Location
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 bg-gray-700 focus:bg-gray-600 text-white placeholder-gray-400"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4">
              <button 
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center ${
                  isPending 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
                }`}
                disabled={isPending} 
                type="submit"
              >
                {!isPending ? (
                  <>
                    <ShipWheelIcon className="w-5 h-5 mr-2" />
                    Complete Onboarding
                  </>
                ) : (
                  <>
                    <LoaderIcon className="animate-spin w-5 h-5 mr-2" />
                    Onboarding...
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
