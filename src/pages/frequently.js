const questions = Array.from(
    document
      .querySelectorAll('.frequently__question')
  );
  
  
questions.forEach(el => {
    el.addEventListener('click', function(evt) {
        const questionElem = evt.target.closest('.frequently__item');
        const answerElem = questionElem.querySelector('.frequently__answer')
        questionElem.classList.toggle('frequently__item_active');
       // console.log(evt.target.closest('.frequently__item'));
        answerElem.classList.toggle('animate__animated');
        answerElem.classList.toggle('animate__slow');
        answerElem.classList.toggle('animate__fadeIn');
    })
});