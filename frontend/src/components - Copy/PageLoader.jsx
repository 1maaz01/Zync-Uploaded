import { Loader } from "lucide-react";



const PageLoader = () => {
  return (
    <div className="playfair-font min-h-screen flex items-center justify-center relative overflow-hidden bg-black">

      {/* Dynamic animated background */}
      <div className="absolute inset-0 hidden sm:block">
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-pink-500/30 to-violet-600/30 rounded-full blur-xl animate-bounce [animation-duration:3s]"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-cyan-400/40 to-blue-600/40 rounded-full blur-xl animate-bounce [animation-duration:4s] [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-16 w-20 h-20 bg-gradient-to-br from-emerald-400/35 to-teal-500/35 rounded-full blur-lg animate-bounce [animation-duration:5s] [animation-delay:2s]"></div>
        <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-gradient-to-br from-orange-400/30 to-rose-500/30 rounded-full blur-xl animate-bounce [animation-duration:3.5s] [animation-delay:0.5s]"></div>
        
      </div>



      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Main loading spinner with multiple layers */}
        <div className="relative">
          {/* Outermost ring - rainbow gradient */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 via-blue-600 via-green-500 via-yellow-500 to-red-500 animate-spin [animation-duration:3s] p-1">
            <div className="w-full h-full rounded-full bg-black"></div>
          </div>
          
          {/* Second ring - pulsing glow */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-violet-500/50 to-fuchsia-500/50 blur-sm animate-pulse"></div>
          
          {/* Third ring - rotating segments */}
          <div className="absolute -inset-2 rounded-full border-4 border-transparent border-t-cyan-400 border-r-violet-500 animate-spin [animation-duration:1.5s] [animation-direction:reverse]"></div>
          
          {/* Inner container with glassmorphism */}
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center">
            {/* Core loader icon */}
            <Loader className="animate-spin w-10 h-10 text-white drop-shadow-lg" />
            
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-500/20 animate-pulse"></div>
          </div>
        </div>
        
        {/* Enhanced loading text */}
        <div className="text-center space-y-6">
          {/* Main loading text with animated gradient */}
          <div className="relative">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent animate-pulse bg-[length:200%_100%] animate-[gradient_3s_ease_infinite]">
              Loading
            </h2>
            {/* Text glow effect */}
            <h2 className="absolute inset-0 text-5xl font-bold bg-gradient-to-r from-cyan-400 via-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent blur-sm opacity-50 animate-pulse">
              Loading
            </h2>
          </div>
          
          {/* Animated progress dots */}
          <div className="flex space-x-3 justify-center">
            <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce [animation-delay:-0.3s] shadow-lg shadow-cyan-500/50 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-ping"></div>
            </div>
            <div className="w-4 h-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-bounce [animation-delay:-0.15s] shadow-lg shadow-violet-500/50 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-ping [animation-delay:0.5s]"></div>
            </div>
            <div className="w-4 h-4 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full animate-bounce shadow-lg shadow-fuchsia-500/50 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full animate-ping [animation-delay:1s]"></div>
            </div>
          </div>
    
        </div>
      </div>
      

    </div>
  );
};

export default PageLoader;