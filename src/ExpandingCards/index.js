const panels = document.querySelectorAll('.panel');
panels.forEach(panel => {
  panel.addEventListener('click', function (e) {
    panels.forEach(item => {
      item.classList.remove('active');
    });
    this.classList.add('active');
  });
});
