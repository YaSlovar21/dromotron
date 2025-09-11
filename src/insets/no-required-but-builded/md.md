export const configPopupFormMessage = {
  popupSelector: ".popup-form-message",
  closeButtonSelector: ".popup-button-close",
  configFields: [
    {
      selector: ".popup__image",
      whatChange: "src",
      privateVarname: "_popupImage",
      key_in_dataobj: "image",
    },
    {
      selector: ".popup__image",
      whatChange: "alt",
      privateVarname: "_popupImageAlt",
      key_in_dataobj: "title",
    },
    {
      selector: ".popup__title",
      whatChange: "textContent",
      privateVarname: "_popupTitle",
      key_in_dataobj: "title",
    },
    {
      selector: ".popup__description",
      whatChange: "textContent",
      privateVarname: "_popupDesc",
      key_in_dataobj: "description",
    },
    {
      selector: ".popup__button",
      whatChange: "textContent",
      privateVarname: "_popupButton",
      key_in_dataobj: "buttonText",
    }
  ],
  dataobj_test: {
    "image": "/images/success-icon.svg",
    "title": "Ваша заявка успешно отправлена!",
    "description": "Мы рассмотрим ее в течение 30 минут.",
    "buttonText": "Окей!"
  }
};