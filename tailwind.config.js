/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",   // Ensure this is included if you're using it
    "./src/**/*.{js,ts,jsx,tsx}",  // This will include all JSX files in src
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        primary:"#13274F",
        secondary:"#E1EBEE",
        therd:"#8DA399",
        black:'#000000'
      },
      container:{
        center:true,
        padding:{
          default:"1 rem",
          sm:"2rem",

        }
      }
    },
  },
  plugins: [],
}
