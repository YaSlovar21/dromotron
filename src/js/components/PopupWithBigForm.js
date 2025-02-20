import Popup from './Popup.js';

export default class PopupWithBigForm extends Popup {
    constructor({formSubmitHandler, formCleanError, checherValidation}, popupSelector, formSelector, formInputSelector) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._formCleanError = formCleanError;
        this._formElement = this._modal.querySelector(formSelector); //.popup__form
        this._inputSelector = formInputSelector;
        this._absolutePopup = this._modal.querySelector('.popup-absolute');

        this._step = 0;
        this._checker = checherValidation;
    }

    increaseStep() {
      this._step = 1;
    }
    decreaseStep() {
      this._step = 0;
    }
    //собираем поля формы
    _getInputValues() {
        // достаём все элементы полей
        this._inputList = this._formElement.querySelectorAll(this._inputSelector); //'.popup__input'
        //console.log(this._formElement.t_typesr2.value);
        // создаём пустой объект
        this._formValues = {};

        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
          /*if (input.dataset.alias) {
            if (input.name==='moshnost') {
              return this._formValues[input.dataset.alias] = input.value +' '+ this._formElement.t_typesr1.value;
            }
            if (input.name==='rashod') {
              return this._formValues[input.dataset.alias] = input.value +' '+ this._formElement.t_typesr2.value;
            }
            this._formValues[input.dataset.alias] = input.value;
          } else {*/
            this._formValues[input.name] = input.value;
          /*}*/
        });
        // возвращаем объект значений
        return this._formValues;
    }


    close() {
        super.close();
        this._formElement.reset();
        this._formCleanError();
        if (this._absolutePopup.classList.contains('popup__form-fio_opened')) {
          console.log('Открыто!');
          this._absolutePopup.classList.remove('popup__form-fio_opened');
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            if (this._checker()) {
              this._formSubmitHandler(this._getInputValues());
            }
        });
    }
}