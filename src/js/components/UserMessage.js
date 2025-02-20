import Message from './Message.js';

export default class UserMessage extends Message {
	constructor(data, selector) {
    super(selector);
		this._text = data.text;
	}
 
  generate() {
    this._element = super._getElement();
    super._setEventListeners();

  	this._element.querySelector('.message__paragraph').textContent = this._text;

  	return this._element;
  }

  _handleClick() {
    super._handleClick();
     
    this._element.classList.toggle('message_is-active');
  }
}