import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className=" bg-orange-600 cursor-pointer hover:bg-orange-700 w-12 right-1 rounded-2xl text-white p-3   flex items-center justify-end  mx-auto  absolute -top-1">
      <button onClick={handleVideoCall} >
        <VideoIcon className="size-6" />
      </button>
    </div>
  );
}

export default CallButton;
