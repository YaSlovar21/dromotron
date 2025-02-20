import Card from "./Card.js";

export default class CardProjectHorizontal extends Card {
    constructor({name, link, to, naznach, q, path, handleImageClick, ...props}) {
        super(props);
        console.log(props);
        this._name = name;
        this._link = link;

        this._to = to;
        this._naznach = naznach;
        this._q = q;


        this._path = path;
        this._handleImageClick = handleImageClick; //функция коллбэк открытия попапа проекта
    }

    generateCard() {
        this._element = super._getTemplate();

        this._cardImage = this._element.querySelector('.projects__image');
        this._cardHeading = this._element.querySelector(".projects__item-description");

        this._toModelDesc = this._element.querySelector(".projects__to-model");
        this._toQDesc = this._element.querySelector(".projects__to-q");
        this._naznachDesc = this._element.querySelector(".projects__to-naznach");

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardHeading.textContent = this._name;

        this._element.querySelector('.column-description-link').href = this._path;

        this._toModelDesc.textContent = this._to;
        this._toQDesc.textContent = this._q;
        this._naznachDesc.textContent = this._naznach;

        // если от родителя передался animateClass
        if( this._animateClass) {
          this._element.classList.add(this._animateClass, 'animate__animated');
        }

        this._setEventListeners();
        return this._element;
    }


    _setEventListeners() {
      //передадим из индекс коллбэк открытия попапа
      this._cardImage.addEventListener("mousedown", () => {
        this._handleImageClick(this._name, this._link)
      });
    }
  }