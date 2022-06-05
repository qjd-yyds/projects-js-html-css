const labels = document.querySelectorAll('.form-control label')
labels.forEach(label => {
  label.innerHTML = label.innerText.split('').map((item,idx) => {
    return `<span style="transition-delay:${idx * 50}ms">${item}</span>`
  }).join('')
})