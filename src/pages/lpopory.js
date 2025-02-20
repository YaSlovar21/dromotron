/*const scrollFactoryContainer =  document.querySelector('.scroll-factory');

const isScrollingFact = (evt) => {
  let newScrollLeft = scrollFactoryContainer.scrollLeft + evt.deltaY;
  console.log(newScrollLeft)
  let deltaRight = scrollFactoryContainer.querySelector('.scroll-factory__inner').scrollWidth -scrollFactoryContainer.scrollLeft - scrollFactoryContainer.clientWidth  ;
  console.log(deltaRight);
  if ( newScrollLeft < -80 || (deltaRight < 46 && deltaRight > -1 && evt.deltaY >0) ) {
    console.log(deltaRight );
    return;
  }
  evt.preventDefault();
  scrollFactoryContainer.scrollLeft += evt.deltaY;
}

scrollFactoryContainer.addEventListener("wheel", (evt) => {
  console.log(scrollFactoryContainer.scrollLeft , scrollFactoryContainer.clientWidth, scrollFactoryContainer.querySelector('.scroll-factory__inner').scrollWidth)
  isScrollingFact(evt);
});
*/