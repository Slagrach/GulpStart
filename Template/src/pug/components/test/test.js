let inputCalculator = document.getElementById('calcInput');
let calculatorBtn = document.querySelectorAll('.calculator__btn')
let string = '';
let arr = Array.from(calculatorBtn);
arr.forEach(btn => {
	btn.addEventListener('click', (e) => {
		if (e.target.innerHTML === '=') {
			string = eval(string);
			inputCalculator.value = string;
		}
		else if (e.target.innerHTML === 'AC') {
			string = '';
			inputCalculator.value = string
		}
		else if (e.target.innerHTML === 'DEL') {
			string = string.substring(0, string.length - 1);
			inputCalculator.value = string
		}
		else {
			string += e.target.innerHTML;
			inputCalculator.value = string;
		}
	})
})
