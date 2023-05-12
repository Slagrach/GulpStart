window.$ = window.jQuery = require('jquery');
var $ = require('jquery');
window.jQuery = $;
window.$ = $;

$(document).ready(() => {
	let str = `window location is ${window.location}`;
	console.log(str);
});

import './files/checks'
import './files/calculate';
