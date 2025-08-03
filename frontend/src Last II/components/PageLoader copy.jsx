import { Loader } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="playfair-font min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Outer rotating ring */}
        <div className="relative">
          <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin [animation-duration:3s]" style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.5), transparent)',
            borderRadius: '50%'
          }}></div>
          
          {/* Middle pulsing ring */}
          <div className="absolute inset-2 w-28 h-28 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-pulse"></div>
          
          {/* Inner loader container */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm border border-white/10 shadow-2xl flex items-center justify-center">
              <Loader className="animate-spin w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        
        {/* Loading text with gradient */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-pulse">
            Loading
          </h2>
          
          {/* Progress dots */}
          <div className="flex space-x-2 justify-center">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s] shadow-lg shadow-blue-500/50"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce [animation-delay:-0.15s] shadow-lg shadow-purple-500/50"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-bounce shadow-lg shadow-pink-500/50"></div>
          </div>
          
          {/* Subtle loading bar */}
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageLoader;