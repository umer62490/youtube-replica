import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

// Fetch comments for a specific video
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (videoId) => {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/commentThreads",
      {
        params: {
          part: "snippet",
          videoId: videoId,
          maxResults: 20, // jitne comments chahiye
          key: API_KEY,
        },
      }
    );
    return res.data.items;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [], // comments array
    loading: false,
    error: null,
  },
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
