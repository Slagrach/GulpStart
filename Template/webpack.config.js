const path = require('path')
const fs = require('fs')

global.PATHS = {
	src: path.join(__dirname, './src'),
	dist: path.join(__dirname, './dist'),
}

module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
		index: PATHS.src + '/js/index.js',
		module: PATHS.src + '/js/module.js',
		// app: PATHS.src + '/js/app.js',
	},
	output: {
		path: PATHS.dist,
		filename: '[name].js',
	},
	optimization: {
		minimize: false,
	},
	module: {
		rules: [
			// Js
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
				},
			},
		],
	}
};


// const path = require('path');
// const webpack = require('webpack');
//
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const MediaQueryPlugin = require('media-query-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// const ImageminPlugin = require('imagemin-webpack-plugin').default;
// const {extendDefaultPlugins} = require("svgo");
// const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
// // const FontfacegenWebpackPlugin = require('fontfacegen-webpack-plugin');
//
// const PATHS = {
// 	src: path.join(__dirname, './src'),
// 	dist: path.join(__dirname, 'dist'),
// }
//
// let font = {
// 	item: "gothampro_light",
// 	item2: "proximanova_regular"
// };
//
// module.exports = (_, {mode}) => ({
// 	// entry: {
// 	// 	app: './src/js/app.js'
// 	// },
// 	entry: {
// 		index: './src/js/index.js',
// 		module: './src/js/module.js',
// 	},
// 	output: {
// 		// filename: "js/script.js",
//
// 		path: path.resolve(__dirname, 'dist'),
// 		filename: 'js/[name].js',
// 		assetModuleFilename: 'images/[name][ext]',
// 		clean: true,
//
// 	},
// 	// devtool: 'inline-source-map',
// 	optimization: {
// 		minimize: false,
// 	},
// 	plugins: [
// 		new HtmlWebpackPlugin({
// 			template: './src/pug/pages/index.pug',
// 			inject: 'body',
// 		}),
// 		new CleanWebpackPlugin(),
// 		new MiniCssExtractPlugin({
// 			filename: 'css/style.css'
// 		}),
// 		new ImageminWebpWebpackPlugin({
// 			config: [{
// 				test: /\.(jpe?g|png)/,
// 				options: {
// 					quality: 75
// 				}
// 			}],
// 			strict: true
// 		})
// 	],
// 	devServer: {
// 		port: 3000,
// 		liveReload: true,
// 		open: {
// 			app: {
// 				name: 'atom',
// 			}
// 		},
// 		static: {
// 			directory: './dist',
// 			watch: true
// 		}
// 	},
// 	module: {
// 		rules: [
// 			// Pug
// 			{
// 				test: /\.pug$/,
// 				loader: 'pug-loader',
// 				options: {
// 					pretty: true,
// 				},
// 			},
// 			// Scss
// 			{
// 				test: /\.(sa|sc|c)ss$/,
// 				use: [
// 					mode === 'production'
// 						? MiniCssExtractPlugin.loader
// 						: 'style-loader',
// 					{
// 						loader: "css-loader",
// 						options: {
// 							sourceMap: true,
// 							importLoaders: 1,
// 						}
// 					},
// 					'group-css-media-queries-loader',
// 					MediaQueryPlugin.loader,
// 					{
// 						loader: "postcss-loader",
// 						options: {
// 							postcssOptions: {
// 								plugins: [
// 									[
// 										"postcss-preset-env",
// 										{
// 											// Options
// 										},
// 									],
// 								],
// 							},
// 							sourceMap: true,
// 						},
// 					},
// 					{loader: "sass-loader", options: {sourceMap: true}},
// 				],
// 			},
// 			// Js
// 			{
// 				test: /\.js$/,
// 				exclude: /node_modules/,
// 				use: ['babel-loader'],
// 			},
// 			// Images
// 			{
// 				test: /\.(png|svg|jpg|jpeg|gif)$/i,
// 				type: 'asset/resource',
// 			},
// 			// Fonts
// 			{
// 				test: /\.(woff|woff2|eot|ttf|otf)$/i,
// 				type: 'asset/resource',
// 				generator: {
// 					filename: 'fonts/[name][ext]'
// 				}
// 			},
// 		]
// 	}
// });
