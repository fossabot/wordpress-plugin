const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const paths = require('./paths');
const externals = require('./externals');

const extractMainCSS = new ExtractTextPlugin({
    filename: '[name]/dist/css/main.css',
});

const extractBlockEditorCSS = new ExtractTextPlugin({
    filename: '[name]/dist/css/block-editor.css',
});

// Configuration for the ExtractTextPlugin — DRY rule.
const extractConfig = {
    use: [
        // "postcss" loader applies autoprefixer to our CSS.
        { loader: 'raw-loader' },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: [autoprefixer({ flexbox: 'no-2009' })],
            },
        },
        // "less" loader converts LESS to CSS.
        {
            loader: 'less-loader',
        },
    ],
};

// Export configuration.
module.exports = namespace => ({
    entry: {
        [`./${namespace}-ecommerce`]: paths.pluginBlocksJs,
    },
    output: {
        path: paths.pluginDist,
        filename: '[name]/dist/js/blocks.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // This is a feature of `babel-loader` for webpack (not Babel itself).
                        // It enables caching results in ./node_modules/.cache/babel-loader/
                        // directory for faster rebuilds.
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /main\.less$/,
                exclude: /(node_modules|bower_components)/,
                use: extractMainCSS.extract(extractConfig),
            },
            {
                test: /block-editor\.less$/,
                exclude: /(node_modules|bower_components)/,
                use: extractBlockEditorCSS.extract(extractConfig),
            },
        ],
    },
    plugins: [
        extractMainCSS,
        extractBlockEditorCSS,
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(`${namespace}-ecommerce`),
            verbose: false,
        }),
        new CopyWebpackPlugin(
            [
                {
                    from: 'src/img',
                    to: `${namespace}-ecommerce/dist/img`,
                },
                {
                    from: `${namespace}-ecommerce/src/img`,
                    to: `${namespace}-ecommerce/dist/img`,
                },
            ],
            { ignore: ['.gitkeep'] },
        ),
        new webpack.DefinePlugin({
            namespace: JSON.stringify(namespace),
        }),
        new FriendlyErrorsWebpackPlugin(),
    ],
    stats: 'minimal',
    externals,
    resolve: {
        alias: {
            '~': `../../${namespace}-ecommerce`,
        },
    },
});
