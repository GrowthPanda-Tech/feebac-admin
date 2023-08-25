/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/App.jsx",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            'sans': 'Poppins',
            'mono': 'IBM Plex Mono'
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            'white': '#FFFFFF',
            'black': '#000000',
            'grey' : '#A6ACBE',
            'lighest-grey': '#C9CED6',
            'light-grey': '#D9D9D9',
            'dark-grey': '#5C5C5C',
            'green': '#00BA00',
            'background': '#EFEFEF',
            'primary': '#A43948',
            'secondary': '#EA525F',
            'accent': '#EA8552',
        },
    },
}
