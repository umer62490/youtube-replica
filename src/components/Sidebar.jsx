// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHome,
//   faBolt,
//   faVideo,
//   faHistory,
//   faList,
//   faClock,
//   faThumbsUp,
//   faDownload,
// } from "@fortawesome/free-solid-svg-icons";
// import "../assets/css/style.css";

// const Sidebar = () => {
//   const [showAll, setShowAll] = useState(false);

//   const mainMenu = [
//     { icon: faHome, label: "Home", active: true },
//     { icon: faBolt, label: "Shorts" },
//     { icon: faVideo, label: "Subscriptions" },
//   ];

//   const youMenu = [
//     { icon: faHistory, label: "History" },
//     { icon: faList, label: "Playlists" },
//     { icon: faVideo, label: "Your videos" },
//     { icon: faClock, label: "Watch later" },
//     { icon: faThumbsUp, label: "Liked videos" },
//     { icon: faDownload, label: "Downloads" },
//   ];

//   const Subscription = [
//     { icon: faHistory, label: "GTV Network" },
//     { icon: faList, label: "Geo News" },
//     { icon: faVideo, label: "Bol News" },
//     { icon: faClock, label: "ARY Digital HD" },
//     { icon: faThumbsUp, label: "WWE" },
//     { icon: faVideo, label: "Your videos" },
//     { icon: faClock, label: "Watch later" },
//     { icon: faThumbsUp, label: "Liked videos" },
//   ];

//   const visibleSubscriptions = showAll
//     ? Subscription
//     : Subscription.slice(0, 5);

//   return (
//     <section className="sidebar min-w-60 w-60 p-2 text-sm">
//       {/* Main Menu */}
//       <div>
//         {mainMenu.map((item, idx) => (
//           <div
//             key={idx}
//             className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
//               item.active ? "bg-gray-100 font-medium" : ""
//             }`}
//           >
//             <FontAwesomeIcon icon={item.icon} className="text-lg" />
//             <span>{item.label}</span>
//           </div>
//         ))}
//       </div>

//       <hr className="my-3" />

//       <div>
//         {youMenu.map((item, idx) => (
//           <div
//             key={idx}
//             className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100 w-full ${
//               item.active ? "bg-gray-100 font-medium" : ""
//             }`}
//           >
//             <FontAwesomeIcon icon={item.icon} className="text-lg" />
//             <span>{item.label}</span>
//           </div>
//         ))}
//       </div>

//       <hr className="my-3" />

//       <div>
//         {visibleSubscriptions.map((item, idx) => (
//           <div
//             key={idx}
//             className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
//           >
//             <FontAwesomeIcon icon={item.icon} className="text-lg" />
//             <span>{item.label}</span>
//           </div>
//         ))}

//         {/* Show More / Show Less Button */}
//      {/* Show More / Show Less Button */}
// {Subscription.length > 5 && (
//   <div
//     onClick={() => setShowAll(!showAll)}
//     className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100 w-full"
//   >
//     <span>{showAll ? "↑ Show Less" : "↓ Show More"}</span>
//   </div>
// )}

//       </div>

//       <hr className="my-3" />

// <div>
//   {youMenu.map((item, idx) => (
//     <div
//       key={idx}
//       className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100 w-full ${
//         item.active ? "bg-gray-100 font-medium" : ""
//       }`}
//     >
//       <FontAwesomeIcon icon={item.icon} className="text-lg" />
//       <span>{item.label}</span>
//     </div>
//   ))}
// </div>
//     </section>
//   );
// };

// export default Sidebar;



import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBolt,
  faVideo,
  faHistory,
  faList,
  faClock,
  faThumbsUp,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // <-- new
import "../assets/css/style.css";

const Sidebar = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate(); // <-- hook

  const mainMenu = [
    { icon: faHome, label: "Home", path: "/" },
    { icon: faBolt, label: "Shorts", path: "/shorts" },
    { icon: faVideo, label: "Subscriptions", path: "/subscriptions" },
  ];

  const youMenu = [
    { icon: faHistory, label: "History", path: "/history" }, // <-- history page
    { icon: faList, label: "Playlists", path: "/playlists" },
    { icon: faVideo, label: "Your videos", path: "/your-videos" },
    { icon: faClock, label: "Watch later", path: "/watch-later" },
    { icon: faThumbsUp, label: "Liked videos", path: "/liked" },
    { icon: faDownload, label: "Downloads", path: "/downloads" },
  ];

  const Subscription = [
    { icon: faHistory, label: "GTV Network" },
    { icon: faList, label: "Geo News" },
    { icon: faVideo, label: "Bol News" },
    { icon: faClock, label: "ARY Digital HD" },
    { icon: faThumbsUp, label: "WWE" },
  ];

  const ExtraFeatures = [
    { icon: faHistory, label: "GTV Network" },
    { icon: faList, label: "Geo News" },
    { icon: faVideo, label: "Bol News" },
    { icon: faClock, label: "ARY Digital HD" },
    { icon: faThumbsUp, label: "WWE" },
  ];

  const visibleSubscriptions = showAll
    ? Subscription
    : Subscription.slice(0, 5);

  return (
    <section className="sidebar min-w-60 w-60 p-2 text-sm">
      {/* Main Menu */}
      <div>
        {mainMenu.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(item.path)} // <-- navigate
            className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100`}
          >
            <FontAwesomeIcon icon={item.icon} className="text-lg" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <hr className="my-3" />

      {/* You Menu */}
      <div>
        {youMenu.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(item.path)} // <-- navigate
            className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100 w-full"
          >
            <FontAwesomeIcon icon={item.icon} className="text-lg" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <hr className="my-3" />

      <div>
        {ExtraFeatures.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(item.path)} // <-- navigate
            className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100 w-full"
          >
            <FontAwesomeIcon icon={item.icon} className="text-lg" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <hr className="my-3" />

      {/* Subscriptions */}
      <div>
        {visibleSubscriptions.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={item.icon} className="text-lg" />
            <span>{item.label}</span>
          </div>
        ))}

        {/* Show More / Less */}
        {Subscription.length > 5 && (
          <div
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100 w-full"
          >
            <span>{showAll ? "↑ Show Less" : "↓ Show More"}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Sidebar;

