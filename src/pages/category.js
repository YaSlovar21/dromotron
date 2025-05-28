const docsSect = document.querySelector('.smooth-sect');

function docsready() {
  docsSect.scrollIntoView({
    behavior: 'smooth'
  });
}

window.onload = docsready;
