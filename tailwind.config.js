/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Epilogue"],
    },
    extend: {
      colors: {
        transparent: "transparent",
        dark: "#13131a",
        active: "#2c2f32",
        gray: "#1c1c24",
        green: "#1dc071",
        white: "#EEEEEE",
        purple: "#8c6dfd",
      },
    },
  },
  plugins: [],
};
