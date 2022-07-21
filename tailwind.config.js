module.exports = {
  corePlugins: {},
  content: ["./src/**/*.{ts,tsx,less}"],
  theme: {
    extend: {
      colors: {
        main: "#8A5DC4",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
  important: true,
};
