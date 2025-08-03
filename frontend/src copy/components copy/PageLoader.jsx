import { LoaderIcon } from "lucide-react";


const PageLoader = () => {
  
  return (
    <div className="playfair-font   min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative flex flex-col items-center gap-6">
        {/* Animated background circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-2 border-blue-200 dark:border-blue-800 animate-pulse"></div>
          <div className="absolute w-16 h-16 rounded-full border-2 border-purple-200 dark:border-purple-800 animate-ping"></div>
        </div>
        
        {/* Main loader icon */}
        <div className="relative z-10 p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg">
          <LoaderIcon className="animate-spin size-10 text-blue-600 dark:text-blue-400" />
        </div>
        
        {/* Loading text */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 animate-pulse">
            Loading...
          </h2>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;