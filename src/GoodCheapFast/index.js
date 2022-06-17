const toggle = document.querySelector('.toggle');
console.log(toggle)
toggle.addEventListener('change', e => {
  console.log(e.target);
});
