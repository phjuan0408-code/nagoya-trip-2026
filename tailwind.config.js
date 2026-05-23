/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        travel: {
          paper: "#fdf6ef",
          ink: "#504339",
          mist: "#f4ede5",
          green: "#2a9d8f",
          orange: "#f4a261",
          coral: "#e76f51",
          slate: "#55616d",
        },
      },
    },
  },
  plugins: [],
};
