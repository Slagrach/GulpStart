// import JustValidate from 'just-validate'

const form = document.getElementById('form')
const fileInput = document.querySelector('input[type="file"]')

fileInput.addEventListener('change', (e) => {
	let file = e.currentTarget.files
	console.log(file)

	for (var i = 0, f; f = file[i]; i++) {
		let reader = new FileReader()
		reader.onload = (function (theFile) {
			return function (e) {
				let li = document.createElement('li')
				li.classList.add('output-image__item')
				li.innerHTML = ['<images class="output-image__img" title="', escape(theFile.name), '" src="', e.target.result, '" />'].join('')
				document.getElementById('output-image')
					.insertBefore(li, null)

				function logReset(event) {
					li.innerHTML = ''
				}

				form.addEventListener('reset', logReset)
			}
		})(f)
		reader.readAsDataURL(f)
	}

	// let txt = ''
	// if ('files' in fileInput) {
	// 	for (var i = 0; i < fileInput.files.length; i++) {
	// 		txt += `<li class='output-file-info__item'>
	// 					<strong class='output-file-info__title'>${i + 1}. file</strong>`
	// 		let $file = fileInput.files[i]
	// 		if ('name' in $file) {
	// 			txt += `<span>
	// 						<span class='output-file-info__subtitle'>name:</span> ${$file.name}</span>`
	// 		}
	// 		if ('size' in $file) {
	// 			txt += `<span>
	// 						<span class='output-file-info__subtitle'>size:</span> ${$file.size} bytes </span>`
	// 		}
	// 		if ('type' in $file) {
	// 			txt += `<span>
	// 						<span class='output-file-info__subtitle'>type:</span> ${$file.type} </span>`
	// 		}
	// 	}
	// }
	let totalFileSize = 0

	if (fileInput.files.length > 0) {
		for (let i = 0; i <= fileInput.files.length - 1; i++) {
			let fsize = fileInput.files.item(i).size
			totalFileSize += fsize
			document.getElementById('output-file-info').innerHTML =
				`${document.getElementById('output-file-info').innerHTML

				}<li class="output-file-info__item">
					<span class="output-file-info__info">
						<i class="output-file-info__title">File Name is: </i>
						<b class="output-file-info__text">${fileInput.files.item(i).name}</b>
					</span>
					<span class="output-file-info__info">
						<i class="output-file-info__title">File Size is: </i>
						<b class="output-file-info__text">${Math.round(fsize / 1024)}KB</b>
					</span>
					<span class="output-file-info__info">
						<i class="output-file-info__title">File Type is: </i>
						<b class="output-file-info__text">${fileInput.files.item(i).type}</b>
					</span>
				</li>`
		}
	}
	document.getElementById('total-size').innerHTML = `${document.getElementById('total-size').innerHTML}Total File(s) Size is <b>${Math.round(totalFileSize / 1024)}</b> KB`

	// document.getElementById('output-file-info').innerHTML = txt

	function logReset(event) {
		document.getElementById('output-file-info').innerHTML = ''
		document.getElementById('total-size').innerHTML = ''
	}

	form.addEventListener('reset', logReset)
})

// function GetFileSizeNameAndType() {
// 	let fi = document.getElementById('formImage')
//
// 	let totalFileSize = 0
//
// 	if (fi.files.length > 0) {
// 		for (let i = 0; i <= fi.files.length - 1; i++) {
// 			let fsize = fi.files.item(i).size
// 			totalFileSize += fsize
// 			document.getElementById('output-file-info').innerHTML =
// 				`${document.getElementById('output-file-info').innerHTML
//
// 				}<li class="output-file-info__item">
// 					<span class="output-file-info__info">
// 						<i class="output-file-info__title">File Name is: </i>
// 						<b class="output-file-info__text">${fi.files.item(i).name}</b>
// 					</span>
// 					<span class="output-file-info__info">
// 						<i class="output-file-info__title">File Size is: </i>
// 						<b class="output-file-info__text">${Math.round(fsize / 1024)}KB</b>
// 					</span>
// 					<span class="output-file-info__info">
// 						<i class="output-file-info__title">File Type is: </i>
// 						<b class="output-file-info__text">${fi.files.item(i).type}</b>
// 					</span>
// 				</li>`
// 		}
// 	}
// 	// document.getElementById('total-size').innerHTML = `${document.getElementById('total-size').innerHTML}Total File(s) Size is <b>${Math.round(totalFileSize / 1024)}</b> KB`
// 	// function logReset(event) {
// 	// 	document.getElementById('output-file-info').innerHTML = ''
// 	// }
// 	//
// 	// form.addEventListener('reset', logReset)
// }

const validation = new JustValidate('form',
	{
		errorFieldCssClass: '_form-error is-invalid',
		errorFieldStyle: {
			border: '1px solid red'
		},
		errorLabelStyle: {
			fontSize: '14px',
			color: '#dc3545',
			fontFamily: 'Calibri, sans-serif'
		},
		focusInvalidField: true,
		lockForm: true,
		// tooltip: {
		// 	position: 'top'
		// },
		errorContainer: '.errors-container'
	}
)
validation
	.addField('#name', [
		{
			rule: 'required',
			errorMessage: 'Поле, обязательное для заполнения'
		},
		{
			rule: 'minLength',
			value: 3,
			errorMessage: 'Поле должно содержать минимум 3 символа'
		}

	])
	.addField('#email', [
		{
			rule: 'required',
			errorMessage: 'Поле, обязательное для заполнения'
		},
		{
			rule: 'email',
			errorMessage: 'Электронная почта имеет недопустимый формат'
		}
	])
	.addField('#phone', [
		{
			rule: 'required',
			errorMessage: 'Поле, обязательное для заполнения'
		}
	])
	.addField('#password', [
		{
			rule: 'required',
			errorMessage: 'Поле, обязательное для заполнения'
		}
	])
	.addField('#text', [
		{
			rule: 'required',
			validator: (value) => {
				return value[0] === '!'
			},
			errorMessage: 'Поле, обязательное для заполнения'
		},
		{
			validator: (value) => {
				return value !== undefined && value.length > 3
			},
			errorMessage: 'Сообщение должно быть более 3 букв.'
		}
	])
	.addField('#formImage', [
		{
			rule: 'minFilesCount',
			value: 1,
			errorMessage: 'Количество файлов должно быть более или равным, чем 1'
		},
		{
			rule: 'maxFilesCount',
			value: 3,
			errorMessage: 'Количество файлов должно быть меньше или равно 3'
		}
	])

	.onSuccess((ev) => {
		ev.preventDefault()
		console.log('Validation passes and form submitted', event)

		let formData = new FormData(event.target)

		console.log(...formData)

		let xhr = new XMLHttpRequest()

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					console.log('Отправлено')
				}
			}
		}

		xhr.open('POST', 'mail.php', true)
		xhr.send(formData)

		event.target.reset()
		// window.showNotification('nice', {});
	})
