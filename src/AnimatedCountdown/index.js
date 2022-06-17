const nums = document.querySelectorAll('.nums span');
const counter = document.querySelector('.counter');
const h4 = document.querySelector('h4');

const resetNum = () => {
  nums.forEach(num => {
    num.className = '';
  });
  requestAnimationFrame(() => {
    nums[0].classList.add('in');
  });
};
const runAnimation = () => {
  nums.forEach(num => {
    num.addEventListener('animationend', e => {
      if (e.animationName === 'goIn') {
        e.target.classList.remove('in');
        e.target.classList.add('out');
      } else if (e.animationName === 'goOut' && num.nextElementSibling) {
        num.classList.remove('out');
        num.nextElementSibling.classList.add('in');
      } else {
        num.classList.remove('out');
      }
    });
  });
};

h4.addEventListener('click', () => {
  resetNum();
  runAnimation();
});
