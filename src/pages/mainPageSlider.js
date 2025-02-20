//const canonicalURL = 'http://xn--80aaygbafnegdzdefffgu5dvg6c.xn--p1ai.website.yandexcloud.net'
const canonicalURL = 'https://станкостальконструкция.рф'

import Api from '../js/components/Api';
//забрать по API новости


const apiYdb = new Api({
    baseUrl: '',
    headers: {
      'Content-Type': 'application/json'
    }
});

let initialCards;
let step;
let lastIndex;
let windowSize = window.innerWidth;

function upStep(step) {
    console.log(lastIndex);
    return step + 1 > lastIndex ? 0 : step + 1;
}

function downStep(step) {
    return step - 1 < 0 ? lastIndex : step - 1;
}

const newsContainer = document.querySelector('.news-section-mainpage');
const newsTemplate = document.querySelector('#news-template').content;
const rightButton = document.querySelector('.news-section__button-right');
const leftButton = document.querySelector('.news-section__button-left');

function addCard({textId, title, intro, dateTime, isStaticPage}, index) {
    const cardElement = newsTemplate.querySelector('.news-section-mainpage__list-item').cloneNode(true);
    cardElement.querySelector('.news-card__title').textContent = title;
    cardElement.querySelector('.news-card__intro').textContent = intro;
    

    const date = new Date(dateTime);
    const month = date.getMonth() + 1;
    const dateString = `${date.getDate()}.${month < 10 ? '0' : ''}${month}.${date.getFullYear()}`
    cardElement.querySelector('.news-card__date').textContent = dateString;

    cardElement.querySelector('.news-card__link').href = isStaticPage ? `/news/${isStaticPage}` : '#';
    if (!isStaticPage) {
        cardElement.querySelector('.news-card__link').addEventListener('click', (evt)=> {
            evt.preventDefault();
            console.log('prevented', evt)
        })
    }
    cardElement.querySelector('.news-card__image').src = `${canonicalURL}/api-images/${textId}/poster.png`;

    if (index === 0) {
        cardElement.classList.add('animated', 'fadeInRight');
    } else {
        cardElement.classList.add('animated', 'fadeIn', `delay-${index}s` );
        
    }

    newsContainer.append(cardElement);
}

function updateSlidesAndPags() {
    //stepNavNumber.textContent = step + 1;
    newsContainer.innerHTML= '';
    getArr(step).forEach((card, index) => {
        addCard(card, index);
    });
}

function getArr(index) {
    let stepInner = step;
    let arr= []

    arr = arr.concat(initialCards[index]).concat(initialCards[upStep(index)])
    stepInner = upStep(stepInner);
    arr = arr.concat(initialCards[upStep(stepInner)]);
    
    return arr;
}

function setEventListeners() {
    rightButton.addEventListener('click', ()=> {
        step = upStep(step);
        updateSlidesAndPags();
        console.log('+++')
    });
    
    leftButton.addEventListener('click', ()=> {
        step = downStep(step);
        updateSlidesAndPags();
        console.log('---')
    });
}

async function getInitialNews() {
    const newsCards = await apiYdb.getInitialNews();

    setEventListeners();
    
    window.onresize = function() {
        step = 0;
        windowSize = window.innerWidth;
        updateSlidesAndPags();
    };
    
    step = 0; //2
    
    console.log(lastIndex)
    initialCards = newsCards;
    initialCards.sort((a,b) => b.id - a.id);
    lastIndex = initialCards.length - 1;
    console.log(lastIndex, initialCards.length - 1);
    updateSlidesAndPags();

    /*setInterval(()=>{
        step = upStep(step);
        updateSlidesAndPags();
    }, 4000);*/
}

getInitialNews();




//const stepNavNumber = document.querySelector('.current-players-step');











/*


setInterval(()=>{
    step = upStep(step);
    updateSlidesAndPags();
}, 4000);


*/