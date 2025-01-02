/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit-Regular", "sans-serif"],
        "outfit-medium": ["Outfit-Medium", "sans-serif"],
        "outfit-bold": ["Outfit-Bold", "sans-serif"],
      },
      colors: {
        "logo-background": "#5E75CA",
        "text-emptylist": "#888",
        "tx-cl-pri": "#5E75CA",
        "tx-cl-sec": "#C1C1C3",
      },
    },
  },
  plugins: [],
};
