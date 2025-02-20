if (document.querySelector('.cta-button')) {

    const ctaButtons = Array.from(document.querySelectorAll('.cta-button'));


   
    const textAreaUpf = document.forms.upFooterForm.querySelector('.form__input_type_textarea');

    const upf = document.querySelector('.upf');

    ctaButtons.map((ctaButton) => {
        ctaButton.addEventListener('click', (evt)=> {
            evt.preventDefault();
            const additionalText = ctaButton.dataset?.additional;
            const similarMessage = `Добрый день! Предоставьте пожалуйста коммерческое предложение на ${additionalText ? additionalText : 'опоры'}.`;
            textAreaUpf.textContent = similarMessage;
        
            upf.scrollIntoView({
                behavior: 'smooth'
            });
        });
    })
}