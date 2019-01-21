const webpack = require('webpack');
const merge = require('webpack-merge');
const { default: ImageminPlugin } = require('imagemin-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const common = require('./webpack.common.js');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP === 'true';

module.exports = ({ namespace }) =>
    merge(common(namespace), {
        // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
        devtool: shouldUseSourceMap ? 'source-map' : false,
        plugins: [
            new ImageminPlugin({
                optipng: { optimizationLevel: 7 },
                gifsicle: { optimizationLevel: 3 },
                pngquant: { quality: '65-90', speed: 4 },
                svgo: {
                    plugins: [{ removeUnknownsAndDefaults: false }, { cleanupIDs: false }, { removeViewBox: false }],
                },
                plugins: [imageminMozjpeg({ quality: 75 })],
            }),
            // Minify the code.
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    // Disabled because of an issue with Uglify breaking seemingly valid code:
                    // https://github.com/facebookincubator/create-react-app/issues/2376
                    // Pending further investigation:
                    // https://github.com/mishoo/UglifyJS2/issues/2011
                    comparisons: false,
                },
                mangle: {
                    safari10: true,
                },
                output: {
                    comments: false,
                    // Turned on because emoji and regex is not minified properly using default
                    // https://github.com/facebookincubator/create-react-app/issues/2488
                    ascii_only: true,
                },
                sourceMap: shouldUseSourceMap,
            }),
        ],
    });
