/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        purple:{
          600:"#5046e4",
          400:"#e0e7ff",
          500:"#6a64c9"
        },
        gray:{
          400:"#dddddd",
          500:"#acaeaf",
          600:"#6e737c",
          700:"#b0b0b0"
        }
      }
    },
  },
  plugins: [],
}

