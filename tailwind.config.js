/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1536px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        "josefin-sans": ["Josefin Sans", "sans-serif"],
        "roboto-slab": ["Roboto Slab", "serif"],
        kalam: ["Kalam", "cursive"],
      },
      colors: {
        "main-green": "#499969",
        "main-gray": "#3c3737",
        "main-pinkish": "#FEEFEF",
        "main-brownish": "#b2a7a7",
        "main-yellowish": "#fef5ef",
        "main-pink": "#feeffa",
        "main-bronze": "#b2a7af",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
};
