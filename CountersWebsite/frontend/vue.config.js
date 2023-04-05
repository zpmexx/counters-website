module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/static/dist/' : 'http://127.0.0.1:8080',
    outputDir: '..//static/dist',
    indexPath: '../../templates/base-vue.html', // relative to outputDir!

    configureWebpack: {
	devServer: {

	devMiddleware: {
		writeToDisk: true 
		}
	}
				
}
    
}
