// import React from 'react'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars,faBell, faUserCircle,faMicrophone,faSearch  } from "@fortawesome/free-solid-svg-icons";
// import YoutubeLogo from '../assets/logos-icons/youtube-bg-remove-logo.png'

// const Header = () => {
//   return (
//     <nav className='flex justify-between p-4'>
//         <div className='left-side flex items-center gap-8'>
//             <div className='sidebar-drawer '>
//             <FontAwesomeIcon icon={faBars} className="text-2xl cursor-pointer" />

//             </div>
//             <div className=''>
//             <img 
//     className="w-[7vw] cursor-pointer" 
//     src={YoutubeLogo} 
//     alt="logo" 
//   />

//             </div>
//         </div>
//         <div className=' center-side flex items-center gap-2'>
//         <div className="flex items-center">
//       {/* Input field */}
//       <input
//         type="text"
//         placeholder="Search"
//         className="p-2 pl-4 text-xl border border-gray-400 rounded-l-full min-w-[40vw] focus:outline-none"
//       />

//       {/* Search button */}
//       <button className="bg-[#F8F8F8] border border-gray-400 border-l-0 rounded-r-full px-5 py-[10px]">
//         <FontAwesomeIcon icon={faSearch} className="text-gray-600 text-lg" />
//       </button>
//     </div>
//             <div className="voice-option bg-[#F0F0F0] p-3 rounded-full cursor-pointer">
//       <FontAwesomeIcon 
//         icon={faMicrophone} 
//         className="text-xl text-gray-700 hover:text-black" 
//       />
//     </div>
//         </div>
//         <div className="right-side flex items-center gap-4">
//       <button className="bg-[#F0F0F0] rounded-[5vw] flex items-center gap-2 p-2"><span className='text-2xl'>+</span>Create</button>

//       {/* Notification Icon */}
//       <FontAwesomeIcon 
//         icon={faBell} 
//         className="text-2xl cursor-pointer text-gray-700 hover:text-black" 
//       />

//       {/* Profile Icon */}
//       <FontAwesomeIcon 
//         icon={faUserCircle} 
//         className="text-3xl cursor-pointer text-gray-700 hover:text-black" 
//       />
//     </div>
//     </nav>
//   )
// }

// export default Header

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVideos } from "../redux/historySlice"; // Redux action
import {
  fetchSuggestions,
  clearSuggestions,
  addSearchHistory,
} from "../redux/suggestionSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faUserCircle,
  faMicrophone,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import YoutubeLogo from "../assets/logos-icons/youtube-bg-remove-logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const { suggestions } = useSelector((state) => state.suggestion);
  const [searchTerm, setSearchTerm] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Setup SpeechRecognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return console.warn("Speech Recognition not supported");

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onstart = () => setListening(true);

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      setListening(false);
      handleSearch(null, transcript); // Auto search
    };

    recognitionRef.current.onerror = () => setListening(false);
    recognitionRef.current.onend = () => setListening(false);
  }, []);

  // Search function
  const handleSearch = async (e, queryOverride) => {
    if (e) e.preventDefault();
    const query = queryOverride || searchTerm;
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${encodeURIComponent(
          query
        )}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
        
      );
      const data = await res.json();
      if (data.items) dispatch(setVideos(data.items));
      else dispatch(setVideos([]));

      // Add to search history
      dispatch(addSearchHistory(query));
      dispatch(clearSuggestions());
      setShowSuggestions(false);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  const startListening = () => {
    if (!recognitionRef.current) return alert("Speech Recognition not supported");
    if (listening) return;
    recognitionRef.current.start();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch(e);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() !== "") {
      dispatch(fetchSuggestions(e.target.value));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      dispatch(clearSuggestions());
    }
    
  };
  

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    handleSearch(null, suggestion);
  };

  return (
    <nav className="flex justify-between p-4 relative">
      {/* Left Side */}
      <div className="left-side flex items-center gap-8">
        <FontAwesomeIcon icon={faBars} className="text-2xl cursor-pointer" />
        <img className="w-[7vw] cursor-pointer" src={YoutubeLogo} alt="logo" />
      </div>

      {/* Center Side */}
      <div className="center-side flex flex-row items-center gap-3 relative">
        <form onSubmit={handleSearch} className="w-full">
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              className="p-2 pl-4 text-xl border border-gray-400 rounded-l-full min-w-[40vw] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#F8F8F8] border border-gray-400 border-l-0 rounded-r-full px-5 py-[10px]"
            >
              <FontAwesomeIcon icon={faSearch} className="text-gray-600 text-lg" />
            </button>
          </div>
        </form>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-[45px] w-[40vw] bg-white border border-gray-300 rounded shadow-lg z-50">
            {suggestions.map((s, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(s)}
              >
                {s}
              </div>
            ))}
          </div>
        )}

        <div
          onClick={startListening}
          className={`voice-option p-3 rounded-full cursor-pointer mt-2 ${
            listening ? "bg-red-500" : "bg-[#F0F0F0]"
          }`}
        >
          <FontAwesomeIcon
            icon={faMicrophone}
            className="text-xl text-gray-700 hover:text-black"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="right-side flex items-center gap-4">
        <button className="bg-[#F0F0F0] rounded-[5vw] flex items-center gap-2 p-2">
          <span className="text-2xl">+</span>Create
        </button>
        <FontAwesomeIcon icon={faBell} className="text-2xl cursor-pointer text-gray-700 hover:text-black" />
        <FontAwesomeIcon icon={faUserCircle} className="text-3xl cursor-pointer text-gray-700 hover:text-black" />
      </div>
    </nav>
  );
};

export default Header;
