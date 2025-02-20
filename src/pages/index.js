import './tw.css';
import './index.css';


import '../images/favicon.svg';

import Popup from '../js/components/Popup';

import { gsap, ScrollTrigger } from "gsap/all";

/*
const popupMenu = new Popup('.popup-menu');
popupMenu.setEventListeners();

const navMobileButton = document.querySelector('.nav__mobile-icon');
navMobileButton.addEventListener('click', () => {
    popupMenu.open();
    console.log('111');
});
*/
gsap.registerPlugin(ScrollTrigger);

var panels1 = gsap.utils.toArray(".large-logo-img");

panels1.pop(); // get rid of the last one (don't need it in the loop)
panels1.forEach((panel, i) => {
  let tl = gsap.timeline({
    scrollTrigger:{
      trigger: panel,
      start: "top center",
      pinSpacing: false,
      pin: false,
      scrub: 0.3,
    }
  });

  tl.fromTo(panel,
    1, {
    y: 0,
    yPercent: 0,
    rotate:0,

    opacity:1
  }, {

    rotateX:0,

    yPercent: 100,
    opacity:0.5
  }, 0)
  .to(panel, 0.1, {opacity:0})

});

/*
let tl = gsap.timeline({
    scrollTrigger:{
      trigger: '.panel',
      start: "top center",
      end: "top 20%",
      pin: false,
      snap: 0.1,
      scrub: 0.3,
    }
});

tl.from('.panel', {
    scale: 1.1,
}).fromTo('.svg-plus-in svg', {
    opacity: 0,
    delay: 0.5,
    duration: 0.5,
    rotation: -70,
}, {
    opacity: 1,
    delay: 0.5,
    duration: 0.5,
    rotation: 0,
}, "-=60%")
*/


/* MARKETING
function goalCallback () {
    console.log('запрос в Метрику успешно отправлен');
  }
  document.addEventListener('copy', (evt)=> {
      ym(88973338,'reachGoal','copied', {path: evt.target.baseURI, el: evt.target.innerText}, goalCallback );
  });*/