// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

// const VideoCard = ({ video }) => {
//   const [isPlaying, setIsPlaying] = useState(false);

//   // YouTube video id
//   const videoId = video.id.videoId;
//   const thumbnail = video.snippet.thumbnails.medium.url;
//   const title = video.snippet.title;
//   const channel = video.snippet.channelTitle;

//   return (
//     <div className="video-card w-full">
//       {/* Video / Thumbnail */}
//       <div className="relative">
//         {isPlaying ? (
//           <iframe
//             width="100%"
//             height="200"
//             src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
//             title={title}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             allowFullScreen
//             className="rounded-lg"
//           ></iframe>
//         ) : (
//           <img
//             src={thumbnail}
//             alt={title}
//             className="rounded-lg w-full cursor-pointer"
//             onClick={() => setIsPlaying(true)}
//           />
//         )}

//         <FontAwesomeIcon
//           icon={faEllipsisV}
//           className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
//         />
//       </div>

//       {/* Video Info */}
//       <div className="flex mt-3 gap-3">
//         {/* Channel Icon (dummy for now) */}
//         <div>
//           <img
//             src="https://via.placeholder.com/40"
//             alt="Channel Icon"
//             className="rounded-full w-10 h-10"
//           />
//         </div>

//         {/* Description */}
//         <div className="flex-1">
//           <p className="font-semibold text-sm leading-tight">{title}</p>
//           <h2 className="text-xs text-gray-600">{channel}</h2>
//           {/* Views & Time — YouTube Search API me direct views/time nhi milte,
//               agar chahiye to ek aur API call (videos.list) karna padega */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoCard;

// src/components/VideoCard.jsx

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToHistory } from "../redux/historySlice"; // Correct slice
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VideoCard = ({ video, onPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();

  const videoId = video.id?.videoId || video.id;
  const thumbnail = video.snippet?.thumbnails?.medium?.url || video.thumbnail;
  const title = video.snippet?.title || video.title;
  const channel = video.snippet?.channelTitle || video.channel;
  const publishedAt = video.snippet?.publishedAt;
  const views = video.statistics?.viewCount || "1M"; // fallback
  const timeAgo = publishedAt
    ? new Date(publishedAt).toLocaleDateString()
    : "2 days ago";

  const handlePlay = () => {
    setIsPlaying(true);

    // Parent ko notify
    if (onPlay) onPlay(video);

    // Add to history
    dispatch(
      addToHistory({
        id: videoId,
        title,
        thumbnail,
        channel,
        views,
        publishedAt,
      })
    );
  };

  return (
    <div className="video-card w-full">
      {isPlaying ? (
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allowFullScreen
          className="rounded-lg"
        />
      ) : (
        <>
          <img
            src={thumbnail}
            alt={title}
            className="rounded-lg w-full cursor-pointer"
            onClick={handlePlay}
          />
          <div className="flex mt-2 gap-3 items-start">
            <img
              src="https://via.placeholder.com/40"
              alt="Channel"
              className="rounded-full w-10 h-10"
            />
            <div className="flex-1">
              <p className="font-semibold text-sm">{title}</p>
              <h2 className="text-xs text-gray-600">{channel}</h2>
              <p className="text-xs text-gray-500">{views} views • {timeAgo}</p>
            </div>
            <FontAwesomeIcon
              icon={faEllipsisV}
              className="text-gray-600 cursor-pointer"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default VideoCard;
