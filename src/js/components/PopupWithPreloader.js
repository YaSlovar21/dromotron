import Popup from './Popup.js';

export default class PopupWithPreloader extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        // this._popupImage = this._modal.querySelector(popupImageSelector);
        //this._popupImageDesc = this._modal.querySelector(popupImageDescSelector);

    }

    open() {
        super.open();
    }

    close() {
        super.close();
    }
}