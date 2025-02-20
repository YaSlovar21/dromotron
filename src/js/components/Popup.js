import {ESC_CODE} from '../utils/constants.js';

export default class Popup {
    constructor(popupSelector) {
        this._modal = document.querySelector(popupSelector);

        this._handleEscButton = (evt) => {
            if (evt.key === ESC_CODE) {
                this.close();
            }
        }

        this._handleOverlayClick = (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
        }
    }

    open() {
        document.querySelector('body').classList.add('body-fixed');
        this._modal.classList.add('popup_opened');
        document.addEventListener('keydown',  this._handleEscButton);
        this._modal.addEventListener("mousedown", this._handleOverlayClick);
    }

    close() {
        this._modal.classList.remove('popup_opened');
        document.removeEventListener('keydown',  this._handleEscButton);
        this._modal.removeEventListener("mousedown", this._handleOverlayClick);
        document.querySelector('body').classList.remove('body-fixed');
    }

    setEventListeners(){
        this._modal
            .querySelector('.popup__button-close')
            .addEventListener('mousedown', () => {
                this.close();
            })
    }
}