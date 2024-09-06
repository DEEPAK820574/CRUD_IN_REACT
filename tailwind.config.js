/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      boxShadow: {
        'custom-light': '5px 5px 4px rgba(225, 225, 225, 0.5)',
      },
    },
  },
  plugins: [],
}

