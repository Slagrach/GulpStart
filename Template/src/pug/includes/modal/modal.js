import {body_lock, body_lock_remove, unlock} from '../../../js/files/lock'

const openBtn = document.querySelectorAll('._open');
const closeBtn = document.querySelectorAll('._close');
const dialog = document.querySelector('dialog');


for (let index = 0; index < openBtn.length; index++) {
	const el = openBtn[index];
	el.addEventListener('click', function (e) {
		dialog.showModal();
		body_lock();
	})
}
for (let index = 0; index < closeBtn.length; index++) {
	const el = closeBtn[index];
	el.addEventListener('click', function (e) {
		dialog.close();
		body_lock_remove();
	})
}

// for (let index = 0; index < dialog.length; index++) {
// 	const popup = dialog[index];
// 	popup.addEventListener("click", function (e) {
// 		if (!e.target.closest('.modal__overflow')) {
// 			dialog.close(e.target.closest('dialog'));
// 			body_lock_remove();
// 		}
// 	});
// }

