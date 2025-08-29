/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // agar React CRA use kar rahe ho
    "./src/**/*.{js,ts,jsx,tsx}", // React/Next ke liye sab folders scan honge
  ],
  theme: {
    extend: {
     
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
};
