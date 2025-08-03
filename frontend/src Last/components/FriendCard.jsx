import { Link } from "react-router";


const FriendCard = ({ friend }) => {
  return (
    <div className="playfair-font  min-w-[290px]  bg-[#100f0f]  rounded-xl shadow-lg shadow-amber-500/60 transition-all duration-300 hover:-translate-y-1 ">
      <div className="p-6">
        {/* USER INFO */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-700 hover:ring-blue-500 transition-all duration-300">
              <img 
                src={friend.profilePic} 
                alt={friend.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate text-lg">{friend.fullName}</h3>
            <p className="text-gray-400 text-sm">Online</p>
          </div>
        </div>

        {/* MESSAGE BUTTON */}
        <div className="w-full flex items-center justify-center">
            <Link 
              to={`/chat/${friend._id}`} 
              className=" px-10 py-2.5 inline-flex items-center bg-orange-600/80 hover:bg-orange-600/60  hover:shadow-lg  active:bg-orange-600 justify-center border border-black/60 text-white rounded-lg   transition-all duration-200 font-medium "
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Message
            </Link>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;