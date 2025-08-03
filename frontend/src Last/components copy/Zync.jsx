import { Navigation } from "lucide-react";


const Zync = () => {
  return (
          <div className="mb-8 flex items-center justify-start gap-3 group">
            <div className="relative">
              <Navigation className="w-12 h-12 text-yellow-400 group-hover:rotate-180 transition-transform duration-700" />
              <div className="absolute inset-0 bg-indigo-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <span className="text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 tracking-wider animate-pulse">
                Zync
            </span>
          </div>


  )
}

export default Zync