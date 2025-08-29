// src/features/youtubeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

// Fetch videos from YouTube API
export const fetchVideos = createAsyncThunk(
  "youtube/fetchVideos",
  async (query) => {
    const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        maxResults: 12,
        q: query,
        type: "video",
        key: API_KEY,
      },
    });
    return res.data.items;
  }
);

const historySlice = createSlice({
  name: "youtube",
  initialState: {
    videos: [],
    history: [],
    playingVideo: null,
    loading: false,
    error: null,
  },
  reducers: {
    addToHistory: (state, action) => {
      const video = action.payload;

      // Normalize video ID
      const videoId = video.id?.videoId || video.id;

      // Remove any duplicate with same ID
      state.history = state.history.filter(
        (v) => (v.id?.videoId || v.id) !== videoId
      );

      // Add new video on top
      state.history.unshift(video);
    },
    setPlayingVideo: (state, action) => {
      state.playingVideo = action.payload;
    },
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToHistory, clearHistory, setPlayingVideo, setVideos } =
  historySlice.actions;

export default historySlice.reducer;
