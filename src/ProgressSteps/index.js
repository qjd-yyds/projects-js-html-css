const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const progress = document.querySelector('#progress');
const steps = document.querySelectorAll('.circle');
let activeNum = 1;
next.addEventListener('click', function () {
  activeNum++;
  if (activeNum > steps.length) {
    activeNum = steps.length;
  }
  render();
});
prev.addEventListener('click', function () {
  activeNum--;
  if (activeNum < 1) {
    activeNum = 1;
  }
  render();
});
function render() {
  const width = ((activeNum - 1) / (steps.length - 1)) * 100 + '%';
  steps.forEach((step,i) => {
    if(i < activeNum) {
      step.classList.add('active');
    }else {
      step.classList.remove('active');
    }
  })
  progress.style.width = width;
  if (activeNum == 1) {
    prev.disabled = true;
  }else if(activeNum == steps.length){
    next.disabled = true;
  }else {
    prev.disabled = false
    next.disabled = false;
  }
}
