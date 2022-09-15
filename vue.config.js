module.exports = {	
	devServer: {
		proxy: {
			'/api': {
				target: 'http://selectiontest.92nu.com',
				ws: true,
				changOlrigin: true,		
			}
		},
		host:"0.0.0.0",  
	},
	// assetsDir: "clothes",
	// publicPath:'../',
}