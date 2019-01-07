/**
 * Webpack config
 * TODO: Speaking of DRY, these configs aren't DRY at all -- would be nice to consolidate common config into
 * `webpack.config.common.js` to extend from
 * @since 2.0.0
 */

const paths = require( './paths' );
const webpack = require( 'webpack' );
const externals = require( './externals' );
const autoprefixer = require( 'autoprefixer' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' );

// Extract block-editor.css for editor styles.
const extractBlockEditorCSS = new ExtractTextPlugin( {
	filename: '[name]/dist/css/block-editor.css',
} );

// Configuration for the ExtractTextPlugin — DRY rule.
const extractConfig = namespace => ({
	use: [
		// "postcss" loader applies autoprefixer to our CSS.
		{ loader: 'raw-loader' },
		{
			loader: 'postcss-loader',
			options: {
				ident: 'postcss',
				plugins: [
					autoprefixer( {
						browsers: [
							'>1%',
							'last 4 versions',
							'Firefox ESR',
							'not ie < 9', // React doesn't support IE8 anyway
						],
						flexbox: 'no-2009',
					} ),
				],
			},
		},
		// "sass" loader converts SCSS to CSS.
		{
			loader: 'sass-loader',
			options: {
				data: `@import '../../${namespace}-ecommerce/src/scss/custom.scss';\n`,
				outputStyle: 'nested',
			},
		},
	],
});

// Export configuration.
module.exports = ( { namespace } ) => ( {
	entry: {
		[ `./${ namespace }-ecommerce` ]: paths.pluginBlocksJs,
	},
	output: {
		path: paths.pluginDist,
		filename: '[name]/dist/js/blocks.js',
	},
	// You may want 'eval' instead if you prefer to see the compiled output in DevTools.
	devtool: 'cheap-eval-source-map',
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
				test: /index\.s?css$/,
				exclude: /(node_modules|bower_components)/,
				use: extractBlockEditorCSS.extract( extractConfig( namespace ) ),
			},
		],
	},
	plugins: [
		extractBlockEditorCSS,
		new webpack.DefinePlugin( {
			namespace: JSON.stringify( namespace ),
		} ),
		new FriendlyErrorsWebpackPlugin(),
	],
	stats: 'minimal',
	externals: externals,
} );
