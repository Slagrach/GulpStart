// Импортируем модули
var notify = require('gulp-notify'),
	newer = require('gulp-newer'),
	plumber = require('gulp-plumber'),
	ifPlugin = require('gulp-if'),
	prettier = require('gulp-prettier'),
	rename = require('gulp-rename');

// Экспортируем объект
const plugins = {
	notify,
	if: ifPlugin,
	prettier,
	newer,
	plumber,
	rename
}
