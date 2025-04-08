import './tw.css';
import './index.css';


import '../images/favicon.svg';

import Api from '../js/components/Api.js';
import Popup from '../js/components/Popup';
import PopupWithForm from '../js/components/PopupWithForm';
import { renderLoading } from '../js/utils/utils';
import FormValidatorNew from '../js/components/FormValidatorNew';

const formValidatorConfig = {
  inputSelector: '.raschet-bem__input',
  submitButtonSelector: '.button-bem_submit',
  inactiveButtonClass: 'ui-button_disabled',
  inputErrorClass: 'ui-button__type_error',
  errorClass: 'raschet-bem__input-error_visible'
}

const formApi = new Api({
  baseUrl: 'https://api.dromotron.ru',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
});

const formCallBack= document.forms.formCallBack;
const callbackSubmitButton = formCallBack.querySelector(formValidatorConfig.submitButtonSelector);
const callBackPopupOpenButton = document.querySelector('.popup-callback-button');
const formValidatorCallBack = new FormValidatorNew(formValidatorConfig, formCallBack);
formValidatorCallBack.enableValidation();


const popupCallBack = new PopupWithForm({
  formSubmitHandler: (formCallbackData) => {
    //const name = formCallbackData.name;
    //const tel = formCallbackData.tel;
    renderLoading('loading', callbackSubmitButton, 'Оставить заявку', 'Отправляем...', 'Отправлено успешно!');
   // formApi.sendCallForm(name, tel)
    formApi.sendCallForm(formCallbackData)
      .then((response) => {
        console.log(response);
        renderLoading('sended', callbackSubmitButton, 'Оставить заявку', 'Отправляем...', 'Отправлено успешно!');
        //сделать сообщение об успешной отправке
      })
      .catch((err) => console.log(err)) //сделать сообщение об успешной ошибке
      .finally(() => {
        setTimeout(()=> {
          popupCallBack.close();
          formValidatorCallBack.disableSaveButton();
          renderLoading('default', callbackSubmitButton, 'Оставить заявку', 'Отправляем...', 'Отправлено успешно!');
        }, 900)
      });
  },
  formCleanError: () => {
    formValidatorCallBack.cleanAllErrors();
  },
  checherValidation: (formElement) => {
    if (!formValidatorCallBack.hasInvalidInput()) {
      return true;
    } else {
      formValidatorCallBack.showErrors();
      return false;
    }
  }
}, '.popup-callback', '.popup__form','.raschet-bem__input');

popupCallBack.setEventListeners();

callBackPopupOpenButton.addEventListener("mousedown", () => {
  popupCallBack.open();
})



/* MARKETING
function goalCallback () {
    console.log('запрос в Метрику успешно отправлен');
  }
  document.addEventListener('copy', (evt)=> {
      ym(88973338,'reachGoal','copied', {path: evt.target.baseURI, el: evt.target.innerText}, goalCallback );
  });*/

const popupMenu = new Popup('.popup-menu');
popupMenu.setEventListeners();

const navMobileButton = document.querySelector('.nav__mobile-icon');
navMobileButton.addEventListener('click', () => {
    popupMenu.open();
    console.log('111');
});
