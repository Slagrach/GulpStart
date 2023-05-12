// var path = require('./config/gulp-settings.js');
var plugins = require('./config/gulp-plugins');
var fs = require('fs');
let nodePath = require('path');
const rootFolder = nodePath.basename(nodePath.resolve());
// Пути к папке с исходниками и папке с результатом
const buildFolder = `./dist`;
const srcFolder = `./src`;
const project_name = require('path').basename(__dirname);

const paths = {
	src: nodePath.resolve(srcFolder),
	build: nodePath.resolve(buildFolder)
}

// Пути к папкам и файлам проекта
const path = {
	build: {
		html: `${buildFolder}/`,
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		images: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`
	},
	src: {
		html: `${srcFolder}/*.html`,
		pug: `${srcFolder}/pug/*.pug`,
		js: `${srcFolder}/js`,
		scss: `${srcFolder}/scss/style.scss`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		fonts: `${srcFolder}/fonts/*.*`,
		files: `${srcFolder}/files/**/*.*`,
		svgicons: `${srcFolder}/svgicons/*.svg`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	rootFolder: rootFolder,
	srcFolder: srcFolder,
	ftp: `` // Путь к нужной папке на удаленном сервере. gulp добавит имя папки проекта автоматически
};

// Настройка FTP соединения
const configFTP = {
	host: '', // Адрес FTP сервера
	user: '', // Имя пользователя
	password: '', // Пароль
	parallel: 5 // Кол-во одновременных потоков
}

var gulp = require('gulp'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	// webpack = require('webpack'),
	webpackStream = require('webpack-stream'),
	pug = require('gulp-pug'),
	sass = require('gulp-sass')(require('sass')),
	sourcemaps = require('gulp-sourcemaps'),
	webpHtml = require('gulp-webp-html'),
	webpcss = require('gulp-webpcss'),
	imagemin = require('gulp-imagemin'),
	webp = require('imagemin-webp'),
	del = require('del'),
	cleanCSS = require('gulp-clean-css'),
	htmlBeautify = require('gulp-html-beautify'),
	autoprefixer = require('gulp-autoprefixer'),
	group_media = require('gulp-group-css-media-queries'),
	cssnano = require('gulp-cssnano'),
	csso = require('gulp-csso'),
	fonter = require('gulp-fonter-fix'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	beautify = require('gulp-jsbeautifier'),
	UnminifiedWebpackPlugin = require('unminified-webpack-plugin'),
	postcss = require('gulp-postcss'),
	tailwindcss = require('tailwindcss'),
	pxToRem = require('gulp-px2rem-converter'),
	strip = require('gulp-strip-comments'),
	htmlMinify = require('html-minifier'),
	gzip = require('gulp-gzip'),
	zip = require('gulp-zip'),
	newer = require('gulp-newer'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	concatCss = require('gulp-concat-css');

const webpack = require('webpack');
const options = require('./config')

// Передаем значения в глобальную переменную
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	isWebP: !process.argv.includes('--nowebp'),
	isFontsReW: process.argv.includes('--rewrite'),
	gulp: gulp,
	path: path,
	plugins: plugins
}

// Пишем папки которые нужно копировать через запятую
let foldersArray = ['js/patterns', 'json', 'js/apps', 'php']; // 'videos', 'files' ...
gulp.task('copyFolders', function (f) { f();
	foldersArray.forEach(folderItem => {
		gulp.src(['src/' + folderItem + '/**/*.*'])
			.pipe(gulp.dest('dist/' + folderItem))
			.pipe(browserSync.reload({stream: true}));
	})
});

let folderApps = ['js/apps', 'json', 'php']; // 'videos', 'files' ...
gulp.task('copyFoldersApps', function (f) { f();
	folderApps.forEach(folderItem => {
		gulp.src(['src/' + folderItem + '/**/*.*'])
			.pipe(gulp.dest('build/' + folderItem))
			.pipe(browserSync.reload({stream: true}));
	})
});


gulp.task('browser-sync', function (cb) {
	browserSync({
		server: {
			baseDir: './dist'
		},
		notify: false,
		browser: ['C:/Users/slagr/AppData/Local/Mail.Ru/Atom/Application/atom.exe'],
		tunnel: 'mysite'
	});
});

gulp.task('jade', function (cb) { // Создаем таск Pug
	return gulp.src('src/pug/pages/*.pug')
		.pipe(pug({pretty: true}))
		// .pipe(webpHtml())
		.pipe(htmlBeautify())
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function (cb) {
	return gulp.src(['src/scss/style.scss', 'src/scss/css/*.*'])
		.pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
		.pipe(sass())
		// .pipe(gulp.dest('./src/scss'))
		.pipe(postcss([
			tailwindcss(options.config.tailwindJs)
		]))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function (cb) {
	return gulp.src(['src/js/patterns/**/*.*', 'src/js/apps/**/*.*'])
		.pipe(webpackStream(require('./config/webpack.dev')))
		.pipe(uglify({
			compress: false
		}))
		.pipe(beautify())
		.pipe(app.gulp.dest(`${app.path.build.js}`))
		.pipe(browserSync.reload({stream: true}));
})


gulp.task('img', function (cb) {
	return gulp.src('src/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp}')
		.pipe(gulp.dest('./dist/images'))
		.pipe(
			rename({
				extname: '.webp'
			})
		)
		.pipe(gulp.dest('./dist/images'));
});


gulp.task('fontsOtf', function (cb) {
	// Ищем файлы шрифтов .otf
	return app.gulp.src(`${app.path.srcFolder}/fonts/**/*.otf`, {})
		// Конвертируем в .ttf
		.pipe(fonter({
			formats: ['ttf']
		}))
		// Выгружаем в исходную папку
		.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
});

gulp.task('fontsWoff', function (cb) {
	// Ищем файлы шрифтов .ttf
	return app.gulp.src(`${app.path.srcFolder}/fonts/**/*.ttf`, {})
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
		// Конвертируем в .woff
		.pipe(fonter({
			formats: ['woff']
		}))
		// Выгружаем в папку с результатом
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
		// Ищем файлы шрифтов .ttf
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/**/*.ttf`))
		// Конвертируем в .woff2
		.pipe(ttf2woff2())
		// Выгружаем в папку с результатом
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
		// Ищем файлы шрифтов .woff и woff2
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/**/*.{woff,woff2}`))
		// Выгружаем в папку с результатом
		.pipe(app.gulp.dest(`${app.path.build.fonts}`));
});

gulp.task('fontsInclude', function (cb) {
	let fontsFile = `${app.path.srcFolder}/scss/_fonts.scss`;
// Если передан флаг --rewrite удаляем файл подключения шрифтов
	app.isFontsReW ? fs.unlink(fontsFile, cb) : null;
// Проверяем существуют ли файлы шрифтов
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			// Проверяем существует ли файл стилей для подключения шрифтов
			if (!fs.existsSync(fontsFile)) {
				// Если файла нет, создаем его
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (var i = 0; i < fontsFiles.length; i++) {
					// Записываем подключения шрифтов в файл стилей
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
						if (fontWeight.toLowerCase() === 'thin') {
							fontWeight = 100;
						} else if (fontWeight.toLowerCase() === 'extralight') {
							fontWeight = 200;
						} else if (fontWeight.toLowerCase() === 'light') {
							fontWeight = 300;
						} else if (fontWeight.toLowerCase() === 'medium') {
							fontWeight = 500;
						} else if (fontWeight.toLowerCase() === 'semibold') {
							fontWeight = 600;
						} else if (fontWeight.toLowerCase() === 'bold') {
							fontWeight = 700;
						} else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
							fontWeight = 800;
						} else if (fontWeight.toLowerCase() === 'black') {
							fontWeight = 900;
						} else {
							fontWeight = 400;
						}
						fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url('../fonts/${fontFileName}.woff2') format('woff2'), url('../fonts/${fontFileName}.woff') format('woff');\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
						newFileOnly = fontFileName;
					}
				}
			} else {
				// Если файл есть, выводим сообщение
				console.log('Файл scss/fonts/_fonts.scss уже существует. Для обновления файла нужно его удалить!');
			}
		} else {
			// Если шрифтов нет
			fs.unlink(fontsFile, cb)
		}
	});
	return app.gulp.src(`${app.path.srcFolder}`);

	function cb() {
	}
});

gulp.task('json', function (cb) {
	return gulp.src('./src/json/*.json')
		.pipe(gulp.dest('./dist/json'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('gzip', function (cb) {
	return gulp.src('./dist/**/*.*')
		.pipe(zip('archive.zip'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('php', function () {
	return gulp.src('./src/mail.php')
		.pipe(gulp.dest('./dist/'));
});

gulp.task('cb', function () {
});
gulp.task('clean', async function () {
	return del.sync(['dist/css', 'dist/js', 'dist/index.html', 'build', 'dist/json', 'dist/php', 'dist/mail.php']);          // Удаляем папку dist перед сборкой
});


gulp.task('prebuild', async function () {
	const options = {
		includeAutoGeneratedTags: true,
		removeAttributeQuotes: true,
		removeComments: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		sortClassName: true,
		useShortDoctype: false,
		collapseWhitespace: false,
		html5: true
	};
	return del.sync('build'),

		gulp.src(['dist/*.html'])
			.on('data', function (file) {
				const buferFile = Buffer.from(htmlMinify.minify(file.contents.toString(), options))
				return file.contents = buferFile
			})
			.pipe(gulp.dest('build')),

		gulp.src(['dist/css/style.css'])
			.pipe(csso())
			.pipe(group_media())
			.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true, grid: true}))
			// .pipe(webpcss({
			// 	webpClass: '._webp',
			// 	noWebpClass: '._no-webp'
			// }))
			.pipe(gulp.dest('build/css')),

		gulp.src(['dist/css/**/*.css', '!dist/css/style.css'])
			.pipe(gulp.dest('build/css'))
			.pipe(gulp.src('build/css/*.*'))
			.pipe(concatCss('libs.css'))
			.pipe(csso())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('build/css')),

		gulp.src(['./src/js/index.js', './src/js/module.js'])
			.pipe(webpackStream(require('./config/webpack.prod')))
			.pipe(gulp.dest('build/js'))
			.pipe(uglify({}))
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('build/js')),

		gulp.src('./src/js/apps/**/*.*')
			.pipe(gulp.dest('build/js/apps'))
			.pipe(gulp.src('build/js/apps/*.*'))
			.pipe(concat('libs.js'))
			.pipe(uglify({}))
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('build/js/apps')),

		gulp.src(['dist/fonts/**.*'])
			.pipe(gulp.dest('build/fonts'))
});

gulp.task('prebuild-css', async function () {
	gulp.src('build/css/style.css')
		.pipe(rename({
			suffix: '.min',
			extname: '.css'
		}))
		.pipe(cssnano())
		.pipe(gulp.dest('build/css'))
});

gulp.task('prebuild-img', async function () {
	gulp.src('src/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp}')
		.pipe(
			imagemin([
				webp({quality: 80})
			])
		)
		.pipe(rename({extname: '.webp'}))
		.pipe(gulp.dest('dist/images'))
		.pipe(gulp.src('src/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp}'))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				interlaced: true,
				optimizationLevel: 3 // 0 to 7
			})
		)
		.pipe(gulp.dest('build/images'))
});

gulp.task('watch', function () {
	gulp.watch(['src/**/*.scss', 'src/**/*.sass'], gulp.parallel('sass'));           // Наблюдение за sass файлами
	// gulp.watch('dist/*.html', gulp.parallel('code'));                             // Наблюдение за HTML файлами в корне проекта
	gulp.watch('src/**/*.js', gulp.parallel('scripts'));                             // Наблюдение за главным JS файлом и за библиотеками
	gulp.watch('src/**/*.{jpg,jpeg,png,svg,gif,ico,webp}', gulp.parallel('img'));    // Наблюдение за Img
	gulp.watch('src/**/*.pug', gulp.parallel('jade'));                               // Наблюдение за Pug
	gulp.watch('src/**/*.*', gulp.parallel('copyFolders'));                          // Наблюдение за Pug
	gulp.watch('src/**/*.json', gulp.parallel('json'));                              // Наблюдение за Pug
	gulp.watch('src/**/*.php', gulp.parallel('php'));                                // Наблюдение за Pug
});
gulp.task('default', gulp.parallel('clean', 'jade', 'sass', 'scripts', 'img', 'fontsWoff', 'browser-sync', 'watch'));
gulp.task('fontOtf', gulp.parallel('fontsOtf'));
gulp.task('fontWoff', gulp.parallel('fontsWoff'));
gulp.task('allFont', gulp.parallel('fontOtf', 'fontWoff'));
gulp.task('font', gulp.parallel('fontsInclude'));
gulp.task('images', gulp.parallel('img'));
gulp.task('build', gulp.parallel('prebuild', 'copyFoldersApps'));
gulp.task('prebuild-css', gulp.parallel('prebuild-css'));
gulp.task('prebuild-img', gulp.parallel('prebuild-img'));
