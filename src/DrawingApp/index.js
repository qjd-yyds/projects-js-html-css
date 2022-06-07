const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');
let color = colorEl.value;
let isPressed = false;
const ctx = canvas.getContext('2d');
let size = 5;
let x = 0;
let y = 0;
// 修改颜色
colorEl.addEventListener('change', function (e) {
  color = e.target.value;
});

increaseBtn.addEventListener('click', function () {
  size++;
  if (size > 50) {
    size = 50;
  }
  render();
});

decreaseBtn.addEventListener('click', function () {
  size--;
  if (size < 1) {
    size = 1;
  }
  render();
});

function render() {
  sizeEL.innerText = size;
}

canvas.addEventListener('mousedown', e => {
  isPressed = true;
  x = e.clientX;
  y = e.clientY;
  drawCircle(x, y);
});
canvas.addEventListener('mousemove', e => {
  if (isPressed) {
    const x2 = e.clientX;
    const y2 = e.clientY;
    drawLine(x, y, x2, y2);
    drawCircle(x2, y2);
    x = x2
    y = y2
  }
});
canvas.addEventListener('mouseup', e => {
  isPressed = false;
});
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
  console.log(ctx);
}
