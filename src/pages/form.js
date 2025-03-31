const { renderLoading } = require("../js/utils/utils");

import FormValidatorNew from '../js/components/FormValidatorNew';

import Api from '../js/components/Api.js';
import FormStatic from '../js/components/FormStatic.js';

const upFooterFormConfig = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_visible'
  }

const formValidatorConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
}

const formApi = new Api({
    baseUrl: 'https://api.dromotron.ru',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

const upFooterForm = document.forms.upFooterForm;
const upFooterFormSubmitButton = upFooterForm.querySelector(upFooterFormConfig.submitButtonSelector);
const upFooterFormValidator = new FormValidatorNew(upFooterFormConfig, upFooterForm);
upFooterFormValidator.enableValidation();

const upFooterFormStatic = new FormStatic({
    formSubmitHandler: (callBackData) => {
      renderLoading('loading', upFooterFormSubmitButton, 'Оставить заявку', 'Отправляем...', 'Отправлено успешно!');

      formApi.sendBigForm(callBackData)
        .then((response) => {
          console.log(response);
         // upFooterFormStatic.cleanAll(); тут что то не то!!!!!!!!!!!!!!!!
          //сделать сообщение об успешной отправке
          renderLoading('sended', upFooterFormSubmitButton, 'Оставить заявку', 'Отправляем...', 'Отправлено успешно!');
        })
        .catch((err) => console.log(err)) //сделать сообщение об успешной ошибке
        .finally(() => {
          //upFooterFormValidator.disableSaveButton();
          upFooterForm.reset();
          setTimeout(()=> {
            renderLoading('default', upFooterFormSubmitButton, 'Оставить заявку', 'Отправляем...', 'Отправлено успешно');
          },900)

        });
    },
    formCleanError: () => {},
    checherValidation: (formElement) => {
      if (!upFooterFormValidator.hasInvalidInput()) {
        return true;
      } else {
        upFooterFormValidator.showErrors();
        return false;
      }
    }
  }, upFooterForm, upFooterFormConfig.inputSelector);

  upFooterFormStatic.setEventListeners();
