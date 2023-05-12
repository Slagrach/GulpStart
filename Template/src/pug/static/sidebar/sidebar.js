
document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;
	// if (window.innerWidth > 768 && isMobile.any()) {
	//
	// }

	if (targetElement.classList.contains('menu__item')) {
		activeLink(targetElement);
		e.preventDefault();
	}
}


const wrapper = document.querySelector('.wrapper');
const sidebar = document.querySelector('.sidebar');
const nav = document.querySelector('.menu');
const toggle = document.querySelector('.menu__btn');

toggle.onclick = function () {
	nav.classList.toggle('_active');
	wrapper.classList.toggle('_active');
	sidebar.classList.toggle('_active');
}

const links = document.querySelectorAll('li');
function activeLink() {
	links.forEach((item) => item.classList.remove('_active'));
	this.classList.add('_active');
}
links.forEach((item) => item.addEventListener('click', activeLink))



let turn = false;
const btnOnOff = document.getElementById("switch");
const color = document.getElementById("light");


const onOff = () => {
	turn = !turn;
	!!turn ? [light.style.opacity="1"] : [light.style.opacity="0"];
};
btnOnOff.addEventListener("click",onOff);