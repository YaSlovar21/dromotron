/*
<div class="table__cell table__cell_theme_dark">
            <h3 class="table__heading table__heading_theme_dark">Нефтехимия</h3>
            <p class="table__text table__text_theme_dark">Полностью автоматизированный, саморегулируемый процесс.</p>
</div>
*/

export default class FreqDynamic {
  constructor({headingSelector, descSelector}, htmlElement) {
    this._headElement = htmlElement.querySelector(`.${headingSelector}`);
    this._descElement = htmlElement.querySelector(`.${descSelector}`);

    this._headElementMobileClass = `${headingSelector}_clickable`;
    this._headElementMobileActiveClass = `${headingSelector}_clickable-open`;
    this._descElementHiddenClass = `${descSelector}_hidden`

    this._windowWidth = window.innerWidth;
    this._handleHeadingClick = this._handleHeadingClick.bind(this);
  }

  _handleHeadingClick() {
    console.log(this._headElement);
    this._headElement.classList.toggle(this._headElementMobileActiveClass);
    this._descElement.classList.toggle(this._descElementHiddenClass);
  }


  _checkIsOpen() {
    if (this._windowWidth <= 768) {
      this._headElement.classList.add(this._headElementMobileClass);
      this._descElement.classList.add(this._descElementHiddenClass);
      this._headElement.addEventListener('mousedown', this._handleHeadingClick)
    } else {
      this._headElement.classList.remove(this._headElementMobileClass);
      if (this._headElement.classList.contains(this._headElementMobileActiveClass)) {
        this._headElement.classList.remove(this._headElementMobileActiveClass);
      }
      if (this._descElement.classList.contains(this._descElementHiddenClass)) {
        this._descElement.classList.remove(this._descElementHiddenClass);
      }
      this._headElement.removeEventListener('mousedown', this._handleHeadingClick)
    }
  }

  _handleWindowResize() {
    this._windowWidth = window.innerWidth;
    console.log(this);
    this._checkIsOpen();
  }

  setEventListeners() {
    this._windowWidth = window.innerWidth;
    this._checkIsOpen();
    window.addEventListener('resize', this._handleWindowResize.bind(this))
  }
}