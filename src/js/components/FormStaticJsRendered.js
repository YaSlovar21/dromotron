import FormValidatorNew from "./FormValidatorNew.js";



export default class FormStaticJsRendered {
    constructor({templateSelector, formInputSelector, formSubmitHandler, formCleanError, validationConfig, formSubmitSelector } ) {
        this._formSubmitHandler = formSubmitHandler;
        this._formCleanError = formCleanError;
        //this._formElement = formElement; //.popup__form
        this._templateSelector = templateSelector;
        this._inputSelector = formInputSelector;
        //this._absolutePopup = this._formElement.querySelector('.popup-absolute');
        this._validationConfig = validationConfig;

        this._formSubmitButtonSelector = formSubmitSelector;
    }

    _getElement() {
      const formElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.raschet-bem')
        .cloneNode(true);
      return formElement;
    }

    //собираем поля формы
    _getInputValues() {
        // достаём все элементы полей
        this._inputList = this._element.querySelectorAll(this._inputSelector); //'.popup__input'
        //console.log(this._element.t_typesr2.value);
        // создаём пустой объект
        this._formValues = {};

        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
          /*if (input.dataset.alias) {
            if (input.name==='moshnost') {
              return this._formValues[input.dataset.alias] = input.value +' '+ this._element.t_typesr1.value;
            }
            if (input.name==='rashod') {
              return this._formValues[input.dataset.alias] = input.value +' '+ this._element.t_typesr2.value;
            }
            this._formValues[input.dataset.alias] = input.value;
          } else {*/
            this._formValues[input.name] = input.value;
          /*}*/
        });
        console.log(this._formValues);
        if (localStorage.getItem('clientId')) {
          this._formValues['clientId'] = localStorage.getItem('clientId');
        }
        // возвращаем объект значений
        return this._formValues;
    }


    cleanAll() {
        this._element.reset();
        this._formCleanError();
    }

    _setEventListeners() {
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            if (!this._validator.hasInvalidInput()) {
              this._formSubmitHandler(this._getInputValues(), this._submitButton);
              this._element.reset();
            } else {
              this._validator.showErrors();
            }
        });
    }

    generate() {
      this._element = this._getElement();
      this._submitButton = this._element.querySelector(this._formSubmitButtonSelector);
      console.log(this._submitButton);
      this._validator = new FormValidatorNew(this._validationConfig, this._element);
      console.log(this._validator);
      this._validator.enableValidation();
      this._setEventListeners();
      console.log(this);
      return this._element;
    }

}