import Section from "./Section";
// методы родителя
// setItem(element)
// appendItem(element)
// clear()
import { useWindowSize } from "../utils/utils.js";

export default class SectionPaginator extends Section {
    constructor(props, cardsContainerSelector, moreButtonElement) {
        super(props, cardsContainerSelector);

        if (useWindowSize() > 1200) {
          this._countBase = 9;
        }
        if (useWindowSize() <= 1200) {
          this._countBase = 8;
        }

        this._buttonMore = moreButtonElement;

        // проверяем необходимость MoreButton
        this._checkMoreButtonState();

        this._buttonMore.addEventListener("mousedown", ()=>{
          this._countBase += this.additionalCount();
          console.log(this.additionalCount)
          // проверяем необходимость MoreButton
          this._checkMoreButtonState();
          this.clear();
          this.renderItems();
      });
    }

    additionalCount() {
      const widthScreen = useWindowSize();
      if (widthScreen > 1200) {
        return 3;
      } else {
        if (widthScreen <= 1200 && widthScreen > 638) {
          return 2;
        }
        else {
          return 3;
        }
      }


    }
    renderFiltered(filteredData) {
      this._container.classList.add('section-loading');
      setTimeout(()=> {
        this._renderedItems = filteredData;
        this._countBase = 6;

        this._checkMoreButtonState();

        this.clear();
        if (filteredData.length === 0) {
          const findedNo = document.createElement('p');
          findedNo.setAttribute('style', 'color:#f2f2f2; font-size:24px; margin-left: 10px');
          findedNo.textContent = 'По Вашему условию поиска статей пока нет.';
          this._container.append(findedNo);
          //this._container.textContent = 'По Вашему условию поиска статей пока нет.'
        }
        this.renderItems();
        this._container.classList.remove('section-loading');
      }, 800)
    }




    _showMoreButtonState() {
      if (this._buttonMore.classList.contains('infocards__more-button_hidden')) {
        this._buttonMore.classList.remove('infocards__more-button_hidden');
      }
    }

    _hideMoreButtonState() {
      this._buttonMore.classList.add('infocards__more-button_hidden');
    }

    _checkMoreButtonState() {
      if (this._countBase < this._renderedItems.length) {
            this._showMoreButtonState();
      } else {
        this._hideMoreButtonState();
      }
    }

    renderItems() {
      this.clear();
        this._renderedItems.slice(0, this._countBase).forEach(item => {
          this._renderer(item);
        });
    }
}