/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Fixed wildcard issue
    theme: {
      extend: {
        fontFamily: {
          outfit: ["Outfit", "sans-serif"], // Outfit font
        },
        colors: {
          primary: "#009934", // Sage green
          secondary: "#181818", // Bluish gray
          accent: "#142E1D", // Dark purple
          info: "#9ce37d", // Bright light green
          warning: "#ff5722",
        },
      },
    },
    plugins: [],
  };
  