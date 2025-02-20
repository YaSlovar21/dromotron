import Card from "./Card.js";

export default class CardArticle extends Card {
    constructor({tags, tagsSelector, linkPath, title,description, ...props} , cardArticleConfig ,tagsAliases) {
        super(props);

        this._cardArticleConfig = cardArticleConfig;
        this._tagsAliases = tagsAliases;


        this._tagsArray = tags;
        this._linkPath = linkPath;
        this._titleText = title,
        this._descriptionText = description;


        //this._handleImageClick = handleImageClick; //функция коллбэк открытия попапа проекта
    }

    generateCard() {
        this._element = super._getTemplate();

        this._cardHeading = this._element.querySelector(this._cardArticleConfig.articleHeadSelector);
        this._cardDescription = this._element.querySelector(this._cardArticleConfig.articleDescSelector);
        this._link = this._element.querySelector(this._cardArticleConfig.articleLinkSelector);
        this._tagsSection = this._element.querySelector(this._cardArticleConfig.articleTagsSectionSelector);
        this._tagClass = this._cardArticleConfig.articleTagClass;

        this._cardHeading.textContent = this._titleText;
        this._cardDescription.textContent = this._descriptionText;
        this._link.href = this._linkPath;

       /* this._tagsArray.forEach((tag) => {
          const tagSpan = document.createElement('span');
          tagSpan.textContent = this._tagsAliases[tag];
          tagSpan.classList.add(this._tagClass);
          this._tagsSection.append(tagSpan);

        });*/

        // если от родителя передался animateClass
        if( this._animateClass) {
          this._element.classList.add(this._animateClass, 'wow');
        }

        this._setEventListeners();
        return this._element;
    }


    _setEventListeners() {
      //передадим из индекс коллбэк открытия попапа
      this._element.addEventListener("mousedown", () => {
        console.log('Слушатель работает');
      });
    }
  }