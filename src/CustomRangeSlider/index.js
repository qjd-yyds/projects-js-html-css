const range = document.getElementById('range');
range.addEventListener('input', e => {
  console.log(e.target.value);
  const value = +e.target.value;
  const label = e.target.nextElementSibling;
  const rangeWidth = getComputedStyle(e.target).width;
  const numLabelWidth = getComputedStyle(label).width;
  const num_width = parseInt(rangeWidth, 10);
  const num_label_width = parseInt(numLabelWidth, 10);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = value * (num_width / max) - num_label_width / 2 + scale(value, min, max, 10, -10)
  label.style.left = `${left}px`;
  label.innerHTML = value;
});
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
