const targetImg = document.querySelector('.target-hov-img');
const targetDesc = document.querySelector('.hov-desc');

Array.from(document.querySelectorAll('.hov-icon')).map((icon) => {
    icon.addEventListener('mouseover', (evt) => {
        targetImg.src = evt.target.querySelector('img').src;
        targetDesc.textContent = evt.target.querySelector('img').alt;
        //console.log(evt.target)
    })
})