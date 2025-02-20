import Message from './Message.js';

export default class DefaultMessage extends Message {
	constructor(data, selector) {
    super(selector);
		this._text = data.text;
		this._image = data.image;
	}

  generate() {
    this._element = super._getElement();
    super._setEventListeners();

    this._element.querySelector('.message__avatar').src = this._image;
  	this._element.querySelector('.message__paragraph').textContent = this._text;

  	return this._element;
  }

  generateHTML() {
    this._element = super._getElement();
    super._setEventListeners();
    this._element.querySelector('.message__avatar').src = this._image;
    this._element.querySelector('.message__paragraph').append(this._text);
    return this._element;
  }
}