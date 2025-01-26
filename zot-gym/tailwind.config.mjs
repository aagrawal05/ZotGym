/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },

  theme: {
    extend: {
      fontFamily: {
        jersey: ["Jersey 20", "sans-serif"],
        hammersmith: ["Hammersmith One", "sans-serif"],
        holtwood: ["Holtwood One SC", "serif"],
      },
    },
  },
  
  plugins: [],
};
