const btn = document.querySelector('.btn');
const result = document.querySelector('.result');

let width = window.screen.width;
let height = window.screen.height;

btn.addEventListener('click', () => {
  alert(`Ширина - ${width}, Высота - ${height}`);
})