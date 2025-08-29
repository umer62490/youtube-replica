// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./historySlice";
import commentsReducer from "./commentReducer";
import suggestionReducer from "./suggestionSlice"; 

const store = configureStore({
  reducer: {
    youtube: historyReducer,
    comments: commentsReducer,
    suggestion: suggestionReducer,
  },
});

export default store;
