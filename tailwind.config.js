const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    colors: {
      current: "currentColor",
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#000000",
      dark:           "rgb(var(--color-bg-base)          / <alpha-value>)",
      darkSurface:    "rgb(var(--color-bg-surface)       / <alpha-value>)",
      darkElevated:   "rgb(var(--color-bg-elevated)      / <alpha-value>)",
      darkBorder:     "rgb(var(--color-border)           / <alpha-value>)",
      primaryColor:   "rgb(var(--color-accent)           / <alpha-value>)",
      primaryDark:    "rgb(var(--color-accent-dark)      / <alpha-value>)",
      accentGreen:    "rgb(var(--color-accent-green)     / <alpha-value>)",
      accentContrast: "rgb(var(--color-accent-contrast)  / <alpha-value>)",
      yellow:         "rgb(var(--color-star-yellow)      / <alpha-value>)",
      starYellow:     "rgb(var(--color-star-yellow)      / <alpha-value>)",
      textColor:      "rgb(var(--color-text-muted)       / <alpha-value>)",
      textSecondary:  "rgb(var(--color-text-secondary)   / <alpha-value>)",
      textDim:        "rgb(var(--color-text-dim)         / <alpha-value>)",
      textPrimary:    "rgb(var(--color-text-primary)     / <alpha-value>)",
      error:          "rgb(var(--color-error)            / <alpha-value>)",
    },
    screens: {
      xs: "450px",
      // => @media (min-width: 450px) { ... }

      sm: "575px",
      // => @media (min-width: 576px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1200px",
      // => @media (min-width: 1200px) { ... }

      "2xl": "1400px",
      // => @media (min-width: 1400px) { ... }
    },
    extend: {
      boxShadow: {
        signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
        one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
        sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
        glow: "0 10px 30px 0 rgba(0, 212, 200, 0.35)",
        glowSoft: "0 4px 20px 0 rgba(0, 212, 200, 0.18)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      animation: {
        "marquee-left": "marquee-left 40s linear infinite",
        "marquee-right": "marquee-right 40s linear infinite",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-25%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-25%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
});
