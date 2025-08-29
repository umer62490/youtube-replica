
// import './App.css';
// import Header from './components/Header';
// import HomePage from './pages/HomePage';

// function App() {
//   return (
//     <div>

//       <HomePage/>
    
//     </div>
//   );
// }

// export default App;


// src/App.js


// src/App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/HomePage";
import HistoryPage from "../src/components/HistoryPage"; // Ye page banayenge history ke liye

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
