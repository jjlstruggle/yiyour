module.exports = {
  corePlugins: {},
  content: ["./src/**/*.{ts,tsx,less}"],
  theme: {
    extend: {
      colors: {
        main: "#8A5DC4",
        "yel": "#F6B76C",
        "ger": "#5DC3C3"
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
  important: true,
};
