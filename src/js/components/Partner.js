export default class Partner {
    constructor({name, htmlData, classActive, handleItemClick}, projectItemSelector) {

      this._itemTemplateSelelector = projectItemSelector;
      this._name = name;

      this._htmlData = htmlData;

      //this._nameOfPartner = htmlData.nameOfPartner ? htmlData.nameOfPartner : '';
      //this._telephoneNumbers = htmlData.telephoneNumbers ? this._telephoneNumbers: '';
      //this._site = htmlData.site ? htmlData.site: '';

      //коллбэк
      this._handleItemClick = handleItemClick;
      this._activeClass = classActive;
    }

    _getItemTemplate() {
        const itemElement = document
            .querySelector(this._itemTemplateSelelector)
            .content
            .querySelector('.map__list-item')
            .cloneNode(true);
        return itemElement;
    }

    generatePartner() {
        this._element = this._getItemTemplate();
        this._element.textContent = this._name;
        this._setEventListeners();
        return this._element;
    }

    _toogleActive() {
        this._element.classList.add(this._activeClass);
    }

    _setEventListeners() {
        this._element.addEventListener('mousedown', ()=> {
            //this._handleItemClick(this._nameOfPartner, this._telephoneNumbers, this._site);
            this._handleItemClick(this._htmlData);
            this._toogleActive();
        });
    }
}