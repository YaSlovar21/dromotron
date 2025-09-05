export default class CardWithDynamicObj {
  constructor({cardTemplateSelector, cardSelector, configFields, cardObj, handleCardClick }, dynamicRenderer) {

      this._handleCardClick = handleCardClick;
      this._cardTemplateSelector = cardTemplateSelector;
      this._cardSelector = cardSelector; // cardSelector - карточка, которая лежит внутри <template id=_cardTemplateSelector>
      this._dynamicRenderer = dynamicRenderer;

      this._cardObj = cardObj;
  }

  _getTemplate() {
      const cardElement = document
        .querySelector(this._cardTemplateSelector)
        .content
        .querySelector(this._cardSelector)
        .cloneNode(true);
      return cardElement;
  }

  addStyles() {

  }

  generateCard() {
      this._element = this._getTemplate();
      //console.log(this._dynamicRenderer._configBySelector);

      this._dynamicRenderer._configElementsMap(this._element); // сгенерировали карту
      console.log(this._elementsMap);
      console.log('this._cardObj', this._cardObj);
      this._dynamicRenderer._renderObj(this._cardObj); // отрендерели по карте данные

      this.addStyles();
      this._setEventListeners()
      return this._element;
  }


  _setEventListeners() {
    //передадим из индекс коллбэк открытия попапа
    if (this._handleCardClick) {
      this._element.addEventListener("mousedown", () => {
        this._handleCardClick(this._cardObj, this._element) //передаем объект карточки во внешний модуль
      });
    }
  }
}
