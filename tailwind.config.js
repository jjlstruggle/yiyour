module.exports = {
    corePlugins: {},
    content: [
        "./src/**/*.{ts,tsx,less}",
    ],
    theme: {
        extend: {

        },
    },
    plugins: [require('@tailwindcss/line-clamp'),],

}