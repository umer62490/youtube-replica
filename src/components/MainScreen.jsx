// import React, { useRef, useState } from "react";
// import CurveButton from "./CurveButoon";
// import VideoCard from "../components/VideoCart";
// import Video from "../assets/videos/shoes-website.mp4";
// import '../assets/css/style.css'

// const MainScreen = () => {
//   const scrollRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);

//   const buttons = [
//     "TV","Music","Shark Tank","Computer Programming","Podcasts",
//     "T-series","Music","Shark Tank","Computer Programming","Podcasts",
//     "Computer Programming","Podcasts","T-series","Music","Shark Tank",
//     "Computer Programming","Podcasts",
//   ];

//   // Dummy video data
//   const videos = [
//     {
//       id: 1,
//       thumbnail: Video,
//       duration: "12:05",
//       title: "How to Build a Shoes Website",
//       channel: "CodeWithReact",
//       views: "1.2M",
//       time: "2 days ago",
//     },
//     {
//       id: 2,
//       thumbnail: Video,
//       duration: "8:45",
//       title: "React Tailwind Crash Course",
//       channel: "DevWorld",
//       views: "980K",
//       time: "1 week ago",
//     },
//     {
//       id: 3,
//       thumbnail: Video,
//       duration: "15:30",
//       title: "Master JavaScript in 2025",
//       channel: "JS Mastery",
//       views: "2.1M",
//       time: "3 weeks ago",
//     },
//     {
//       id: 4,
//       thumbnail: Video,
//       duration: "10:12",
//       title: "Next.js Full Guide",
//       channel: "Codeverse",
//       views: "500K",
//       time: "5 days ago",
//     },
//     {
//       id: 5,
//       thumbnail: Video,
//       duration: "22:05",
//       title: "Tailwind CSS Deep Dive",
//       channel: "DesignPro",
//       views: "650K",
//       time: "1 month ago",
//     },
//     {
//       id: 6,
//       thumbnail: Video,
//       duration: "22:05",
//       title: "Tailwind CSS Deep Dive",
//       channel: "DesignPro",
//       views: "650K",
//       time: "1 month ago",
//     },
//     {
//       id: 7,
//       thumbnail: Video,
//       duration: "22:05",
//       title: "Tailwind CSS Deep Dive",
//       channel: "DesignPro",
//       views: "650K",
//       time: "1 month ago",
//     },
//     {
//       id: 8,
//       thumbnail: Video,
//       duration: "22:05",
//       title: "Tailwind CSS Deep Dive",
//       channel: "DesignPro",
//       views: "650K",
//       time: "1 month ago",
//     },
//     {
//       id: 9,
//       thumbnail: Video,
//       duration: "22:05",
//       title: "Tailwind CSS Deep Dive",
//       channel: "DesignPro",
//       views: "650K",
//       time: "1 month ago",
//     },
//     {
//       id: 10,
//       thumbnail: Video,
//       duration: "22:05",
//       title: "Tailwind CSS Deep Dive",
//       channel: "DesignPro",
//       views: "650K",
//       time: "1 month ago",
//     },
//     {
//       id: 11,
//       thumbnail: Video,
//       duration: "22:05",
//       title: "Tailwind CSS Deep Dive",
//       channel: "DesignPro",
//       views: "650K",
//       time: "1 month ago",
//     },
//     {
//       id: 12,
//       thumbnail: Video,
//       duration: "22:05",
//       title: "Tailwind CSS Deep Dive",
//       channel: "DesignPro",
//       views: "650K",
//       time: "1 month ago",
//     },
//   ];

//   // Mouse down
//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setStartX(e.pageX - scrollRef.current.offsetLeft);
//     setScrollLeft(scrollRef.current.scrollLeft);
//   };

//   // Mouse leave / up
//   const handleMouseUpOrLeave = () => {
//     setIsDragging(false);
//   };

//   // Mouse move
//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     e.preventDefault();
//     const x = e.pageX - scrollRef.current.offsetLeft;
//     const walk = (x - startX) * 2; // scroll speed
//     scrollRef.current.scrollLeft = scrollLeft - walk;
//   };

//   return (
//     <section className="mainScreen flex-1 h-[calc(100vh-60px)] overflow-y-auto hide-scrollbar bg-white">
//     {/* Sticky Buttons */}
//     <div
//       ref={scrollRef}
//       className="flex gap-2 bg-white overflow-x-hidden hide-scrollbar space-x-4 px-2 py-2 
//       cursor-grab sticky top-0 z-20 shadow-sm active:cursor-grabbing"
//       onMouseDown={handleMouseDown}
//       onMouseLeave={handleMouseUpOrLeave}
//       onMouseUp={handleMouseUpOrLeave}
//       onMouseMove={handleMouseMove}
//     >
//       {buttons.map((label, index) => (
//         <CurveButton key={index} label={label} />
//       ))}
//     </div>

//     {/* Videos Grid */}
//     <div className="grid grid-cols-3 gap-6 p-4">
//       {videos.map((video) => (
//         <VideoCard key={video.id} {...video} />
//       ))}
//     </div>
//   </section>
//   );
// };

// export default MainScreen;

import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CurveButton from "./CurveButoon";
import VideoCard from "../components/VideoCart";
import { addToHistory } from "../redux/historySlice"; // history action
import { fetchComments, clearComments } from "../redux/commentReducer"; // comments slice
import "../assets/css/style.css";

const CommentsSection = () => {
  const { comments, loading, error } = useSelector((state) => state.comments);

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!comments.length) return <p>No comments yet</p>;

  return (
    <div className="comments-section mt-4">
      {comments.map((c) => {
        const comment = c.snippet.topLevelComment.snippet;
        return (
          <div key={c.id} className="flex gap-2 mb-3">
            <img
              src={comment.authorProfileImageUrl}
              alt={comment.authorDisplayName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-sm">{comment.authorDisplayName}</p>
              <p className="text-sm">{comment.textDisplay}</p>
              <p className="text-xs text-gray-500">{new Date(comment.publishedAt).toLocaleString()}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const MainScreen = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const videos = useSelector((state) => state.youtube.videos);
  const [playingVideo, setPlayingVideo] = useState(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const buttons = [
    "TV","Music","Shark Tank","Computer Programming","Podcasts",
    "T-series","Comedy","Gaming","Cricket","Live","Football",
    "Doraemon","TMKC","Match",
  ];

  // Scrollable buttons
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseUpOrLeave = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Video play
  const handlePlay = (video) => {
    setPlayingVideo(video);
    dispatch(addToHistory(video));

    // Clear previous comments
    dispatch(clearComments());

    // Fetch comments for selected video
    dispatch(fetchComments(video.id.videoId || video.id));
  };

  return (
    <section className="mainScreen flex-1 h-[calc(100vh-60px)] overflow-y-auto hide-scrollbar bg-white">
      {/* Sticky Buttons */}
      <div
        ref={scrollRef}
        className="flex gap-2 bg-white overflow-x-hidden hide-scrollbar space-x-4 px-2 py-2 
          cursor-grab sticky top-0 z-20 shadow-sm active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
      >
        {buttons.map((label, index) => (
          <CurveButton key={index} label={label} />
        ))}
      </div>

      {/* Videos Layout */}
      {playingVideo ? (
        <div className="flex gap-4 p-4">
          {/* Main Video + Comments */}
          <div className="flex-1">
            <VideoCard video={playingVideo} />
            <CommentsSection /> {/* comments show honge yahan */}
          </div>

          {/* Side thumbnails */}
          <div className="flex flex-col gap-2 w-64">
            {videos
              .filter((v) => (v.id.videoId || v.id) !== (playingVideo.id.videoId || playingVideo.id))
              .map((video) => (
                <VideoCard
                  key={video.id.videoId || video.id}
                  video={video}
                  onPlay={() => handlePlay(video)}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 p-4">
          {videos.length === 0 ? (
            <p>No videos found</p>
          ) : (
            videos.map((video) => (
              <VideoCard
                key={video.id.videoId || video.id}
                video={video}
                onPlay={() => handlePlay(video)}
              />
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default MainScreen;
