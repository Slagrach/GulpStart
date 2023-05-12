// const merge = require('webpack-merge')
// const baseWebpackConfig = require('./webpack.config')
//
// const buildWebpackConfig = merge(baseWebpackConfig, {
// 	// BUILD config
// 	mode: 'production',
// 	plugins: []
// })
//
// module.exports = new Promise((resolve, reject) => {
// 	resolve(buildWebpackConfig)
// })
const { merge } = require('webpack-merge');
const common = require('../webpack.config.js');

module.exports = merge(common, {
	mode: 'production',
});
