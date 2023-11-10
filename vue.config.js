const path = require('path');
function resolve (dir) {
	return path.join(__dirname, dir)
}
module.exports = {	
	devServer: {
		proxy: {
			'/': {
				target: 'http://selectiontest.92nu.com',
				// target: 'http://selection.92nu.com',
				ws: true,
				changOlrigin: true,		
			}
		}
	},
	// assetsDir: "clothes",
	// publicPath:'../',
	chainWebpack: (config)=>{
		config.resolve.alias
		.set('vendor',resolve('./src/vendor'))
	},
	configureWebpack: {
		devtool: process.env.NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
	}
}