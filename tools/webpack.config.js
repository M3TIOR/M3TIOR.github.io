/*
* M3TIOR 2018
*/


const ExtractTextPlugin = require('extract-text-webpack-plugin');
const mustache = require("mustache");
const webpack = require("webpack");
const path = require('path');
const fs = require('fs');


const extractCSS = new ExtractTextPlugin({ filename: 'css.bundle.css' });
const extractSASS = new ExtractTextPlugin({ filename: 'sass.bundle.css' });

const config = {

	plugins: [
			extractCSS // Instance 1
			extractSASS // Instance 2
	]
}

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ReactToHtmlPlugin = require('react-to-html-webpack-plugin');



module.exports = {
	entry: './src/index.js',

	output: {
		filename: 'index.js',
		path: path.resolve('./dist'),
		libraryTarget: 'umd'
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: extractCSS.extract({ // Instance 1
					fallback: 'style-loader',
					use: [ 'css-loader' ]
				})
			},
			{
				test: /\.scss$/,
				use: extractSASS.extract({ // Instance 2
					fallback: 'style-loader',
					use: [ 'css-loader', 'sass-loader' ]
				})
			}
		],
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			//{ test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },
			{ test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
		]
	},

	postcss: [
		require('autoprefixer-core')
	],

	resolve: {
		modulesDirectories: ['node_modules', 'components']
	},

	plugins: [
		new ExtractTextPlugin('style.css', { allChunks: true }),
		new ReactToHtmlPlugin('index.html', 'index.js', {
			static: true,
			template: ejs.compile(fs.readFileSync(__dirname + '/src/template.ejs', 'utf-8'))
		})
	]
};
