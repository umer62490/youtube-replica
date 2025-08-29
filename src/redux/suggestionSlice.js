// src/redux/suggestionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

// Async thunk for live suggestions
export const fetchSuggestions = createAsyncThunk(
  "suggestion/fetchSuggestions",
  async (query) => {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`, 
      {
        params: {
          part: "snippet",
          maxResults: 5, // limit suggestions
          q: query,
          type: "video",
          key: API_KEY,
          
        },
        
      }
    );
    return res.data.items.map(item => item.snippet.title);
  }
);

const suggestionSlice = createSlice({
  name: "suggestion",
  initialState: {
    suggestions: [],
    history: JSON.parse(localStorage.getItem("searchHistory")) || [],
    loading: false,
    error: null,
  },
  
  reducers: {
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
    addSearchHistory: (state, action) => {
        const term = action.payload;
        if (!state.history.includes(term)) {
          state.history.unshift(term); // latest on top
          localStorage.setItem("searchHistory", JSON.stringify(state.history));
        }
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSuggestions,addSearchHistory } = suggestionSlice.actions;
export default suggestionSlice.reducer;
