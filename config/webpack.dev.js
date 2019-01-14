const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = ({ namespace }) =>
    merge(common(namespace), {
        // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
        devtool: 'cheap-eval-source-map',
    });
