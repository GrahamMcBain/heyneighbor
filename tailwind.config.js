/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        hn: {
          blue: "#12263A",      // Deep Space Blue (primary)
          cyan: "#06BCC1",      // Strong Cyan (accent)
          grey: "#C5D8D1",      // Ash Grey (neutral)
          parchment: "#F4EDEA", // Parchment (light base)
          apricot: "#F4D1AE"    // Soft Apricot (warm accent)
        },
      },
    },
  },
  plugins: [],
}

