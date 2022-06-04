const boxes = document.querySelectorAll('.box');
const height = window.innerHeight / 5 * 4
window.addEventListener('scroll', function () {
  boxes.forEach(box => {
    const bounding = box.getBoundingClientRect();
    if(bounding.top < height) {
      box.classList.add('show');
    }else {
      box.classList.remove('show');
    }
  });
});
