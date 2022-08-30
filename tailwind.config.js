module.exports = {
  content: ["./src/**/*.{ts,tsx,less}"],
  theme: {
    screens: {
      md: { max: "767px" },
    },
    extend: {
      colors: {
        main: "#8A5DC4",
        yel: "#F6B76C",
        ger: "#5DC3C3",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
  important: true,
  corePlugins: {
    preflight: false,
  },
};
