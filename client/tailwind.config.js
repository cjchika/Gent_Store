/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#00040a",
      priColor: "#25AF4B",
      litePriColor: "#45BD66",
      secColor: "#163F5A",
      deepSecColor: "#0b2a3f",
      faintColor: "#EDF1D6",
    },
    extend: {
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "600px": "600px",
        "1300px": "1300px",
        "400px": "400px",
      },
    },
  },
  plugins: [],
};
