export default class FormValidatorNew {
  constructor(params, formElement) {

    this._inputSelector = params.inputSelector;

    this._inputErrorClass = params.inputErrorClass;
    this._errorClass = params.errorClass;

    this._submitButtonSelector = params.submitButtonSelector;
    this._inactiveButtonClass = params.inactiveButtonClass;

    this._formElement = formElement;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._showErrorsAnimationClasses = ['translate-x-10', 'opacity-0'];
    this._showErrorsTransitionsClasses = ['transition-all', 'duration-300'];

    Array.from(this._formElement.querySelectorAll('.form__input-error')).map(i=> i.classList.add(...this._showErrorsAnimationClasses, ...this._showErrorsTransitionsClasses));
  }

  _animateErrMessage(el) {
    console.log('пытаемся анимировать', el)
    el.classList.add(...this._showErrorsAnimationClasses); // cкрываем
    requestAnimationFrame(() => {
      // Добавляем transition и убираем начальные классы
      el.classList.add(...this._showErrorsTransitionsClasses);
      el.classList.remove(...this._showErrorsAnimationClasses);

      // Ждем завершения анимации и убираем transition
      const onTransitionEnd = () => {
        el.removeEventListener('transitionend', onTransitionEnd);
        el.classList.remove(...this._showErrorsTransitionsClasses);
      };

      el.addEventListener('transitionend', onTransitionEnd);
      setTimeout(onTransitionEnd, 350); // fallback
    });
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    this._animateErrMessage(errorElement);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.classList.add(...this._showErrorsAnimationClasses);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //проверяем все поля на ошибку, если хоть одно есть, возвращаем true
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };


  _showErrors(inputList, buttonElement) {
    inputList.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
      //this._toggleButtonState(inputList, buttonElement);
  });
  }

  toggleButtonState() {
    this._toggleButtonState(this._inputList, this._buttonElement);
  }

  hasInvalidInput() {
    return this._hasInvalidInput(this._inputList);
  }

  disableSaveButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  cleanAllErrors () {                                 //.popup-input
    //Array.from(this._formElement.querySelectorAll(this._inputSelector)).forEach((inputElement) => {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  showErrors() {
    this._inputList.forEach((inputElement) => {
        this._checkInputValidity(inputElement);
        //this.toggleButtonState(this._inputList, this._buttonElement);
    });
  }


  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        //this.toggleButtonState();
      });
    });
  };

enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    this._setEventListeners();
  };
}


