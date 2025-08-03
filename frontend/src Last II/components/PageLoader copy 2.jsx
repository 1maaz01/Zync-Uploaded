import { Loader } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="playfair-font min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Dynamic animated background */}
      <div className="absolute inset-0">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-fuchsia-500/20 to-cyan-400/30 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-orange-400/20 via-rose-500/30 to-indigo-600/40 animate-pulse [animation-delay:1s]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/25 via-blue-500/20 to-purple-600/35 animate-pulse [animation-delay:2s]"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-pink-500/30 to-violet-600/30 rounded-full blur-xl animate-bounce [animation-duration:3s]"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-cyan-400/40 to-blue-600/40 rounded-full blur-xl animate-bounce [animation-duration:4s] [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-16 w-20 h-20 bg-gradient-to-br from-emerald-400/35 to-teal-500/35 rounded-full blur-lg animate-bounce [animation-duration:5s] [animation-delay:2s]"></div>
        <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-gradient-to-br from-orange-400/30 to-rose-500/30 rounded-full blur-xl animate-bounce [animation-duration:3.5s] [animation-delay:0.5s]"></div>
        
        {/* Scanning light effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse transform -skew-x-12 [animation-duration:2s]"></div>
      </div>

      {/* Neural network pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping [animation-delay:0.5s]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-violet-400 rounded-full animate-ping [animation-delay:1s]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping [animation-delay:1.5s]"></div>
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
          
          {/* Animated progress wave */}
          <div className="w-80 h-2 bg-white/10 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse transform translate-x-[-100%] animate-[slide_2s_ease-in-out_infinite]"></div>
            <div className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 via-fuchsia-500 to-pink-500 rounded-full animate-pulse bg-[length:200%_100%]"></div>
          </div>
          
          {/* Status text */}
          <p className="text-white/70 text-lg font-light tracking-wider animate-pulse">
            Preparing your experience
          </p>
        </div>

        {/* Floating energy orbs */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${10 + (i * 7)}%`,
                top: `${20 + (i * 5)}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <div className={`w-3 h-3 rounded-full blur-sm ${
                i % 4 === 0 ? 'bg-cyan-400/60' :
                i % 4 === 1 ? 'bg-violet-500/60' :
                i % 4 === 2 ? 'bg-fuchsia-500/60' : 'bg-pink-500/60'
              } animate-ping`}></div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;