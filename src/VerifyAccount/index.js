const codes = document.querySelectorAll('.code');
codes[0].focus();

codes.forEach((code, idx) => {
  code.addEventListener('keydown', e => {
    console.log(e)
    if (e.key >= 0 && e.key <= 9) {
      console.log(e.key);
      codes[idx].value = '';
      setTimeout(() => codes[idx + 1].focus());
    } else if (e.key === 'Backspace') {
      setTimeout(() => codes[idx - 1].focus());
    }
  });
});
