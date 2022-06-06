const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');
smallCups.forEach((cup, index) => {
  cup.addEventListener('click', function () {
    this.classList.toggle('full');
    updateCup();
  });
});

function updateCup() {
  const length = document.querySelectorAll('.cup-small.full').length;
  const totalCups = smallCups.length;
  percentage.style.visibility = 'visible';
  percentage.style.height = `${(length / totalCups) * 100}%`;
  percentage.innerText = `${(length / totalCups) * 100}%`;
  if (length == totalCups) {
    remained.style.visibility = 'hidden'
    remained.style.height = 0
  }
}
