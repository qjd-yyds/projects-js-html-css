const counters = document.querySelectorAll('.counter');
let request = null;
counters.forEach(counter => {
  counter.innerText = 0;
  const renderCounter = () => {
    const target = counter.getAttribute('data-target');
    const prevNum = +counter.innerText;
    const increment = target / 2000;
    if (prevNum < target) {
      counter.innerText =Math.ceil(increment + prevNum) ;
      request = requestAnimationFrame(renderCounter);
    } else {
      counter.innerText = target;
      cancelAnimationFrame(request)
    }
  };
  request = requestAnimationFrame(renderCounter);
});
