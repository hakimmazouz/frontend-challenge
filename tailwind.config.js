/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "marching-ants": "marching-ants 1s linear infinite",
      },
      keyframes: {
        "marching-ants": {
          "0%": { strokeDashoffset: "0px" },
          "100%": { strokeDashoffset: "24px" },
        },
      },
    },
  },
  plugins: [],
};
