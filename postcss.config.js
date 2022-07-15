const postcssPresetEnv = require('postcss-preset-env')
module.exports = {
    plugins: [
        require('postcss-flexbugs-fixes'),
        postcssPresetEnv({
            stage: 3,
            autoprefixer: {
                flexbox: 'no-2009'
            }
        }),
        require('tailwindcss'),
        require('cssnano')
    ]
}