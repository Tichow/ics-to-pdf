/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#666666',
        accent: '#EFF6FF',
        border: '#E5E7EB',
      },
    },
  },
  plugins: [],
}

