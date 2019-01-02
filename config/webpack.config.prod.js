/**
 * Webpack Configuration
 *
 * Working of a Webpack can be very simple or complex. This is an intenally simple
 * build configuration.
 *
 * Webpack basics — If you are new the Webpack here's all you need to know:
 *     1. Webpack is a module bundler. It bundles different JS modules together.
 *     2. It needs and entry point and an ouput to process file(s) and bundle them.
 *     3. By default it only understands common JavaScript but you can make it
 *        understand other formats by way of adding a Webpack loader.
 *     4. In the file below you will find an entry point, an ouput, and a babel-loader
 *        that tests all .js files excluding the ones in node_modules to process the
 *        ESNext and make it compatible with older browsers i.e. it converts the
 *        ESNext (new standards of JavaScript) into old JavaScript through a loader
 *        by Babel.
 *
 * TODO: Instructions.
 *
 * @since 1.0.0
 */

const paths = require( './paths' );
const webpack = require( 'webpack' );
const externals = require( './externals' );
const autoprefixer = require( 'autoprefixer' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP === 'true';

// Extract blocks.css for both editor and frontend styles.
const extractBlocksCSS = new ExtractTextPlugin( {
	filename: '[name]/dist/css/blocks.css',
} );

// Extract block-editor.css for editor styles.
const extractBlockEditorCSS = new ExtractTextPlugin( {
	filename: '[name]/dist/css/block-editor.css',
} );

// Configuration for the ExtractTextPlugin — DRY rule.
const extractConfig = {
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
				outputStyle: 'compressed',
			},
		},
	],
};

// Export configuration.
module.exports = {
	entry: {
		'./izettle-ecommerce': paths.pluginBlocksJs,
		'./selz-ecommerce': paths.pluginBlocksJs,
	},
	output: {
		path: paths.pluginDist,
		filename: '[name]/dist/js/blocks.js',
	},
	// You may want 'eval' instead if you prefer to see the compiled output in DevTools.
	devtool: shouldUseSourceMap ? 'source-map' : false,
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
				test: /blocks\.s?css$/,
				exclude: /(node_modules|bower_components)/,
				use: extractBlocksCSS.extract( extractConfig ),
			},
			{
				test: /block-editor\.s?css$/,
				exclude: /(node_modules|bower_components)/,
				use: extractBlockEditorCSS.extract( extractConfig ),
			},
		],
	},
	// Add plugins.
	plugins: [
		extractBlocksCSS,
		extractBlockEditorCSS,
		// Minify the code.
		new webpack.optimize.UglifyJsPlugin( {
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
		} ),
	],
	stats: 'minimal',
	// stats: 'errors-only',
	// Add externals.
	externals: externals,
};