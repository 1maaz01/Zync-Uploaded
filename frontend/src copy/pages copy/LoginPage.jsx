import { useState } from "react";
import { ShipWheel } from "lucide-react";

import useLogin from "../hooks/useLogin";



const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="font-serif min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="playfair-font  relative border border-white/10 bg-black/20 backdrop-blur-xl flex flex-col lg:flex-row w-full max-w-6xl mx-auto rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-6 sm:p-12 flex flex-col relative">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-purple-500/5 rounded-l-2xl"></div>
          
          <div className="relative z-10">
            {/* LOGO */}
            <div className="mb-8 flex items-center justify-start gap-3 group">
              <div className="relative">
                <ShipWheel className="w-12 h-12 text-yellow-400 group-hover:rotate-180 transition-transform duration-700" />
                <div className="absolute inset-0 w-12 h-12 bg-yellow-400/20 rounded-full blur-lg animate-pulse"></div>
              </div>
              <span className="text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 tracking-wider animate-pulse">
                Zync
              </span>
            </div>

            {/* ERROR MESSAGE DISPLAY */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg text-sm backdrop-blur-sm animate-shake">
                <span>{error.response?.data?.message || "Login failed"}</span>
              </div>
            )}

            <div className="w-full">
              <div onSubmit={handleLogin} className="space-y-8">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Welcome Back
                  </h2>
                  <p className="text-white/60 text-lg">
                    Sign in to your account to continue your language journey
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="relative group">
                    <label className="block text-sm font-medium mb-2 text-white/80">Email</label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
                  </div>

                  <div className="relative group">
                    <label className="block text-sm font-medium mb-2 text-white/80">Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
                  </div>

                  <div className="flex items-center justify-center mt-8">
                    <button
                      type="submit"
                      onClick={handleLogin}
                      className="relative px-12 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25 group overflow-hidden"
                      disabled={isPending}
                    >
                      <span className="relative z-10">
                        {isPending ? "Signing in..." : "Sign In"}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {isPending && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        </div>
                      )}
                    </button>
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-white/60">
                      Don't have an account?{" "}
                      <a href="/signup" className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium hover:underline">
                        Create one
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-yellow-900/10 to-purple-900/10 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-purple-500/5"></div>
          
          {/* Animated geometric shapes */}
          <div className="absolute top-10 right-10 w-20 h-20 border-2 border-yellow-400/30 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-10 left-10 w-16 h-16 border-2 border-purple-400/30 rotate-45 animate-bounce"></div>
          <div className="absolute top-1/2 right-20 w-12 h-12 bg-yellow-400/20 rounded-full blur-sm animate-pulse"></div>
          
          <div className="relative z-10 max-w-lg p-8 text-center">
            <div className="relative aspect-square max-w-sm mx-auto mb-8 group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-purple-400/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-yellow-500/10 to-purple-500/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                <div className="text-8xl">🌍</div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Connect with language partners worldwide
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Practice conversations, make friends, and improve your language skills together in our global community
              </p>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;