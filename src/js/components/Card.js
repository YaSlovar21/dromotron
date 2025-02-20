export default class Card {
    constructor({cardTemplateSelector, cardSelector, animateClass} ) {

        this._cardSelector =cardSelector;
        this._cardTemplateSelector = cardTemplateSelector;
        this._animateClass= animateClass;

    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardTemplateSelector)
          .content
          .querySelector(this._cardSelector)
          .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        /*this._element = this._getTemplate();

        this._cardImage = this._element.querySelector('.projects__image');
        this._cardHeading = this._element.querySelector(".projects__item-description");

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardHeading.textContent = this._name;

        if( this._animateClass) {
          cardElement.classList.add(this._animateClass, 'wow');
        }
        this._setEventListeners();
        return this._element;*/
    }


    _setEventListeners() {
      //передадим из индекс коллбэк открытия попапа
      this._cardImage.addEventListener("mousedown", () => {
        this._handleImageClick(this._name, this._link)
      });
    }
  }