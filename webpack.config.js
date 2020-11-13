const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
	mode: isDevelopment ? 'development' : 'production',
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.ya?ml$/,
				type: 'json', // Required by Webpack v4
				use: 'yaml-loader',
			},
			{
				test: /\.md$/i,
				use: 'raw-loader',
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: require.resolve('babel-loader'),
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
							plugins: [
								'babel-plugin-styled-components',
								isDevelopment && require.resolve('react-refresh/babel'),
							].filter(Boolean),
						},
					},
				],
			},
		],
	},

	entry: {
		javascript: './src/index.js',
	},

	output: {
		filename: 'index.js',
		path: __dirname + '/dist',
	},
	devServer: {
		historyApiFallback: true,
	},

	plugins: [
		isDevelopment && new ReactRefreshWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Ecotrain',
			template: 'index.html',
		}),
	].filter(Boolean),
}
