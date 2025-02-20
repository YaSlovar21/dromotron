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

  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
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
      this._toggleButtonState(inputList, buttonElement);
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
        this.toggleButtonState(this._inputList, this._buttonElement);
    });
  }

  showErrorsForStep(inputsWithButton) {

  }

  _setEventListeners() {
    //const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    //const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    //this.toggleButtonState(this._inputList, this._buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  };

 _setStepEventListeners(someFormSets) {
  someFormSets.forEach((inputListAndButton) => {
    const inputStepList = inputListAndButton.inputs;
    const buttonForList = inputListAndButton.button;
    console.log(`123 ${buttonForList}`);
    inputStepList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputStepList, buttonForList);
      });
    });
/*
    buttonForList.addEventListener("click", (evt)=> {
        evt.preventDefault();

        console.log(`123 ${this._hasInvalidInput(inputStepList)}`);
        if (this._hasInvalidInput(inputStepList)) {

          this._showErrors(inputStepList, buttonForList);
          this._toggleButtonState(inputStepList, buttonForList);
        }
    })
    this._formElement.addEventListener("submit", (evt)=> {
      evt.preventDefault();

      console.log(`123 ${this._hasInvalidInput(inputStepList)}`);
      if (this._hasInvalidInput(inputStepList)) {

        this._showErrors(inputStepList, buttonForList);
        this._toggleButtonState(inputStepList, buttonForList);
      }
  })*/
 })
}

enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    this._setEventListeners();
  };

checkStep(number) {
  const inputStepList = this._sets[number].inputs;
  const buttonForList = this._sets[number].button;
  if (this._hasInvalidInput(inputStepList)) {

      this._showErrors(inputStepList, buttonForList);
      this._toggleButtonState(inputStepList, buttonForList);
      return false;
  }
  return true;
}
enableStepValidation() {
  this._sets = [];

  const firstStepFieldset = this._formElement.querySelector('.first-step');
  const firstStepButton = firstStepFieldset.querySelector('.first-step-button');
  const firstStepInputList = Array.from(firstStepFieldset.querySelectorAll(this._inputSelector));
  this._sets.push({inputs: firstStepInputList, button: firstStepButton});

  const secondStepFieldset = this._formElement.querySelector('.second-step');
  const secondStepButton = secondStepFieldset.querySelector('.second-step-button');
  const secondtepInputList = Array.from(secondStepFieldset.querySelectorAll(this._inputSelector));
  this._sets.push({inputs: secondtepInputList, button: secondStepButton});

  this._setStepEventListeners(this._sets);
}

}


