import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor({popupImageSelector, popupImageDescSelector}, popupSelector) {
        super(popupSelector)
        this._popupImage = this._modal.querySelector(popupImageSelector);
        this._popupImageDesc = this._modal.querySelector(popupImageDescSelector);
    }

    open(data) {
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupImageDesc.textContent = data.name;
        super.open();
    }

    close() {
        setTimeout(()=> {
          this._popupImage.src = "";
        }, 500)

        this._popupImage.alt = "";
        super.close();
    }
}