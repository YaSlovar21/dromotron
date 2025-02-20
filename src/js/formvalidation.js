
const isEmpty = (formElement, inputElement) => {
  !inputElement.value.length >= 1 ? unfreezePlaceholder(formElement, inputElement) :
    freezePlaceholder(formElement, inputElement);
};

const freezePlaceholder = (formElement, inputElement) => {
  const placeholderElement = formElement.querySelector(`.${inputElement.id}-placeholder`);
  placeholderElement.classList.add('raschet-bem__label-title_fluid_is-fixed');
};

const unfreezePlaceholder = (formElement, inputElement) => {
  const placeholderElement = formElement.querySelector(`.${inputElement.id}-placeholder`);
  placeholderElement.classList.remove('raschet-bem__label-title_fluid_is-fixed');
};

const setCustomPlaceholders = (formElement) => {
  const getInputList = Array.from(formElement.querySelectorAll('.raschet-bem__input'));
  getInputList
    .forEach((inputElement) => inputElement
      .addEventListener('input', () => isEmpty(formElement, inputElement)))
};

// const activateForm = () => {
//  const getFormList = Array.from(document.querySelectorAll(`.form`));
//  getFormList.forEach((formElement) => {
//    setCustomPlaceholders(formElement);
//  });
// };
setCustomPlaceholders(raschetForm);
//activateForm();


/*
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
  freezePlaceholder(formElement, inputElement);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';

};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//const toggleButtonState = (inputList, buttonElement) => {
//  if (hasInvalidInput(inputList)) {
///    buttonElement.classList.add('button_inactive');
//  } else {
 //   buttonElement.classList.remove('button_inactive');
//  }
//};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}


const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  // const buttonElement = formElement.querySelector('.form__submit');
  //toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      //toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
    //const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    //fieldsetList.forEach((fieldSet) => {
    //      setEventListeners(fieldSet);
    //});
  });
};

enableValidation();
*/