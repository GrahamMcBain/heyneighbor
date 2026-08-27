/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Montserrat', 'sans-serif'],
        inter: ['Montserrat', 'sans-serif'],
      },
      colors: {
        hn: {
          blue: "#574E42",
          cyan: "#00A651",
          grey: "#D8D2C3",
          parchment: "#F8F8F2",
          apricot: "#FAE6A1"
        },
      },
    },
  },
  plugins: [],
}
