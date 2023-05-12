import '../pug/includes/tabs/tabs'
// import '../pug/includes/classes/show_classe'
import '../pug/components/test/test'

// var root = document.querySelector(':root');
// var rootStyles = getComputedStyle(root);
// var mainColor = rootStyles.getPropertyValue('--pageHeight');
// console.log(mainColor);
// root.style.setProperty('--pageHeight', pageHeight + 'px');


// const pageHeight = document.documentElement.scrollHeight;
// var root = document.querySelector(':root');
// var rootStyles = getComputedStyle(root);
// const leaves = document.querySelector('.leaves');
// const leavesChange = getComputedStyle(leaves).getPropertyValue('--pageHeight');
// console.log(leaves);
// leaves.style.setProperty('--pageHeight', pageHeight + 'px');
// const getCSSProp = (element, propName) => getComputedStyle(element).getPropertyValue(propName);
// const colorAccent = getCSSProp(leaves, '--color-accent');


const pageHeight = document.documentElement.scrollHeight;
const divWrapper = document.querySelector('.wrapper');
const paddingTop = window.getComputedStyle(divWrapper, null).getPropertyValue('padding-top');
var root = document.querySelector('.leaves');
var rootStyles = getComputedStyle(root);
var mainColor = rootStyles.getPropertyValue('--pageHeight');
root.style.setProperty('--pageHeight', (pageHeight - parseFloat(paddingTop)) + 'px');
