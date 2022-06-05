const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');
textarea.focus();
textarea.addEventListener('keyup', e => {
  createTag(e.target.value);
  if (e.key === 'Enter') {
    // e.target.value = '';
    randomSelect();
  }
});

function createTag(input) {
  const text = input
    .split(',')
    .filter(item => item.trim() !== '')
    .map(item => {
      return `<span class="tag">${item}</span>`;
    })
    .join('');
  tagsEl.innerHTML = text;
}

function randomSelect() {
  const times = 3;
  const interval = setInterval(() => {
    const tag = pickRandomTag();
    if (tag !== undefined) {
      highlightTag(tag);
      setTimeout(() => {
        unHighlightTag(tag);
      }, 100);
    }
  }, 100);
  setTimeout(() => {
    clearInterval(interval);
    setTimeout(() => {
      const randomTag = pickRandomTag();
      console.log('高亮');
      highlightTag(randomTag);
    }, 100);
  }, times * 1000);
}

function pickRandomTag() {
  const tags = document.querySelectorAll('.tag');
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  tag.classList.add('highlight');
}
function unHighlightTag(tag) {
  tag.classList.remove('highlight');
}
