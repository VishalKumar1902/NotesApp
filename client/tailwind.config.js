/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGradientStart: "#FDC830",
        customGradientEnd: "#F37335",
      },
    },
  },
  plugins: [],
};
