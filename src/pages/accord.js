

const newsCard = document.querySelectorAll('.newscard');

Array.from(newsCard).map((card)=> {
    card.addEventListener('mouseover', (evt)=> {
        const el = evt.target.closest('.newscard');
        Array.from(newsCard).map((card)=> {
            card.closest('.newscard').classList.remove('newscard_active');
        })
        el.classList.toggle('newscard_active');
    })
})