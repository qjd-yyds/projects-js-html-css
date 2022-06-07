const button = document.querySelector('.ripple');
button.addEventListener('click', e => {
  const x = e.clientX;
  const y = e.clientY;
  const buttonTop = button.offsetTop;
  const buttonLeft = button.offsetLeft;
  const xInside = x - buttonLeft;
  const yInside = y - buttonTop;
  const span = document.createElement('span');
  span.className = 'circle';
  span.style.left = `${xInside}px`;
  span.style.top = `${yInside}px`;
  button.appendChild(span);
  span.addEventListener('animationend', function () {
    console.log('动画结束');
    span.remove();
  });
});
