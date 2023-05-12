var allClasses = [];
var allElements = document.querySelectorAll('._classes *');
const $colors = document.querySelector('.classes__list');
for (var i = 0; i < allElements.length; i++) {
	var classes = allElements[i].className.toString().split();
	for (var j = 0; j < classes.length; j++) {
		var cls = classes[j];
		if (cls && allClasses.indexOf(cls) === -1)
			allClasses.push(cls);
		const $newLi = document.createElement('li');
		$newLi.textContent = '.' + classes[j] + '{}';
		$colors.appendChild($newLi);
		$newLi.classList.add('classes__item')
		$newLi.className = 'myP-Class'
	}
}
