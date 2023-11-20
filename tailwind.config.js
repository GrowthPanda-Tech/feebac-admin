/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/App.jsx",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: "Poppins",
      mono: "IBM Plex Mono",
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      primary: "#A43948",
      secondary: "#EA525F",
      tertiary: "#EA8552",
      grey: "#A6ACBE",
      "lighest-grey": "#C9CED6",
      "light-grey": "#D9D9D9",
      "dark-grey": "#5C5C5C",
      green: "#00BA00",
      background: "#EFEFEF",
      accent: "#EA8552",
    },
  },
});
