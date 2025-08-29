// src/pages/HistoryPage.jsx
import React from "react";
import { useSelector } from "react-redux";
import VideoCard from "../components/VideoCart";

const HistoryPage = () => {
  const historyVideos = useSelector((state) => state.youtube.history);

  return (
    <div className="mainScreen flex-1 p-4">
      <h1 className="text-2xl font-bold mb-4">History</h1>
      {historyVideos.length === 0 ? (
        <p>No videos watched yet.</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
  {historyVideos.map((video) => (
    <VideoCard key={video.id} video={video} /> // ← video.id use karo instead of video.id.videoId
  ))}
</div>

      )}
    </div>
  );
};

export default HistoryPage;
