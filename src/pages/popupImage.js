import PopupWithImage from '../js/components/PopupWithImage.js';

import {
  popupImageSelector,     //попап с картинкой (селектор)
  popupImageSelectorsCongig
} from '../js/utils/constants.js'

const popupImage = new PopupWithImage(popupImageSelectorsCongig, popupImageSelector);
popupImage.setEventListeners();

document.querySelectorAll('.popup-image-item').forEach((item) => {
    item.addEventListener("mousedown", (evt) => {
      evt.stopPropagation();
      console.log(evt.target);
      popupImage.open({
        link: evt.target.querySelector('img') ? evt.target.querySelector('img').src : evt.target.src,
        desc: evt.target.querySelector('img') ? evt.target.querySelector('img').alt : evt.target.alt,
      });
    });
  });
  