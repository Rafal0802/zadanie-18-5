const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const env = process.env.NODE_ENV || 'development';
const plugins = [
	new HtmlWebpackPlugin({
		template: 'client/index.html',
		filename: 'index.html',
		inject: 'body',
	})
];

console.log('NODE_ENV:', env);

if (env === 'production') {
	plugins.push(
		new OptimizeJsPlugin({
			sourceMap: false
		})
	);
}

module.exports = {
	entry: [
			'react-hot-loader/patch',
			'./client/index.js'
			],
	output: {
			path: path.resolve(__dirname, 'public'),
			filename: 'app.bundle.js'
			},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader"
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader'},
					{
						loader: 'css-loader',
						options: {
							modules: true
						}
					}
				]
			}
		]
	
	},
	devServer: {
			proxy: {
				'/socket.io': {
					target: 'http://localhost:3000',
					ws: true
				}
			}
	},
	plugins: plugins
};