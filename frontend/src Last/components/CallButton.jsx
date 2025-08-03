import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className=" bg-orange-600 cursor-pointer hover:bg-orange-700 w-12 right-1 rounded-2xl text-white p-3  flex items-center justify-end max-w-7xl mx-auto  absolute top-1">
      <button onClick={handleVideoCall} className="btn btn-success btn-sm ">
        <VideoIcon className="size-6" />
      </button>
    </div>
  );
}

export default CallButton;
