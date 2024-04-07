/** @type {import('tailwindcss').Config} */
export default {
     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

     theme: {
          extend: {
               fontFamily: {
                    sans: ["Roboto", "sans-serif"],
               },
               gridTemplateColumns: {'70/30':'70% 28%'},
               colors:{
                    button:'#020058'
               },
               boxShadow: {
                    '3xl': '0 4px 3px rgb(0 0 0 / 0.07)',
                  }
          },
     },
     plugins: [],
};
