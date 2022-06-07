const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');
fill.addEventListener('dragstart', dragStart);

fill.addEventListener('dragend', dragEnd);

function dragStart() {
  console.log('start');
  this.classList.add('hold');
  setTimeout(() => {
    this.className = 'invisible';
  }, 0);
}

function dragEnd() {
  this.className = 'fill';
}

empties.forEach(item => {
  item.addEventListener('dragover', dragOver);
  item.addEventListener('dragenter', dragEnter);
  item.addEventListener('dragleave', dragLeave);
  item.addEventListener('drop', dragDrop);
});
function dragOver(e) {
  e.preventDefault(); // 防止drag失效
  console.log('在上面over');
}

function dragEnter() {
  console.log('在上面Enter');
  this.className +=" hovered"
}
function dragLeave() {
  console.log('在离开');
  this.className ="empty"
}
function dragDrop(e) {
  this.className = 'empty'
  e.preventDefault(); // 阻止默认动作，如打开链接
  console.log('放置');
  this.append(fill);
}
