module.exports = {
	config: {
		tailwindJs: './tailwind.config.js',
		port: 9050
	},
	paths: {
		root: './',
		src: {
			base: './src',
			pug: './src/pug',
			css: './src/scss',
			js: './src/js',
			img: './src/images',
			font: './src/fonts',
		},
		dist: {
			base: './dist',
			css: './dist/css',
			js: './dist/js',
			img: './dist/images',
			font: './dist/fonts',
		},
		build: {
			base: './build',
			css: './build/css',
			js: './build/js',
			img: './build/images',
			font: './build/fonts',
		}
	}
}
