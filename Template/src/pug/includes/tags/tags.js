window.$ = window.jQuery = require('jquery');
var $ = require('jquery');
window.jQuery = $;
window.$ = $;


// const ul = document.querySelector(".tags__list"),
// 	input = document.querySelector("input"),
// 	tagNumb = document.querySelector(".tags__details span");
//
// let maxTags = 10,
// 	tags = ["coding", "nepal"];
//
// countTags();
// createTag();
//
// function countTags() {
// 	input.focus();
// 	tagNumb.innerText = maxTags - tags.length;
// }
//
// function createTag() {
// 	ul.querySelectorAll("li").forEach(li => li.remove());
// 	tags.slice().reverse().forEach(tag => {
// 		let liTag = `<li>${tag} <i class="uit uit-multiply"/></li>`;
// 		ul.insertAdjacentHTML("afterbegin", liTag);
// 	});
// 	countTags();
// }
//
// const r = document.querySelectorAll('.uit');
//
// for (let index = 0; index < r.length; index++) {
// 	const el = r[index];
// 	el.addEventListener('click', function (e) {
// 		remove(this, '${tag}');
// 	})
// }
//
//
// function remove(element, tag) {
// 	let index = tags.indexOf(tag);
// 	tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
// 	element.parentElement.remove();
// 	countTags();
// }
//
// function addTag(e) {
// 	if (e.keyCode === 13) {
// 		let tag = e.target.value.replace(/\s+/g, ' ');
// 		if (tag.length > 1 && !tags.includes(tag)) {
// 			if (tags.length < 10) {
// 				tag.split(',').forEach(tag => {
// 					tags.push(tag);
// 					createTag();
// 				});
// 			}
// 		}
// 		e.target.value = "";
// 	}
// }
//
// input.addEventListener("keyup", addTag);
//
// const removeBtn = document.querySelector(".tags__details button");
// removeBtn.addEventListener("click", () => {
// 	tags.length = 0;
// 	ul.querySelectorAll("li").forEach(li => li.remove());
// 	countTags();
// });








(function () {
	var tagList = ['Optimus Prime', 'Bumblebee', 'Megatron', 'Ironhide'];

	// cacheing the DOM elements
	var $tagList = $("#tagList");
	var $newTag = $("#newTag");

	// initial render
	tagList_render();

	// always put logic sections and render sections in seperate functions/class
	// trust me it will help a lot on big projects!
	function tagList_render() {
		$tagList.empty();
		tagList.map(function (_tag) {
			var temp = '<li>' + _tag + '<span class="rmTag">&times;</span></li>';
			$tagList.append(temp);
		});
	};

	// key events
	// Add new tag on "ENTER" press
	$newTag.on('keyup', function (e) {
		// enter keycode 13
		if (e.keyCode === 13) {
			var newTag = $("#newTag").val();
			if (newTag.replace(/\s/g, '') !== '') {
				tagList.push(newTag);
				$newTag.val('');
				tagList_render();
			}
		}
	});

	// button events
	// Remove Tag
	$tagList.on("click", "li>span.rmTag", function () {
		var index = $(this).parent().index();
		tagList.splice(index, 1);
		tagList_render();
	});
})();
